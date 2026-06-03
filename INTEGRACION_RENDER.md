# Integración Frontend con Backend Render

## URL Base del Backend

```
https://backend-lagunaclub.onrender.com
```

Configurada en: `.env.local`

## Autenticación JWT

El backend utiliza JWT (JSON Web Tokens) con los siguientes endpoints:

### Login
```
POST /api/login/
Body: { "username": "string", "password": "string" }
Response: { "Success": true, "Record": { "access": "token", "refresh": "token", "user": {...} } }
```

### Registro
```
POST /api/v1/register/
Body: {
  "username": "string",
  "email": "string",
  "password": "string",
  "password2": "string",
  "first_name": "string",
  "last_name": "string"
}
```

### Refrescar Token
```
POST /api/refresh/
Body: { "refresh": "token" }
```

Los tokens se guardan automáticamente en `localStorage` y se envían en todas las peticiones protegidas con:
```
Authorization: Bearer {access_token}
```

## Capa de Servicios

Se ha creado una capa de servicios centralizada en `lib/services.ts` para organizar todas las llamadas a la API de forma escalable.

### AuthService

```typescript
import { AuthService } from '@/lib/services';

// Login
await AuthService.login(username, password);

// Registro
await AuthService.register({
  username: 'user',
  email: 'user@example.com',
  password: 'pass123',
  password2: 'pass123',
  first_name: 'Juan',
  last_name: 'Pérez'
});

// Logout
AuthService.logout();

// Obtener usuario actual
const user = AuthService.getCurrentUser();

// Tokens
const { accessToken, refreshToken } = AuthService.getTokens();
```

### HabitacionService

```typescript
import { HabitacionService } from '@/lib/services';

// Obtener todas las habitaciones
const habitaciones = await HabitacionService.getAll();

// Obtener habitación específica
const habitacion = await HabitacionService.getById(1);

// Verificar disponibilidad
const disponible = await HabitacionService.checkDisponibilidad(
  habitacionId,
  '2024-01-15',
  '2024-01-20'
);
```

### ServicioService

```typescript
import { ServicioService } from '@/lib/services';

// Obtener todos los servicios
const servicios = await ServicioService.getAll();

// Obtener servicio específico
const servicio = await ServicioService.getById(1);
```

### ReservaService

```typescript
import { ReservaService } from '@/lib/services';

// Crear reserva
const reserva = await ReservaService.create({
  habitacion: 1,
  fecha_entrada: '2024-01-15',
  fecha_salida: '2024-01-20',
  personas: 2,
  servicios: [1, 2],
  descuento: 1,
  total: 500.00,
  estado: 'pendiente'
});

// Obtener todas las reservas
const reservas = await ReservaService.getAll();

// Obtener reserva específica
const reserva = await ReservaService.getById(1);

// Actualizar reserva
await ReservaService.update(1, { estado: 'confirmada' });

// Cancelar reserva
await ReservaService.cancel(1);
```

### DescuentoService

```typescript
import { DescuentoService } from '@/lib/services';

// Obtener todos los descuentos
const descuentos = await DescuentoService.getAll();

// Obtener descuentos activos
const descuentosActivos = await DescuentoService.getActive();

// Obtener descuento específico
const descuento = await DescuentoService.getById(1);
```

### DayPassService

```typescript
import { DayPassService } from '@/lib/services';

// Crear DayPass
const daypass = await DayPassService.create({
  fecha: '2024-01-15',
  cantidad_personas: 4,
  total: 100.00
});

// Obtener todos los DayPass
const daypasses = await DayPassService.getAll();

// Obtener DayPass del usuario actual
const misDayPass = await DayPassService.getUserDayPass();

// Cancelar DayPass
await DayPassService.cancel(1);
```

### PagoService

