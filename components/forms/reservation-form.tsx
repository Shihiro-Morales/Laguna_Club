'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { crearReserva, getHabitaciones, APIError } from '@/lib/api-client';
import { notifications, showError } from '@/lib/notifications';
import { LoginModal } from '@/components/auth/login-modal';
import { RegisterModal } from '@/components/auth/register-modal';
import { Habitacion } from '@/lib/types';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/providers/language-provider';
import { cn } from '@/lib/utils';
import { Loader2, CheckCircle, LogIn, UserPlus } from 'lucide-react';

interface ReservationFormProps {
  className?: string;
}

export function ReservationForm({ className }: ReservationFormProps) {
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [loadingHabitaciones, setLoadingHabitaciones] = useState(true);
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
        setLoadingHabitaciones(true);
        const data = await getHabitaciones();
        setHabitaciones(Array.isArray(data) ? data : data.results || []);
      } catch (err: any) {
        console.error('[v0] Error loading habitaciones:', err);
        if (err instanceof APIError) {
          showError('Error al cargar habitaciones: ' + err.message);
        }
      } finally {
        setLoadingHabitaciones(false);
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

    // Verificar autenticacion
    if (!isAuthenticated) {
      notifications.authRequired();
      setShowLoginModal(true);
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      // Validaciones
      if (!formData.habitacion) {
        throw new Error('Por favor selecciona una habitacion');
      }
      if (!formData.fecha_entrada || !formData.fecha_salida) {
        throw new Error('Por favor selecciona las fechas de entrada y salida');
      }

      const entrada = new Date(formData.fecha_entrada);
      const salida = new Date(formData.fecha_salida);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      if (entrada < hoy) {
        throw new Error('La fecha de entrada no puede ser anterior a hoy');
      }

      if (salida <= entrada) {
        throw new Error('La fecha de salida debe ser posterior a la de entrada');
      }

      // Obtener info de habitacion para calcular el total
      const habitacionSeleccionada = habitaciones.find(
        (h) => h.id.toString() === formData.habitacion
      );

      if (!habitacionSeleccionada) {
        throw new Error('Habitacion no valida');
      }

      // Calcular total: precio_noche * numero_noches
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

      notifications.reservationSuccess();
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
      const errorMessage = err instanceof APIError 
        ? err.message 
        : err.message || 'Error al crear la reserva';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate price preview
  const getPricePreview = () => {
    if (!formData.habitacion || !formData.fecha_entrada || !formData.fecha_salida) {
      return null;
    }
    const habitacion = habitaciones.find(h => h.id.toString() === formData.habitacion);
    if (!habitacion) return null;
    
    const entrada = new Date(formData.fecha_entrada);
    const salida = new Date(formData.fecha_salida);
    if (salida <= entrada) return null;
    
    const noches = Math.ceil((salida.getTime() - entrada.getTime()) / (1000 * 60 * 60 * 24));
    const total = habitacion.precio * noches;
    
    return { noches, precioNoche: habitacion.precio, total };
  };

  const pricePreview = getPricePreview();

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn('rounded-2xl bg-card border border-border p-8 text-center', className)}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20 text-secondary mx-auto mb-4">
          <CheckCircle className="h-8 w-8" />
        </div>
        <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
          Reserva Confirmada
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

        {/* Auth prompt for non-authenticated users */}
        {!isAuthenticated && (
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
            <p className="text-sm text-foreground mb-3">
              Debes iniciar sesion para hacer una reserva.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-2"
              >
                <LogIn className="h-4 w-4" />
                Iniciar Sesion
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowRegisterModal(true)}
                className="flex items-center gap-2"
              >
                <UserPlus className="h-4 w-4" />
                Crear Cuenta
              </Button>
            </div>
          </div>
        )}

        {/* Welcome message for authenticated users */}
        {isAuthenticated && user && (
          <p className="text-sm text-muted-foreground mb-4">
            Bienvenido, <span className="font-medium text-foreground">{user.first_name || user.username}</span>. Completa el formulario para reservar.
          </p>
        )}

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 text-destructive text-sm mb-6">
            <p className="font-medium">Error</p>
            <p className="mt-1">{error}</p>
          </div>
        )}

        <div className="space-y-5">
          {/* Habitacion */}
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
              disabled={!isAuthenticated || loadingHabitaciones}
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">{loadingHabitaciones ? 'Cargando...' : t.reservations.selectRoom}</option>
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
                min={new Date().toISOString().split('T')[0]}
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
                min={formData.fecha_entrada || new Date().toISOString().split('T')[0]}
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
                  {num} {num === 1 ? 'huesped' : 'huespedes'}
                </option>
              ))}
            </select>
          </div>

          {/* Price Preview */}
          {pricePreview && isAuthenticated && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-secondary/10 border border-secondary/20 rounded-xl p-4"
            >
              <h4 className="font-medium text-foreground mb-2">Resumen del precio</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>${pricePreview.precioNoche} x {pricePreview.noches} noches</span>
                  <span>${pricePreview.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-foreground pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">${pricePreview.total.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting || !isAuthenticated}
            className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground py-6 text-lg rounded-xl"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Procesando...
              </span>
            ) : (
              t.reservations.submit
            )}
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
        onSuccess={() => {
          // User just logged in, form is now enabled
        }}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
        onSuccess={() => {
          // User just registered and logged in, form is now enabled
        }}
      />
    </>
  );
}
