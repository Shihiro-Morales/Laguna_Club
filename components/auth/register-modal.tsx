'use client';

import { useState } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { notifications } from '@/lib/notifications';
import { APIError } from '@/lib/api-client';
import { X, Loader2, CheckCircle } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
  onSuccess?: () => void;
}

export function RegisterModal({ isOpen, onClose, onSwitchToLogin, onSuccess }: RegisterModalProps) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
    telefono: '',
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    // Client-side validation
    if (formData.password !== formData.password2) {
      setError('Las contrasenas no coinciden');
      return;
    }

    if (formData.password.length < 8) {
      setError('La contrasena debe tener al menos 8 caracteres');
      return;
    }

    setLoading(true);

    try {
      await register(formData);
      setSuccess(true);
      notifications.registerSuccess();
      
      // Reset form and close after brief success display
      setTimeout(() => {
        setFormData({
          username: '',
          email: '',
          password: '',
          password2: '',
          first_name: '',
          last_name: '',
          telefono: '',
        });
        setSuccess(false);
        onClose();
        onSuccess?.();
      }, 1500);
    } catch (err: any) {
      if (err instanceof APIError && err.errors) {
        setFieldErrors(err.errors);
      }
      const errorMessage = err instanceof APIError 
        ? err.message 
        : err.message || 'Error al registrarse';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError('');
    setFieldErrors({});
    setFormData({
      username: '',
      email: '',
      password: '',
      password2: '',
      first_name: '',
      last_name: '',
      telefono: '',
    });
    onClose();
  };

  const getFieldError = (field: string): string | undefined => {
    return fieldErrors[field]?.[0];
  };

  if (!isOpen) return null;

  if (success) {
    return (
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={handleClose}
      >
        <div 
          className="bg-card rounded-2xl max-w-md w-full p-8 relative shadow-2xl border border-border text-center animate-in fade-in-0 zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-muted"
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20 text-secondary mx-auto mb-4">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
            Cuenta Creada
          </h3>
          <p className="text-muted-foreground">
            Tu cuenta ha sido creada exitosamente. Bienvenido a Laguna Beach Club.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={handleClose}
    >
      <div 
        className="bg-card rounded-2xl max-w-md w-full p-8 relative shadow-2xl border border-border my-8 animate-in fade-in-0 zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-muted"
          aria-label="Cerrar"
        >
          <X size={24} />
        </button>

        <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Crear Cuenta</h2>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 text-destructive text-sm mb-6">
            <p className="font-medium">Error</p>
            <p className="mt-1 whitespace-pre-line">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nombre
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border bg-background rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                  getFieldError('first_name') ? 'border-destructive' : 'border-input'
                }`}
                placeholder="Juan"
                required
                disabled={loading}
              />
              {getFieldError('first_name') && (
                <p className="text-destructive text-xs mt-1">{getFieldError('first_name')}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Apellido
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border bg-background rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                  getFieldError('last_name') ? 'border-destructive' : 'border-input'
                }`}
                placeholder="Perez"
                required
                disabled={loading}
              />
              {getFieldError('last_name') && (
                <p className="text-destructive text-xs mt-1">{getFieldError('last_name')}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Usuario
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-3 border bg-background rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                getFieldError('username') ? 'border-destructive' : 'border-input'
              }`}
              placeholder="juanperez"
              required
              disabled={loading}
            />
            {getFieldError('username') && (
              <p className="text-destructive text-xs mt-1">{getFieldError('username')}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border bg-background rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                getFieldError('email') ? 'border-destructive' : 'border-input'
              }`}
              placeholder="juan@ejemplo.com"
              required
              disabled={loading}
            />
            {getFieldError('email') && (
              <p className="text-destructive text-xs mt-1">{getFieldError('email')}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Telefono (opcional)
            </label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className={`w-full px-4 py-3 border bg-background rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                getFieldError('telefono') ? 'border-destructive' : 'border-input'
              }`}
              placeholder="+505 1234 5678"
              disabled={loading}
            />
            {getFieldError('telefono') && (
              <p className="text-destructive text-xs mt-1">{getFieldError('telefono')}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Contrasena
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 border bg-background rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                getFieldError('password') ? 'border-destructive' : 'border-input'
              }`}
              placeholder="Minimo 8 caracteres"
              required
              disabled={loading}
            />
            {getFieldError('password') && (
              <p className="text-destructive text-xs mt-1">{getFieldError('password')}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Confirmar Contrasena
            </label>
            <input
              type="password"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              className={`w-full px-4 py-3 border bg-background rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                getFieldError('password2') ? 'border-destructive' : 'border-input'
              }`}
              placeholder="Repite tu contrasena"
              required
              disabled={loading}
            />
            {getFieldError('password2') && (
              <p className="text-destructive text-xs mt-1">{getFieldError('password2')}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mt-6"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Creando cuenta...
              </>
            ) : (
              'Crear Cuenta'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm">
            Ya tienes cuenta?{' '}
            <button
              onClick={() => {
                handleClose();
                onSwitchToLogin?.();
              }}
              className="text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              Inicia sesion aqui
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
