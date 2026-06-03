# Guía de Integración: Laguna Beach Frontend + Backend Django

## Estado Actual

El frontend de Laguna Beach ha sido completamente adaptado para funcionar con el backend Django proporcionado. La integración es 100% funcional y lista para producción.

## Estructura de Endpoints

El frontend consumo estos endpoints del backend:

```
POST   /api/login/                   → Iniciar sesión
POST   /api/v1/register/             → Registrarse
POST   /api/refresh/                 → Refrescar token JWT

GET    /api/habitacion/Habitacion/   → Listar habitaciones
GET    /api/habitacion/Habitacion/{id}/  → Obtener habitación específica

GET    /api/servicio/Servicio/       → Listar servicios/actividades
GET    /api/servicio/Servicio/{id}/  → Obtener servicio específico

POST   /api/reserva/Reserva/         → Crear reserva (requiere auth)
GET    /api/reserva/Reserva/         → Listar mis reservas (requiere auth)
GET    /api/reserva/Reserva/{id}/    → Ver una reserva (requiere auth)
PUT    /api/reserva/Reserva/{id}/    → Actualizar reserva (requiere auth)
DELETE /api/reserva/Reserva/{id}/    → Cancelar reserva (requiere auth)
```

## Configuración Backend

### 1. Asegurar CORS

En `config/settings.py` del backend, verifica que CORS esté configurado:

```python
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://tudominio.com',  # Agregar dominio en producción
]
```

### 2. Variables de Entorno Backend

```bash
DEBUG=False  # En producción
SECRET_KEY=tu_clave_secreta_fuerte
ALLOWED_HOSTS=localhost,127.0.0.1,tudominio.com
```

### 3. Ejecutar Backend

```bash
cd BackEnd_LagunaClub-main

# Instalar dependencias
pip install -r requirements.txt

# Migraciones
python manage.py migrate

# Crear superusuario (admin)
python manage.py createsuperuser

# Iniciar servidor
python manage.py runserver 0.0.0.0:8000
```

## Configuración Frontend

### 1. Variables de Entorno

Archivo `.env.local`:
```
NEXT_PUBLIC_API_URL=https://backend-lagunaclub.onrender.com
```

Para producción:
```
NEXT_PUBLIC_API_URL=https://backend-lagunaclub.onrender.com
```

### 2. Instalar Dependencias

```bash
cd v0-project
npm install
```

### 3. Ejecutar Frontend

Desarrollo:
```bash
npm run dev
```

Producción:
```bash
npm run build
npm start
```

Acceder a: `https://backend-lagunaclub.onrender.com`

## Flujo de Usuario

### Registro
1. Usuario hace clic en "Registrarse"
2. Completa formulario con:
   - Usuario (username)
   - Email
   - Nombre (first_name)
   - Apellido (last_name)
   - Teléfono (opcional)
   - Contraseña
3. Frontend envía POST a `/api/v1/register/`
4. Backend crea usuario y retorna tokens JWT
5. Tokens se guardan en localStorage
6. Usuario queda autenticado

### Login
1. Usuario hace clic en "Iniciar Sesión"
2. Completa email y contraseña
3. Frontend envía POST a `/api/login/`
4. Backend valida y retorna access + refresh tokens
5. Tokens se guardan en localStorage
6. Usuario queda autenticado

### Crear Reserva
1. Usuario autenticado abre página "Reservar"
2. Selecciona:
   - Habitación
   - Fecha de entrada
   - Fecha de salida
   - Número de huéspedes
   - Servicios opcionales
3. Frontend calcula total: `precio_habitacion × número_noches`
4. Valida que fecha_salida > fecha_entrada
5. Frontend envía POST a `/api/reserva/Reserva/` con Bearer token
6. Backend:
   - Valida conflictos de fechas
   - Asigna usuario automáticamente desde request.user
   - Crea reserva con estado 'pendiente'
7. Muestra confirmación

### Ver Mis Reservas
1. Usuario autenticado ve sección "Mis Reservas"
2. Frontend consume GET `/api/reserva/Reserva/`
3. Backend retorna solo reservas del usuario actual
4. Usuario puede ver estado: pendiente/confirmada/cancelada

## Estructura de Datos

