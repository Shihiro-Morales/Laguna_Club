'use client';

import { useState } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { notifications } from '@/lib/notifications';
import { APIError } from '@/lib/api-client';
import { X, Loader2 } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister?: () => void;
  onSuccess?: () => void;
}

export function LoginModal({ isOpen, onClose, onSwitchToRegister, onSuccess }: LoginModalProps) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      notifications.loginSuccess();
      setUsername('');
      setPassword('');
      onClose();
      onSuccess?.();
    } catch (err: any) {
      const errorMessage = err instanceof APIError 
        ? err.message 
        : err.message || 'Error al iniciar sesion';
      setError(errorMessage);
      // Don't show toast here since we show inline error
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError('');
    setUsername('');
    setPassword('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl max-w-md w-full p-8 relative shadow-2xl border border-border animate-in fade-in-0 zoom-in-95 duration-200">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Iniciar Sesion</h2>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 text-destructive text-sm mb-6">
            <p className="font-medium">Error</p>
            <p className="mt-1 whitespace-pre-line">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Usuario o Email
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-input bg-background rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Ingresa tu usuario"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Contrasena
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-input bg-background rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Ingresa tu contrasena"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Iniciando sesion...
              </>
            ) : (
              'Iniciar Sesion'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm">
            No tienes cuenta?{' '}
            <button
              onClick={() => {
                handleClose();
                onSwitchToRegister?.();
              }}
              className="text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              Registrate aqui
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
