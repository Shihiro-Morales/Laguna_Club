import { toast } from 'sonner';

// Types for backend response
export interface BackendResponse<T = any> {
  success?: boolean;
  Success?: boolean;
  Status?: number;
  status?: number;
  Message?: string;
  message?: string;
  Record?: T;
  record?: T;
}

// Error types from Django validation
export interface DjangoValidationError {
  [field: string]: string[];
}

// Notification types
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

// Parse Django validation errors into user-friendly messages
export function parseDjangoErrors(errors: DjangoValidationError | string): string {
  if (typeof errors === 'string') {
    return errors;
  }

  const messages: string[] = [];
  
  for (const [field, fieldErrors] of Object.entries(errors)) {
    if (Array.isArray(fieldErrors)) {
      fieldErrors.forEach((error) => {
        // Map common field names to Spanish
        const fieldName = getFieldDisplayName(field);
        if (fieldName) {
          messages.push(`${fieldName}: ${error}`);
        } else {
          messages.push(error);
        }
      });
    } else if (typeof fieldErrors === 'string') {
      messages.push(fieldErrors);
    }
  }

  return messages.length > 0 ? messages.join('\n') : 'Error de validacion';
}

// Map field names to Spanish display names
function getFieldDisplayName(field: string): string {
  const fieldNames: Record<string, string> = {
    username: 'Usuario',
    email: 'Correo electronico',
    password: 'Contrasena',
    password2: 'Confirmar contrasena',
    first_name: 'Nombre',
    last_name: 'Apellido',
    telefono: 'Telefono',
    habitacion: 'Habitacion',
    fecha_entrada: 'Fecha de entrada',
    fecha_salida: 'Fecha de salida',
    personas: 'Numero de personas',
    non_field_errors: '',
    detail: '',
  };
  return fieldNames[field] ?? field;
}

// Parse HTTP status code to user-friendly message
export function getStatusMessage(status: number): string {
  const messages: Record<number, string> = {
    400: 'Datos invalidos. Por favor verifica la informacion ingresada.',
    401: 'Sesion expirada. Por favor inicia sesion nuevamente.',
    403: 'No tienes permisos para realizar esta accion.',
    404: 'El recurso solicitado no fue encontrado.',
    500: 'Error en el servidor. Por favor intenta mas tarde.',
    502: 'Error de conexion con el servidor.',
    503: 'Servicio no disponible. Por favor intenta mas tarde.',
  };
  return messages[status] || `Error ${status}. Por favor intenta nuevamente.`;
}

// Show success notification
export function showSuccess(message: string) {
  toast.success(message, {
    duration: 4000,
    style: {
      background: '#10B981',
      color: 'white',
      border: 'none',
    },
  });
}

// Show error notification
export function showError(message: string) {
  toast.error(message, {
    duration: 5000,
    style: {
      background: '#EF4444',
      color: 'white',
      border: 'none',
    },
  });
}

// Show warning notification
export function showWarning(message: string) {
  toast.warning(message, {
    duration: 4000,
    style: {
      background: '#F59E0B',
      color: 'white',
      border: 'none',
    },
  });
}

// Show info notification
export function showInfo(message: string) {
  toast.info(message, {
    duration: 4000,
    style: {
      background: '#3B82F6',
      color: 'white',
      border: 'none',
    },
  });
}

// Handle API response and show appropriate notification
export function handleApiResponse<T>(
  response: BackendResponse<T>,
  options?: {
    successMessage?: string;
    showSuccessToast?: boolean;
  }
): T | null {
  const success = response.success ?? response.Success;
  const message = response.Message ?? response.message;
  const record = response.Record ?? response.record;

  if (success) {
    if (options?.showSuccessToast !== false) {
      showSuccess(options?.successMessage ?? message ?? 'Operacion exitosa');
    }
    return record ?? null;
  } else {
    showError(message ?? 'Error en la operacion');
    return null;
  }
}

// Handle API error and show appropriate notification
export function handleApiError(error: any): string {
  // Network error
  if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
    const message = 'Error de conexion. Verifica tu conexion a internet.';
    showError(message);
    return message;
  }

  // Check if it's a response with validation errors
  if (error.errors && typeof error.errors === 'object') {
    const message = parseDjangoErrors(error.errors);
    showError(message);
    return message;
  }

  // Check for HTTP status
  if (error.status || error.Status) {
    const status = error.status || error.Status;
    const message = error.message || error.Message || getStatusMessage(status);
    showError(message);
    return message;
  }

  // Default error message
  const message = error.message || error.Message || 'Ocurrio un error inesperado';
  showError(message);
  return message;
}

// Notification for specific actions
export const notifications = {
  // Auth
  loginSuccess: () => showSuccess('Inicio de sesion exitoso'),
  loginError: (msg?: string) => showError(msg || 'Error al iniciar sesion'),
  registerSuccess: () => showSuccess('Usuario creado correctamente'),
  registerError: (msg?: string) => showError(msg || 'Error al registrarse'),
  logoutSuccess: () => showInfo('Sesion cerrada'),
  sessionExpired: () => showWarning('Tu sesion ha expirado. Por favor inicia sesion nuevamente.'),
  
  // Reservations
  reservationSuccess: () => showSuccess('Reserva creada correctamente'),
  reservationError: (msg?: string) => showError(msg || 'Error al crear la reserva'),
  reservationCancelled: () => showInfo('Reserva cancelada'),
  
  // General
  networkError: () => showError('Error de conexion. Verifica tu conexion a internet.'),
  serverError: () => showError('Error en el servidor. Por favor intenta mas tarde.'),
  authRequired: () => showWarning('Debes iniciar sesion para continuar'),
};
