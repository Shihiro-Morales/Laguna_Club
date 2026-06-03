# Integración Backend-Frontend Laguna Beach Club

## ✨ Cambios Realizados

### 1. **Sistema de API Client y Autenticación**
- ✅ Creado `lib/api-client.ts` con cliente HTTP robusto
- ✅ Sistema JWT con auto-refresh de tokens
- ✅ Almacenamiento seguro de tokens en localStorage
- ✅ Contexto de autenticación (`AuthProvider`) para la aplicación

### 2. **Componentes de Autenticación**
- ✅ Modal de login (`components/auth/login-modal.tsx`)
- ✅ Modal de registro (`components/auth/register-modal.tsx`)
- ✅ Manejo completo de errores y validaciones

### 3. **Servicios y Actividades Dinámicas**
- ✅ Componente `ServiceGrid` que consume `/api/servicio/` del backend
- ✅ Carga dinámica de actividades con fallbacks de imágenes
- ✅ Grid responsivo con estados de carga

### 4. **Sistema de Reservaciones Mejorado**
- ✅ Nuevo formulario de reservaciones (`components/forms/reservation-form.tsx`)
- ✅ Autenticación requerida para reservar
- ✅ Consumo de habitaciones desde backend (`/api/habitacion/`)
- ✅ Validación de fechas y conflictos
- ✅ Envío de datos a `/api/reserva/` del backend
- ✅ Manejo de errores y mensajes de confirmación

### 5. **Página Explorar Mejorada**
- ✅ Sección "Sobre Nosotros" con información de la empresa
- ✅ Integración de servicios dinámicos del backend
- ✅ Imágenes generadas de actividades
- ✅ Estadísticas de la empresa

### 6. **Imágenes de Actividades**
- ✅ Kayaking: `/public/activities/kayaking.png`
- ✅ Scuba Diving: `/public/activities/scuba.png`
- ✅ Hiking: `/public/activities/hiking.png`
- ✅ Spa: `/public/activities/spa.png`
- ✅ Dining: `/public/activities/dining.png`

---

## 🚀 Instrucciones de Configuración

### Paso 1: Configurar Variables de Entorno

En la raíz del proyecto, edita o crea `.env.local`:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=https://backend-lagunaclub.onrender.com
```

Si deployas a producción, actualiza la URL con tu dominio del backend:
```env
NEXT_PUBLIC_API_URL=https://backend-lagunaclub.onrender.com
```

### Paso 2: Configurar CORS en el Backend Django

En el backend Django (`config/settings.py`), asegúrate de que CORS esté configurado:

```python
INSTALLED_APPS = [
    ...
    'corsheaders',
    ...
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
]

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',  # Desarrollo
    'https://backend-lagunaclub.onrender.com',
    'https://backend-lagunaclub.onrender.com',  # Producción
]

