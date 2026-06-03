# INSTRUCCIONES PASO A PASO PARA HACER FUNCIONAR LA INTEGRACIÓN

## IMPORTANTE: Sigue estos pasos en orden exacto

### TERMINAL 1: BACKEND DJANGO

```bash
# 1. Navegar a la carpeta del backend
cd BackEnd_LagunaClub-main

# 2. Crear un ambiente virtual (si no lo tienes)
python -m venv venv

# 3. Activar el ambiente
# En Linux/Mac:
source venv/bin/activate
# En Windows:
venv\Scripts\activate

# 4. Instalar dependencias
pip install -r requirements.txt

# 5. Ejecutar migraciones
python manage.py migrate

# 6. Crear superusuario (admin)
python manage.py createsuperuser
# Te pedirá: username, email, password

# 7. Iniciar el servidor
python manage.py runserver 0.0.0.0:8000
```

Deberías ver:
```
Starting development server at http://0.0.0.0:8000/
```

**DEJAR ESTA TERMINAL ABIERTA Y CORRIENDO**

---

### TERMINAL 2: FRONTEND NEXT.JS

```bash
# 1. Navegar a la carpeta del frontend
cd v0-project

# 2. Verificar que .env.local existe
cat .env.local
# Deberías ver:
# NEXT_PUBLIC_API_URL=https://backend-lagunaclub.onrender.com

# 3. Si necesitas instalar dependencias (solo si no las tienes)
npm install

# 4. Iniciar el servidor de desarrollo
npm run dev
```

Deberías ver:
```
▲ Next.js 16.2.4 (Turbopack)
  Local:        http://localhost:3000
```

**DEJAR ESTA TERMINAL ABIERTA Y CORRIENDO**

---

## AHORA PRUEBA LA INTEGRACIÓN

### Abre tu navegador y ve a:
```
http://localhost:3000
```

### Test 1: Registrar Usuario
1. Haz clic en "Reservaciones" en la barra de navegación
2. Haz clic en "Regístrate aquí" en la sección naranja
3. Completa el formulario:
   - Usuario: `miusuario` (sin espacios)
   - Email: `miemail@example.com`
   - Nombre: `Juan`
   - Apellido: `Pérez`
   - Teléfono: `+505 1234 5678` (opcional)
   - Contraseña: `MiContraseña123`
4. Haz clic en "Crear Cuenta"
5. **Verifica que se registró sin errores**

### Test 2: Iniciar Sesión
1. Si no estás autenticado, deberías ver el modal de login
2. Ingresa:
   - Email: `miemail@example.com`
   - Contraseña: `MiContraseña123`
3. Haz clic en "Iniciar Sesión"
4. **Verifica que el botón "Crear Cuenta" se reemplazó con info de usuario**

### Test 3: Ver Servicios
1. Haz clic en "El Resort" en la barra de navegación
2. Desplázate hacia abajo
3. **Verifica que ves los servicios cargándose desde el backend**
4. Cada servicio debe mostrar:
   - Nombre (ej: "Kayaking")
   - Descripción
   - Precio
   - Imagen

### Test 4: Crear Reserva
1. Estando autenticado, ve a la página de "Reservaciones"
2. Completa el formulario:
   - Habitación: Selecciona una del dropdown
   - Fecha de entrada: Ej: 2024-06-15
   - Fecha de salida: Ej: 2024-06-18 (debe ser mayor que entrada)
   - Personas: Ej: 2
   - Servicios: Puedes seleccionar opcionales
3. Haz clic en "Hacer Reserva"
4. **Verifica que aparezca "Reserva creada exitosamente"**

---

## SI ALGO FALLA

### Error: "CORS policy: No 'Access-Control-Allow-Origin' header"
**Solución:** El backend no tiene CORS habilitado
1. Abre `BackEnd_LagunaClub-main/config/settings.py`
2. Busca `CORS_ALLOWED_ORIGINS`
3. Asegúrate que incluya:
   ```python
   CORS_ALLOWED_ORIGINS = [
       'http://localhost:3000',
   ]
   ```