```typescript
import { PagoService } from '@/lib/services';

// Crear pago
const pago = await PagoService.create({
  reserva: 1,
  metodo_pago: 'tarjeta',
  monto: 500.00
});

// Obtener pagos pendientes
const pagosPendientes = await PagoService.getPending();

// Confirmar pago
await PagoService.confirm(1);
```

### UtilsService

```typescript
import { UtilsService } from '@/lib/services';

// Calcular total de reserva
const total = UtilsService.calculateReservaTotal(
  precioHabitacion,
  fechaEntrada,
  fechaSalida,
  servicios,
  descuento
);

// Validar fechas
const valid = UtilsService.validateDates('2024-01-15', '2024-01-20');

// Formatear fecha
const formatted = UtilsService.formatDate('2024-01-15');
```

## Estructura de Respuestas

Todas las respuestas del backend siguen este formato:

```typescript
{
  "Success": boolean,
  "Status": number,
  "Message": string,
  "Record": any
}
```

El API client automáticamente:
- Extrae el `Record` si existe
- Maneja errores si `Success` es false
- Refuerza el token automáticamente en 401

## Modelos

### Usuario
```typescript
{
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  telefono?: string
  tipo_usuario?: string
  is_active: boolean
  date_joined?: string
}
```

### Habitación
```typescript
{
  id: number
  nombre: string
  tipo: 'master' | 'familiar' | 'dormitorio'
  capacidad: number
  precio: number
  descripcion: string
  imagen?: string
  activa: boolean
}
```

### Servicio
```typescript
{
  id: number
  nombre: string
  descripcion: string
  precio: number
  imagen?: string
  activo: boolean
}
```

### Reserva
```typescript
{
  id: number
  usuario: number
  habitacion: number
  descuento?: number
  servicios: number[]
  fecha_entrada: string (YYYY-MM-DD)
  fecha_salida: string (YYYY-MM-DD)
  personas: number
  total: number
  estado: 'pendiente' | 'confirmada' | 'cancelada'
}
```

### Descuento
```typescript
{
  id: number
  nombre: string
  porcentaje: number
  activo: boolean
  solo_daypass: boolean
  fecha_inicio: string (YYYY-MM-DD)
  fecha_fin: string (YYYY-MM-DD)
}
```

### DayPass
```typescript
{
  id: number
  usuario: number
  fecha: string (YYYY-MM-DD)
  cantidad_personas: number
  total: number
  activo: boolean
}
```

### Pago
```typescript
{
  id: number
  reserva: number
  metodo_pago: 'efectivo' | 'tarjeta' | 'transferencia'
  monto: number
  pagado: boolean
  fecha_pago?: string
}
```

## Documentación del Backend

Swagger UI disponible en:
```
https://backend-lagunaclub.onrender.com/swagger/
```

## Manejo de Errores

```typescript
try {
  const resultado = await ServicioService.getAll();
} catch (error: any) {
  console.error('Error:', error.message);
  // Error será un objeto Error con el mensaje del backend
}
```

## Variables de Entorno

```
NEXT_PUBLIC_API_URL=https://backend-lagunaclub.onrender.com
```

## Ejemplo de Uso en un Componente

```typescript
'use client';

import { useEffect, useState } from 'react';
import { HabitacionService } from '@/lib/services';
import type { Habitacion } from '@/lib/types';

export function HabitacionesComponent() {
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHabitaciones = async () => {
      try {
        const data = await HabitacionService.getAll();
        setHabitaciones(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadHabitaciones();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {habitaciones.map((h) => (
        <div key={h.id}>
          <h3>{h.nombre}</h3>
          <p>Precio: ${h.precio}</p>
          <p>Capacidad: {h.capacidad} personas</p>
        </div>
      ))}
    </div>
  );
}
```

## Notas

- El proyecto está completamente integrado con el backend en Render
- Arquitectura escalable con capa de servicios centralizada
- Tipos TypeScript para toda la API
- Manejo automático de tokens JWT
- Auto-refresh de tokens en 401
- Build exitoso sin errores