CORS_ALLOW_CREDENTIALS = True
```

### Paso 3: Iniciar el Backend Django

```bash
cd BackEnd_LagunaClub-main
python manage.py runserver 0.0.0.0:8000
```

### Paso 4: Iniciar el Frontend Next.js

```bash
npm run dev
# o
pnpm dev
```

Accede a http://localhost:3000

---

## 📝 Endpoints API Utilizados

### Autenticación
- `POST /api/login/` - Iniciar sesión
- `POST /api/register/` - Registrarse
- `POST /api/token/refresh/` - Refrescar token

### Servicios/Actividades
- `GET /api/servicio/` - Listar servicios
- `GET /api/servicio/{id}/` - Detalles de servicio

### Habitaciones
- `GET /api/habitacion/` - Listar habitaciones
- `GET /api/habitacion/{id}/` - Detalles de habitación
- `GET /api/habitacion/{id}/disponibilidad/` - Verificar disponibilidad

### Reservas
- `POST /api/reserva/` - Crear reserva (requiere autenticación)
- `GET /api/reserva/` - Listar reservas del usuario
- `GET /api/reserva/{id}/` - Detalles de reserva
- `PATCH /api/reserva/{id}/` - Actualizar reserva
- `DELETE /api/reserva/{id}/` - Cancelar reserva

---

## 🔐 Autenticación y Seguridad

### Token Management
- Los tokens JWT se almacenan en `localStorage`
- Se incluye automáticamente `Authorization: Bearer <token>` en todas las solicitudes
- Si el token expira, se intenta auto-refrescar con el `refresh_token`
- Si el refresh falla, el usuario es desconectado

### Protección de Rutas
- El formulario de reservaciones requiere autenticación
- Si el usuario intenta reservar sin sesión, se abre el modal de login
- Los datos se validan tanto en frontend como en backend

---

## 🎨 Flujo de Usuario

### Para Reservar:
1. Usuario hace clic en "Reservar"
2. Si no está autenticado, se muestra modal de login/registro
3. Usuario crea cuenta o inicia sesión
4. Completa el formulario de reservación:
   - Selecciona habitación
   - Elige fechas
   - Especifica número de huéspedes
   - Añade notas (opcional)
5. Hace clic en "Reservar"
6. Se valida en frontend (fechas, campos requeridos)
7. Se envía al backend
8. Confirmación y redirección

### Para Explorar Servicios:
1. Usuario abre página "El Resort"
2. Ve sección "Nuestras Actividades"
3. Se cargan dinámicamente desde `/api/servicio/`
4. Muestra nombre, descripción, precio e imagen de cada servicio

---

## 🛠️ Troubleshooting

### Error: "Failed to fetch"
- Verifica que el backend Django esté corriendo en el puerto 8000
- Revisa que CORS esté configurado correctamente
- Checa que `NEXT_PUBLIC_API_URL` sea correcto

### Error: "Sesión expirada"
- Los tokens pueden expirar después de 24 horas (según configuración Django)
- El usuario debe iniciar sesión nuevamente

### Imágenes no cargan
- Las imágenes del backend se sirven desde `/media/`
- Verifica que Django esté sirviendo archivos estáticos
- Usa las imágenes locales como fallback

### CORS Errors
- Asegúrate de que la URL del frontend está en `CORS_ALLOWED_ORIGINS`
- Reinicia el servidor Django después de cambiar settings
- Limpia el cache del navegador

---

## 📊 Próximos Pasos (Opcional)

Para mejorar aún más la integración:

1. **Envío de Correos**
   - Notificar confirmación de reservas
   - Recordatorios de check-in

2. **Pagos Online**
   - Integración con Stripe/PayPal
   - Pago al momento de la reserva

3. **Admin Dashboard**
   - Panel para gestionar reservas
   - Disponibilidad de habitaciones en tiempo real
   - Reportes de ocupación

4. **Calendario Interactivo**
   - Mostrar disponibilidad visual
   - Evitar conflictos de fechas

5. **Sistema de Reseñas**
   - Que los huéspedes dejen reseñas
   - Mostrar calificaciones

---

## 💾 Estructura de Archivos Creados

```
/vercel/share/v0-project/
├── lib/
│   ├── api-client.ts          # Cliente HTTP y endpoints
│   └── types.ts               # Tipos TypeScript
├── components/
│   ├── providers/
│   │   └── auth-provider.tsx  # Contexto de autenticación
│   ├── auth/
│   │   ├── login-modal.tsx    # Modal de login
│   │   └── register-modal.tsx # Modal de registro
│   ├── services/
│   │   └── service-grid.tsx   # Grid de servicios dinámico
│   └── forms/
│       ├── reservation-form.tsx # Nuevo formulario de reserva
│       └── contact-form.tsx     # (Antiguo, puede removerse)
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── login/route.ts
│   │       └── register/route.ts
│   ├── el-resort/page.tsx     # Actualizado
│   ├── reservaciones/page.tsx # Actualizado
│   └── layout.tsx             # Actualizado con AuthProvider
├── public/
│   └── activities/            # Imágenes generadas
│       ├── kayaking.png
│       ├── scuba.png
│       ├── hiking.png
│       ├── spa.png
│       └── dining.png
└── .env.local                 # Configuración de env
```

---

## ✅ Checklist de Validación

- [ ] Backend Django corriendo en puerto 8000
- [ ] CORS configurado en Django
- [ ] Variables de entorno configuradas (`.env.local`)
- [ ] Frontend corriendo en puerto 3000
- [ ] Modal de login funciona
- [ ] Modal de registro funciona
- [ ] Servicios se cargan dinámicamente
- [ ] Formulario de reserva funciona
- [ ] Token se guarda correctamente
- [ ] Las imágenes se muestran correctamente

---

## 📞 Soporte

Si encuentras problemas:

1. Revisa los logs del backend Django
2. Abre la consola del navegador (F12) para ver errores
3. Verifica que todos los servicios estén corriendo
4. Asegúrate que todas las variables de entorno estén configuradas

¡Listo! Tu aplicación está lista para uso. 🎉