### Usuario
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "telefono": "+505 1234 5678",
  "is_active": true
}
```

### Habitación
```json
{
  "id": 1,
  "nombre": "Suite Ocean View",
  "tipo": "suite",
  "capacidad": 2,
  "precio": 150.00,
  "descripcion": "Hermosa suite con vista al océano",
  "imagen": "https://...",
  "activa": true
}
```

### Servicio
```json
{
  "id": 1,
  "nombre": "Kayaking",
  "descripcion": "Tour en kayak por la laguna",
  "precio": 45.00,
  "imagen": "https://...",
  "activo": true
}
```

### Reserva
```json
{
  "id": 1,
  "usuario": 1,
  "habitacion": 1,
  "fecha_entrada": "2024-06-15",
  "fecha_salida": "2024-06-18",
  "personas": 2,
  "servicios": [1, 2],
  "total": 450.00,
  "estado": "pendiente"
}
```

## Respuestas del Backend

Todas las respuestas siguen estructura ResponseData:

```json
{
  "Success": true,
  "Status": 200,
  "Message": "Operación exitosa",
  "Record": { }
}
```

El frontend extrae automáticamente `Record` para trabajar con los datos.

## Autenticación JWT

### Access Token
- Válido por tiempo limitado (típicamente 15 minutos)
- Usado en header: `Authorization: Bearer {access}`

### Refresh Token
- Válido por más tiempo
- Usado para obtener nuevo access token
- POST a `/api/refresh/` con `{"refresh": token}`

### Auto-Refresh
El frontend detecta cuando access token expira (401) y:
1. Usa refresh token para obtener nuevo access
2. Reintentar request original
3. Si refresh falla, limpia sesión y requiere nuevo login

## Troubleshooting

### "Error: CORS policy"
- Verificar CORS_ALLOWED_ORIGINS en backend settings.py
- Asegurar que http://localhost:3000 está incluido

### "Invalid token" en requests
- Verificar que Authorization header tiene formato: `Bearer {token}`
- Comprobar que token no está expirado
- Usar refresh token si es necesario

### "Usuario no encontrado" en login
- Verificar email es correcto
- Asegurar usuario existe en backend
- Probar credenciales en admin de Django

### "Habitación no disponible"
- Backend valida conflictos automáticamente
- Seleccionar fechas sin conflictos existentes
- Ver en admin de Django qué reservas existen

### Frontend no conecta a backend
- Verificar backend está corriendo: `http://localhost:8000`
- Revisar NEXT_PUBLIC_API_URL en .env.local
- Comprobar CORS_ALLOWED_ORIGINS

## Desarrollo

### Añadir Nuevas Rutas
1. Backend: Crear API endpoint
2. Frontend: Agregar función en `lib/api-client.ts`
3. Frontend: Crear componente que use la función
4. Frontend: Actualizar tipos en `lib/types.ts`

### Modifying Auth Flow
Todos los cambios de autenticación se hacen en:
- `components/providers/auth-provider.tsx` - Contexto global
- `components/auth/login-modal.tsx` - Interfaz login
- `components/auth/register-modal.tsx` - Interfaz registro
- `lib/api-client.ts` - Llamadas API

### Custom Validations
Agregar validaciones en frontend en:
- `components/forms/reservation-form.tsx` - Formulario
- Validaciones específicas antes de submit

## Producción

### Deployment Frontend (Vercel)
```bash
git push origin main
# Vercel auto-deploya
```

Configurar variables en Vercel dashboard:
```
NEXT_PUBLIC_API_URL=https://api-backend.tudominio.com
```

### Deployment Backend
Usar servicio como Heroku, Railway, AWS, etc.

Asegurar:
- DEBUG=False
- SECRET_KEY fuerte y única
- ALLOWED_HOSTS incluye tu dominio
- CORS_ALLOWED_ORIGINS incluye frontend URL
- Base de datos en producción (PostgreSQL recomendado)

## Estadísticas de Compilación

✓ Build exitoso sin errores
✓ Todas las páginas precompiladas
✓ API endpoints configurados correctamente
✓ Autenticación JWT integrada
✓ Servicios dinámicos del backend
✓ Reservaciones funcionales

## Contacto & Soporte

Si tienes problemas con la integración:
1. Revisar logs del backend: `python manage.py runserver`
2. Revisar logs del frontend: Browser console (F12)
3. Verificar CORS y endpoints
4. Comprobar credenciales y tokens
