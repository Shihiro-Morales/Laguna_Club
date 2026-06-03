Proyecto: Laguna Beach Club

Conecta todo el frontend al siguiente backend Django REST Framework desplegado en Render:

URL Base:
https://backend-lagunaclub.onrender.com

Autenticación:

* JWT Authentication.
* Login: POST /api/login/
* Refresh Token: POST /api/refresh/
* Registro: POST /api/v1/register/
* Guardar access y refresh token en localStorage.
* Enviar el token en las peticiones protegidas usando:
  Authorization: Bearer {access_token}

Endpoints disponibles:

Registro:
POST /api/v1/register/

Body:
{
"username": "string",
"email": "string",
"password": "string",
"password2": "string",
"first_name": "string",
"last_name": "string"
}

Login:
POST /api/login/

Body:
{
"username": "string",
"password": "string"
}

Descuentos:
GET /api/descuento/
POST /api/descuento/

Modelo:
{
"nombre": "string",
"porcentaje": 0,
"activo": true,
"solo_daypass": false,
"fecha_inicio": "YYYY-MM-DD",
"fecha_fin": "YYYY-MM-DD"
}

Habitaciones:
GET /api/habitacion/
POST /api/habitacion/

Modelo:
{
"nombre": "string",
"tipo": "master | familiar | dormitorio",
"capacidad": 0,
"precio": 0.00,
"descripcion": "string",
"activa": true
}

Servicios:
GET /api/servicio/
POST /api/servicio/

Modelo:
{
"nombre": "string",
"descripcion": "string",
"precio": 0.00,
"activo": true
}

DayPass:
GET /api/daypass/
POST /api/daypass/

Modelo:
{
"usuario": 1,
"fecha": "YYYY-MM-DD",
"cantidad_personas": 1,
"total": 0.00,
"activo": true
}

Reservas:
GET /api/reserva/
POST /api/reserva/

Modelo:
{
"usuario": 1,
"habitacion": 1,
"descuento": 1,
"servicios": [1,2],
"fecha_entrada": "YYYY-MM-DD",
"fecha_salida": "YYYY-MM-DD",
"personas": 1,
"total": 0.00,
"estado": "pendiente"
}

Pagos:
GET /api/pago/
POST /api/pago/

Modelo:
{
"reserva": 1,
"metodo_pago": "efectivo | tarjeta | transferencia",
"monto": 0.00,
"pagado": true
}

Requisitos del frontend:

1. Crear página de inicio (Landing Page).
2. Mostrar habitaciones desde la API.
3. Mostrar servicios desde la API.
4. Mostrar descuentos activos desde la API.
5. Crear pantalla de registro conectada al endpoint de registro.
6. Crear pantalla de login conectada a JWT.
7. Guardar tokens en localStorage.
8. Crear sistema de reservas conectado al endpoint de reservas.
9. Crear sistema de DayPass conectado al endpoint correspondiente.
10. Crear sistema de pagos conectado al endpoint de pagos.
11. Manejar errores de la API.
12. Utilizar fetch o axios.
13. Crear una capa de servicios para centralizar las llamadas a la API.
14. Mantener una arquitectura escalable y profesional.
15. Consumir la documentación disponible en:
    https://backend-lagunaclub.onrender.com/swagger/

Generar todo el código necesario para que el frontend quede completamente integrado con el backend.
