// Respuesta estándar del backend
export interface ResponseData<T = any> {
  Success: boolean;
  Status: number;
  Message: string;
  Record: T;
}

// Usuario
export interface Usuario {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  telefono?: string;
  tipo_usuario?: string;
  is_active: boolean;
  date_joined?: string;
}

// Servicio/Actividad
export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen?: string;
  activo: boolean;
}

// Habitación
export interface Habitacion {
  id: number;
  nombre: string;
  tipo: string;
  capacidad: number;
  precio: number;
  descripcion: string;
  imagen?: string;
  activa: boolean;
}

// Reserva
export interface Reserva {
  id: number;
  usuario: number;
  habitacion: number;
  fecha_entrada: string;
  fecha_salida: string;
  personas: number;
  servicios?: number[];
  total: number;
  estado: string;
  descuento?: number;
  fecha_creacion?: string;
}

// Respuesta de Login
export interface LoginResponse {
  access: string;
  refresh: string;
  user?: Usuario;
}

// Respuesta de Registro
export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

// Error API
export interface APIError {
  Success: boolean
  Status: number
  Message: string
}

// Descuento
export interface Descuento {
  id: number
  nombre: string
  porcentaje: number
  activo: boolean
  solo_daypass: boolean
  fecha_inicio: string
  fecha_fin: string
}

// DayPass
export interface DayPass {
  id: number
  usuario: number
  fecha: string
  cantidad_personas: number
  total: number
  activo: boolean
}

// Pago
export interface Pago {
  id: number
  reserva: number
  metodo_pago: 'efectivo' | 'tarjeta' | 'transferencia'
  monto: number
  pagado: boolean
  fecha_pago?: string
}
