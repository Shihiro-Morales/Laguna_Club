import { 
  parseDjangoErrors, 
  getStatusMessage,
  notifications 
} from './notifications';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://backend-lagunaclub.onrender.com';

let accessToken: string | null = null;
let refreshToken: string | null = null;

// Inicializar tokens desde localStorage si existen
if (typeof window !== 'undefined') {
  accessToken = localStorage.getItem('access_token');
  refreshToken = localStorage.getItem('refresh_token');
}

// Guardar tokens en localStorage
function saveTokens(access: string, refresh: string) {
  accessToken = access;
  refreshToken = refresh;
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  }
}

// Limpiar tokens
function clearTokens() {
  accessToken = null;
  refreshToken = null;
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }
}

// Obtener tokens
function getTokens() {
  if (typeof window !== 'undefined') {
    const storedAccess = localStorage.getItem('access_token');
    const storedRefresh = localStorage.getItem('refresh_token');
    if (storedAccess) accessToken = storedAccess;
    if (storedRefresh) refreshToken = storedRefresh;
  }
  return { accessToken, refreshToken };
}

// Custom error class for API errors
export class APIError extends Error {
  status: number;
  errors?: Record<string, string[]>;
  
  constructor(message: string, status: number, errors?: Record<string, string[]>) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.errors = errors;
  }
}

// Parse error response from Django
function parseErrorResponse(data: any, status: number): APIError {
  // Check for Django validation errors (field-level errors)
  if (typeof data === 'object' && !data.Message && !data.message) {
    // This might be a validation error object like { "username": ["Already exists"] }
    const hasFieldErrors = Object.keys(data).some(key => 
      Array.isArray(data[key]) || typeof data[key] === 'string'
    );
    if (hasFieldErrors) {
      const message = parseDjangoErrors(data);
      return new APIError(message, status, data);
    }
  }
  
  // Standard ResponseData format
  const message = data.Message || data.message || data.detail || getStatusMessage(status);
  return new APIError(message, status, data.errors);
}

// Hacer fetch con autenticacion
async function fetchAPI<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const { accessToken: token } = getTokens();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Si unauthorized y tenemos refresh token, intentar refrescar
    if (response.status === 401 && refreshToken) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        // Reintentar con nuevo token
        return fetchAPI<T>(endpoint, options);
      } else {
        clearTokens();
        notifications.sessionExpired();
        throw new APIError('Sesion expirada. Por favor, inicia sesion nuevamente.', 401);
      }
    }

    const responseData = await response.json();

    // Handle error responses
    if (!response.ok) {
      throw parseErrorResponse(responseData, response.status);
    }

    // Handle backend ResponseData format with Success: false
    if (responseData.Success === false) {
      throw parseErrorResponse(responseData, responseData.Status || 400);
    }

    // Return Record if present, otherwise full response
    return responseData.Record !== undefined ? responseData.Record : responseData;
  } catch (error: any) {
    // Re-throw APIError as-is
    if (error instanceof APIError) {
      throw error;
    }
    
    // Handle network errors
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new APIError('Error de conexion. Verifica tu conexion a internet.', 0);
    }
    
    // Handle other errors
    throw new APIError(error.message || 'Error desconocido', 500);
  }
}