4. Reinicia el backend

### Error: "Invalid token" o "Sesión expirada"
**Solución:** El token JWT ha expirado
1. Recarga la página
2. Vuelve a iniciar sesión

### Error: "No se puede conectar a https://backend-lagunaclub.onrender.com"
**Solución:** El backend no está corriendo
1. Verifica que la Terminal 1 esté activa
2. Debería decir "Starting development server at https://backend-lagunaclub.onrender.com"
3. Si no, ejecuta: `python manage.py runserver 0.0.0.0:8000`

### Error: "Habitación no encontrada" en dropdown
**Solución:** No hay habitaciones creadas en el backend
1. Ve a `https://backend-lagunaclub.onrender.com/admin/`
2. Inicia sesión con el superusuario que creaste
3. Ve a "Habitacion"
4. Clic en "Agregar Habitacion"
5. Completa los datos y guarda

### Error: "Servicio no encontrado" en "El Resort"
**Solución:** Similar al anterior, crea servicios en el admin

---

## VERIFICAR QUE TODO FUNCIONA

### En el navegador:

1. **Abre la consola (F12)**
2. Ve a la pestaña "Network"
3. Intenta hacer una acción (registrar, login, etc)
4. **Deberías ver requests a `https://backend-lagunaclub.onrender.com`** como:
   - `POST /api/v1/register/`
   - `POST /api/login/`
   - `GET /api/servicio/Servicio/`

### En las Terminales:

**Backend (Terminal 1):**
Deberías ver logs como:
```
[15/Jun/2024 10:30:45] "POST /api/v1/register/ HTTP/1.1" 201
[15/Jun/2024 10:31:20] "POST /api/login/ HTTP/1.1" 200
[15/Jun/2024 10:32:15] "GET /api/servicio/Servicio/ HTTP/1.1" 200
```

**Frontend (Terminal 2):**
Debería estar corriendo sin errores

---

## DATOS DE PRUEBA RECOMENDADOS

### Usuario:
- Username: `testuser`
- Email: `test@example.com`
- Nombre: `Test`
- Apellido: `User`
- Contraseña: `Test123456!`

### Habitación (Crear en Admin):
- Nombre: `Suite Ocean View`
- Tipo: `suite`
- Capacidad: `2`
- Precio: `150.00`
- Descripción: `Hermosa suite con vista al océano`

### Servicio (Crear en Admin):
- Nombre: `Kayaking`
- Descripción: `Tour en kayak por la laguna`
- Precio: `45.00`

---

## DIAGRAMA DE FLUJO

```
Cliente (Navegador)
      ↓
Frontend Next.js (3000)
      ↓
API Client (lib/api-client.ts)
      ↓
Backend Django (8000)
      ↓
Base de datos
```

---

## COMANDOS RÁPIDOS

**Detener backends:**
```bash
# Terminal 1 (Backend): Ctrl+C
# Terminal 2 (Frontend): Ctrl+C
```

**Reiniciar:**
```bash
# Backend: python manage.py runserver 0.0.0.0:8000
# Frontend: npm run dev
```

**Limpiar base de datos y empezar de nuevo:**
```bash
# En Backend
rm db.sqlite3  # Elimina base de datos
python manage.py migrate  # Crea nuevas tablas
python manage.py createsuperuser  # Crea admin nuevamente
```

---

## PRÓXIMOS PASOS

Después que todo funcione:

1. Crear más habitaciones y servicios en admin
2. Probar crear múltiples reservas
3. Ver reservas en la página (cuando se implemente)
4. Agregar más usuarios y probar conflictos de reservas
5. Preparar para deployment a Vercel (frontend) y servidor (backend)

---

## SOPORTE

Si algo no funciona:

1. **Verifica que ambas terminales están activas**
2. **Revisa los logs en ambas terminales** (busca errores rojo)
3. **Abre la consola del navegador** (F12) y mira "Network" y "Console"
4. **Verifica .env.local** tiene la URL correcta del backend

¡Buena suerte! La integración está lista.
