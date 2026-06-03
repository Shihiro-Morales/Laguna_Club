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

// Hacer fetch con autenticación
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
        throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
      }
    }

    const responseData = await response.json();

    // Manejar estructura ResponseData del backend
    if (responseData.Success === false) {
      throw new Error(responseData.Message || 'Error en la API');
    }

    if (!response.ok && responseData.Status >= 400) {
      throw new Error(responseData.Message || `API Error: ${response.status}`);
    }

    // Retornar Record o la data completa si no tiene estructura ResponseData
    return responseData.Record !== undefined ? responseData.Record : responseData;
  } catch (error: any) {
    console.error('[v0] API Error:', error);
    throw error;
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
    // El backend retorna ResponseData con Record = {access, refresh}
    const record = data.Record || data;
    saveTokens(record.access, token);
    return true;
  } catch (error) {
    console.error('[v0] Refresh token error:', error);
    return false;
  }
}

// ============ ENDPOINTS ============

// Autenticación - Login (usa username, no email)
export async function login(username: string, password: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!data.Success) {
      throw new Error(data.Message || 'Error al iniciar sesión');
    }

    const record = data.Record || data;
    saveTokens(record.access, record.refresh);
    
    return {
      access: record.access,
      refresh: record.refresh,
      user: record.user,
    };
  } catch (error: any) {
    throw error;
  }
}

// Autenticación - Registro
export async function register(userData: {
  username: string;
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
  telefono?: string;
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!data.Success) {
      throw new Error(data.Message || 'Error al registrarse');
    }

    const record = data.Record || data;
    
    // Si el backend retorna tokens en el registro
    if (record.access && record.refresh) {
      saveTokens(record.access, record.refresh);
    }

    return record;
  } catch (error: any) {
    throw error;
  }
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

// Verificar disponibilidad de habitación
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

export { getTokens, saveTokens, clearTokens };