// Refrescar access token
async function refreshAccessToken(): Promise<boolean> {
  const { refreshToken: token } = getTokens();
  if (!token) return false;

  try {
    const response = await fetch(`${API_BASE_URL}/api/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: token }),
    });

    if (!response.ok) return false;

    const data = await response.json();
    const record = data.Record || data;
    saveTokens(record.access, token);
    return true;
  } catch (error) {
    return false;
  }
}

// ============ ENDPOINTS ============

// Autenticacion - Login (usa username, no email)
export async function login(username: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/api/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  // Handle error response
  if (!response.ok || data.Success === false) {
    throw parseErrorResponse(data, response.status);
  }

  const record = data.Record || data;
  saveTokens(record.access, record.refresh);

  return {
    access: record.access,
    refresh: record.refresh,
    user: record.user,
  };
}

// Autenticacion - Registro
export async function register(userData: {
  username: string;
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
  telefono?: string;
}) {
  const response = await fetch(`${API_BASE_URL}/api/v1/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  // Handle error response - check for field-level validation errors
  if (!response.ok) {
    // If response has field-level errors (Django validation)
    if (typeof data === 'object' && !data.Message && !data.Success) {
      const message = parseDjangoErrors(data);
      throw new APIError(message, response.status, data);
    }
    throw parseErrorResponse(data, response.status);
  }

  // Handle backend format with Success: false
  if (data.Success === false) {
    throw parseErrorResponse(data, data.Status || 400);
  }

  const record = data.Record || data;

  // Si el backend retorna tokens en el registro
  if (record.access && record.refresh) {
    saveTokens(record.access, record.refresh);
  }

  return record;
}

export async function logout() {
  clearTokens();
}

export function getCurrentUser() {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
}

export function setCurrentUser(user: any) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
}

// Servicios
export async function getServicios() {
  return fetchAPI('/api/servicio/Servicio/');
}

export async function getServicio(id: number) {
  return fetchAPI(`/api/servicio/Servicio/${id}/`);
}

// Habitaciones
export async function getHabitaciones() {
  return fetchAPI('/api/habitacion/Habitacion/');
}

export async function getHabitacion(id: number) {
  return fetchAPI(`/api/habitacion/Habitacion/${id}/`);
}

// Verificar disponibilidad de habitacion
export async function checkDisponibilidad(
  habitacionId: number,
  fechaEntrada: string,
  fechaSalida: string
) {
  return fetchAPI(
    `/api/habitacion/Habitacion/${habitacionId}/disponibilidad/?fecha_entrada=${fechaEntrada}&fecha_salida=${fechaSalida}`
  );
}

// Reservas
export async function crearReserva(reservaData: any) {
  return fetchAPI('/api/reserva/Reserva/', {
    method: 'POST',
    body: JSON.stringify(reservaData),
  });
}

export async function getReservas() {
  return fetchAPI('/api/reserva/Reserva/');
}

export async function getReserva(id: number) {
  return fetchAPI(`/api/reserva/Reserva/${id}/`);
}

export async function actualizarReserva(id: number, data: any) {
  return fetchAPI(`/api/reserva/Reserva/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function cancelarReserva(id: number) {
  return fetchAPI(`/api/reserva/Reserva/${id}/`, {
    method: 'DELETE',
  });
}

// Descuentos
export async function getDescuentos() {
  return fetchAPI('/api/descuento/');
}

export async function getDescuento(id: number) {
  return fetchAPI(`/api/descuento/${id}/`);
}

export async function crearDescuento(data: any) {
  return fetchAPI('/api/descuento/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function actualizarDescuento(id: number, data: any) {
  return fetchAPI(`/api/descuento/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// DayPass
export async function getDayPass() {
  return fetchAPI('/api/daypass/');
}

export async function getDayPassById(id: number) {
  return fetchAPI(`/api/daypass/${id}/`);
}

export async function crearDayPass(data: any) {
  return fetchAPI('/api/daypass/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function actualizarDayPass(id: number, data: any) {
  return fetchAPI(`/api/daypass/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function cancelarDayPass(id: number) {
  return fetchAPI(`/api/daypass/${id}/`, {
    method: 'DELETE',
  });
}

// Pagos
export async function getPagos() {
  return fetchAPI('/api/pago/');
}

export async function getPagoById(id: number) {
  return fetchAPI(`/api/pago/${id}/`);
}

export async function crearPago(data: any) {
  return fetchAPI('/api/pago/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function actualizarPago(id: number, data: any) {
  return fetchAPI(`/api/pago/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function confirmarPago(id: number) {
  return fetchAPI(`/api/pago/${id}/confirmar/`, {
    method: 'POST',
  });
}

export { getTokens, saveTokens, clearTokens, APIError };
