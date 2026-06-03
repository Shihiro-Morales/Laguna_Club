'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { crearReserva, getHabitaciones } from '@/lib/api-client';
import { LoginModal } from '@/components/auth/login-modal';
import { RegisterModal } from '@/components/auth/register-modal';
import { Habitacion } from '@/lib/types';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/providers/language-provider';
import { cn } from '@/lib/utils';

interface ReservationFormProps {
  className?: string;
}

export function ReservationForm({ className }: ReservationFormProps) {
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    habitacion: '',
    fecha_entrada: '',
    fecha_salida: '',
    personas: '1',
    servicios: [] as number[],
  });

  useEffect(() => {
    const loadHabitaciones = async () => {
      try {
        const data = await getHabitaciones();
        setHabitaciones(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        console.error('[v0] Error loading habitaciones:', err);
      }
    };
    loadHabitaciones();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verificar autenticación
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      // Validaciones
      if (!formData.habitacion) {
        throw new Error('Por favor selecciona una habitación');
      }
      if (!formData.fecha_entrada || !formData.fecha_salida) {
        throw new Error('Por favor selecciona las fechas de entrada y salida');
      }

      const entrada = new Date(formData.fecha_entrada);
      const salida = new Date(formData.fecha_salida);

      if (salida <= entrada) {
        throw new Error('La fecha de salida debe ser posterior a la de entrada');
      }

      // Obtener info de habitación para calcular el total
      const habitacionSeleccionada = habitaciones.find(
        (h) => h.id.toString() === formData.habitacion
      );

      if (!habitacionSeleccionada) {
        throw new Error('Habitación no válida');
      }

      // Calcular total: precio_noche * número_noches
      const noches = Math.ceil(
        (salida.getTime() - entrada.getTime()) / (1000 * 60 * 60 * 24)
      );
      const total = (habitacionSeleccionada.precio * noches).toFixed(2);

      // Enviar reserva al backend con todos los campos requeridos
      await crearReserva({
        habitacion: parseInt(formData.habitacion),
        fecha_entrada: formData.fecha_entrada,
        fecha_salida: formData.fecha_salida,
        personas: parseInt(formData.personas),
        servicios: formData.servicios,
        total: parseFloat(total),
        estado: 'pendiente',
      });

      setIsSubmitted(true);
      setTimeout(() => {
        setFormData({
          habitacion: '',
          fecha_entrada: '',
          fecha_salida: '',
          personas: '1',
          servicios: [],
        });
        setIsSubmitted(false);
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Error al crear la reserva');
      console.error('[v0] Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn('rounded-2xl bg-card border border-border p-8 text-center', className)}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20 text-secondary mx-auto mb-4">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
          ¡Reserva Confirmada!
        </h3>
        <p className="text-muted-foreground">
          Tu reserva ha sido creada exitosamente. Te contactaremos pronto para confirmar los detalles.
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className={cn('rounded-2xl bg-card border border-border p-6 sm:p-8', className)}
      >
        <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
          {t.reservations.formTitle}
        </h3>

        {!isAuthenticated && (
          <p className="text-sm text-muted-foreground mb-4">
            Debes estar conectado para hacer una reserva.{' '}
            <button
              type="button"
              onClick={() => setShowLoginModal(true)}
              className="text-primary hover:underline font-semibold"
            >
              Inicia sesión aquí
            </button>
            {' '}o{' '}
            <button
              type="button"
              onClick={() => setShowRegisterModal(true)}
              className="text-primary hover:underline font-semibold"
            >
              crea una cuenta
            </button>
          </p>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded p-3 text-red-700 text-sm mb-4">
            {error}
          </div>
        )}

        <div className="space-y-5">
          {/* Habitación */}
          <div>
            <label htmlFor="habitacion" className="block text-sm font-medium text-foreground mb-2">
              {t.reservations.roomType}
            </label>
            <select
              id="habitacion"
              name="habitacion"
              value={formData.habitacion}
              onChange={handleChange}
              required
              disabled={!isAuthenticated}
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">{t.reservations.selectRoom}</option>
              {habitaciones.map((habitacion) => (
                <option key={habitacion.id} value={habitacion.id}>
                  {habitacion.nombre} - ${habitacion.precio}/noche
                </option>
              ))}
            </select>
          </div>

          {/* Fechas */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="fecha_entrada" className="block text-sm font-medium text-foreground mb-2">
                {t.reservations.checkIn}
              </label>
              <input
                type="date"
                id="fecha_entrada"
                name="fecha_entrada"
                value={formData.fecha_entrada}
                onChange={handleChange}
                required
                disabled={!isAuthenticated}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label htmlFor="fecha_salida" className="block text-sm font-medium text-foreground mb-2">
                {t.reservations.checkOut}
              </label>
              <input
                type="date"
                id="fecha_salida"
                name="fecha_salida"
                value={formData.fecha_salida}
                onChange={handleChange}
                required
                disabled={!isAuthenticated}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Personas */}
          <div>
            <label htmlFor="personas" className="block text-sm font-medium text-foreground mb-2">
              {t.reservations.guests}
            </label>
            <select
              id="personas"
              name="personas"
              value={formData.personas}
              onChange={handleChange}
              disabled={!isAuthenticated}
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'huésped' : 'huéspedes'}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting || !isAuthenticated}
            className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground py-6 text-lg rounded-xl"
          >
            {isSubmitting ? t.common.loading : t.reservations.submit}
          </Button>
        </div>
      </motion.form>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </>
  );
}
