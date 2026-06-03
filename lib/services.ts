import * as api from './api-client';
import type {
  Usuario,
  Habitacion,
  Servicio,
  Reserva,
  Descuento,
  DayPass,
  Pago,
} from './types';

// ============ AUTHENTICATION SERVICES ============

export const AuthService = {
  async login(username: string, password: string) {
    return api.login(username, password);
  },

  async register(userData: {
    username: string;
    email: string;
    password: string;
    password2: string;
    first_name: string;
    last_name: string;
  }) {
    return api.register(userData);
  },

  logout() {
    api.logout();
  },

  getCurrentUser(): Usuario | null {
    return api.getCurrentUser();
  },

  setCurrentUser(user: Usuario) {
    api.setCurrentUser(user);
  },

  getTokens() {
    return api.getTokens();
  },

  clearTokens() {
    api.clearTokens();
  },
};

// ============ HABITACION SERVICES ============

export const HabitacionService = {
  async getAll(): Promise<Habitacion[]> {
    return api.getHabitaciones();
  },

  async getById(id: number): Promise<Habitacion> {
    return api.getHabitacion(id);
  },

  async checkDisponibilidad(
    habitacionId: number,
    fechaEntrada: string,
    fechaSalida: string
  ) {
    return api.checkDisponibilidad(habitacionId, fechaEntrada, fechaSalida);
  },
};

// ============ SERVICIO SERVICES ============

export const ServicioService = {
  async getAll(): Promise<Servicio[]> {
    return api.getServicios();
  },

  async getById(id: number): Promise<Servicio> {
    return api.getServicio(id);
  },
};

// ============ RESERVA SERVICES ============

export const ReservaService = {
  async create(reservaData: any): Promise<Reserva> {
    return api.crearReserva(reservaData);
  },

  async getAll(): Promise<Reserva[]> {
    return api.getReservas();
  },

  async getById(id: number): Promise<Reserva> {
    return api.getReserva(id);
  },

  async update(id: number, data: any): Promise<Reserva> {
    return api.actualizarReserva(id, data);
  },

  async cancel(id: number): Promise<any> {
    return api.cancelarReserva(id);
  },
};

// ============ DESCUENTO SERVICES ============

export const DescuentoService = {
  async getAll(): Promise<Descuento[]> {
    return api.getDescuentos();
  },

  async getById(id: number): Promise<Descuento> {
    return api.getDescuento(id);
  },

  async create(data: any): Promise<Descuento> {
    return api.crearDescuento(data);
  },

  async update(id: number, data: any): Promise<Descuento> {
    return api.actualizarDescuento(id, data);
  },

  // Obtener descuentos activos
  async getActive(): Promise<Descuento[]> {
    const all = await this.getAll();
    return all.filter((d) => d.activo);
  },
};

// ============ DAYPASS SERVICES ============

export const DayPassService = {
  async getAll(): Promise<DayPass[]> {
    return api.getDayPass();
  },

  async getById(id: number): Promise<DayPass> {
    return api.getDayPassById(id);
  },

  async create(data: any): Promise<DayPass> {
    return api.crearDayPass(data);
  },

  async update(id: number, data: any): Promise<DayPass> {
    return api.actualizarDayPass(id, data);
  },

  async cancel(id: number): Promise<any> {
    return api.cancelarDayPass(id);
  },

  // Obtener DayPass del usuario actual
  async getUserDayPass(): Promise<DayPass[]> {
    const all = await this.getAll();
    const user = AuthService.getCurrentUser();
    return all.filter((d) => d.usuario === user?.id);
  },
};

// ============ PAGO SERVICES ============

export const PagoService = {
  async getAll(): Promise<Pago[]> {
    return api.getPagos();
  },

  async getById(id: number): Promise<Pago> {
    return api.getPagoById(id);
  },

  async create(data: any): Promise<Pago> {
    return api.crearPago(data);
  },

  async update(id: number, data: any): Promise<Pago> {
    return api.actualizarPago(id, data);
  },

  async confirm(id: number): Promise<any> {
    return api.confirmarPago(id);
  },

  // Obtener pagos pendientes
  async getPending(): Promise<Pago[]> {
    const all = await this.getAll();
    return all.filter((p) => !p.pagado);
  },
};

// ============ UTILS SERVICES ============

export const UtilsService = {
  // Calcular total de reserva
  calculateReservaTotal(
    precioHabitacion: number,
    fechaEntrada: string,
    fechaSalida: string,
    servicios: Servicio[] = [],
    descuento?: Descuento
  ): number {
    const entrada = new Date(fechaEntrada);
    const salida = new Date(fechaSalida);
    const noches = Math.ceil(
      (salida.getTime() - entrada.getTime()) / (1000 * 60 * 60 * 24)
    );

    let total = precioHabitacion * noches;

    // Agregar servicios
    servicios.forEach((s) => {
      total += s.precio;
    });

    // Aplicar descuento
    if (descuento) {
      total -= total * (descuento.porcentaje / 100);
    }

    return Math.round(total * 100) / 100;
  },

  // Validar fechas
  validateDates(fechaEntrada: string, fechaSalida: string): boolean {
    const entrada = new Date(fechaEntrada);
    const salida = new Date(fechaSalida);
    return salida > entrada;
  },

  // Formatear fecha
  formatDate(date: string | Date): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toISOString().split('T')[0];
  },
};
