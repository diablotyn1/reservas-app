🎯 Guía de Demostración Completa en Swagger
📍 Accede a Swagger
http://localhost:3000/api/docs

🔥 DEMOSTRACIÓN PASO A PASO
FASE 1: Autenticación y Usuarios
Paso 1: Registrar un usuario nuevo
📍 POST /auth/register
json{
  "nombre": "Juan Pérez",
  "email": "juan@test.com",
  "password": "123456"
}
✅ **Resultado:**Recibirás un access_token y datos del usuario con rol "user"

Paso 2: Login con usuario administrador
📍 POST /auth/login
json{
  "email": "juan@correo123.com",
  "password": "1234qwe"
}
✅ Resultado: Token JWT del admin
🔑 IMPORTANTE: Copia el access_token que te devuelve

Paso 3: Autorizar en Swagger

Click en el botón 🔒 Authorize (arriba a la derecha)
Pega el token que copiaste
Click en Authorize
Click en Close

✅ Ahora puedes usar todos los endpoints protegidos

FASE 2: Configuración Base
Paso 4: Ver roles existentes
📍 GET /roles
✅ Verás los 3 roles: admin, user, supervisor

Paso 5: Crear tipos de espacio
📍 POST /tipos-espacio
json{
  "nombre": "Sala de Reuniones",
  "descripcion": "Espacios para reuniones corporativas"
}
Repite con otros tipos:
json{
  "nombre": "Aula",
  "descripcion": "Salones para capacitaciones"
}
json{
  "nombre": "Coworking",
  "descripcion": "Espacios de trabajo compartido"
}
✅ Resultado: 3 tipos de espacio creados

Paso 6: Ver tipos de espacio
📍 GET /tipos-espacio
✅ Verás todos los tipos creados con sus IDs

FASE 3: Crear Espacios
Paso 7: Crear espacios
📍 POST /espacios
json{
  "nombre": "Sala Ejecutiva A-101",
  "capacidad": 10,
  "tipoId": 1,
  "ubicacion": "Edificio A - Piso 1",
  "descripcion": "Sala con proyector y pizarra digital",
  "disponible": true
}
Crea más espacios:
json{
  "nombre": "Aula Magna",
  "capacidad": 50,
  "tipoId": 2,
  "ubicacion": "Edificio Principal",
  "descripcion": "Auditorio principal"
}
json{
  "nombre": "Coworking Central",
  "capacidad": 20,
  "tipoId": 3,
  "ubicacion": "Edificio B - Piso 2",
  "descripcion": "Espacio compartido con internet"
}
✅ Resultado: 3 espacios disponibles

Paso 8: Ver espacios disponibles
📍 GET /espacios?disponible=true
✅ Verás todos los espacios disponibles con sus equipos

FASE 4: Agregar Equipamiento
Paso 9: Agregar equipos a los espacios
📍 POST /equipos
json{
  "nombre": "Proyector HD",
  "espacioId": 1,
  "cantidad": 1,
  "funcional": true,
  "descripcion": "Proyector 1080p con HDMI"
}
json{
  "nombre": "Pizarra Digital",
  "espacioId": 1,
  "cantidad": 1,
  "funcional": true
}
json{
  "nombre": "Sillas",
  "espacioId": 1,
  "cantidad": 10,
  "funcional": true
}
✅ Resultado: Espacio equipado

Paso 10: Ver equipos de un espacio
📍 GET /equipos/espacio/1
✅ Verás todos los equipos del espacio ID 1

FASE 5: Horarios
Paso 11: Crear horarios
📍 POST /horarios
json{
  "horaInicio": "08:00",
  "horaFin": "10:00",
  "descripcion": "Bloque matutino 1",
  "activo": true
}
Crea más horarios:
json{
  "horaInicio": "10:00",
  "horaFin": "12:00",
  "descripcion": "Bloque matutino 2"
}
json{
  "horaInicio": "14:00",
  "horaFin": "16:00",
  "descripcion": "Bloque vespertino"
}
✅ Resultado: Horarios disponibles

Paso 12: Ver horarios activos
📍 GET /horarios/activos
✅ Verás todos los horarios disponibles

FASE 6: Reservas (Lo más importante)
Paso 13: Verificar disponibilidad
📍 GET /reservas/verificar-disponibilidad
Parámetros:

espacioId: 1
horarioId: 1
fecha: 2025-11-15

✅ Resultado: { "disponible": true }

Paso 14: Crear una reserva
📍 POST /reservas
json{
  "usuarioId": 2,
  "espacioId": 1,
  "horarioId": 1,
  "fecha": "2025-11-15",
  "motivo": "Reunión de equipo",
  "observaciones": "Necesitamos proyector"
}
✅ Resultado: Reserva creada con estado "activa"

Paso 15: Intentar reservar el mismo espacio (debe fallar)
📍 POST /reservas
json{
  "usuarioId": 2,
  "espacioId": 1,
  "horarioId": 1,
  "fecha": "2025-11-15",
  "motivo": "Otra reunión"
}
❌ Resultado: Error 409 - "Ya existe una reserva activa para este espacio, horario y fecha"
✅ Esto demuestra la validación de disponibilidad

Paso 16: Ver todas las reservas
📍 GET /reservas
✅ Verás todas las reservas con información completa

Paso 17: Ver reservas de un usuario
📍 GET /reservas/usuario/2
✅ Verás solo las reservas de ese usuario

FASE 7: Incidencias
Paso 18: Reportar una incidencia
📍 POST /incidencias
json{
  "reservaId": 1,
  "descripcion": "El proyector no enciende correctamente",
  "prioridad": "alta",
  "reportadoPor": 2
}
✅ Resultado: Incidencia reportada con estado "reportada"

Paso 19: Ver incidencias pendientes
📍 GET /incidencias/pendientes
✅ Verás todas las incidencias sin resolver

Paso 20: Resolver una incidencia
📍 PATCH /incidencias/1/resolver
json{
  "resueltoPor": 1,
  "notasResolucion": "Se reemplazó el proyector por uno nuevo"
}
✅ Resultado: Incidencia marcada como "resuelta"

Paso 21: Cerrar incidencia
📍 PATCH /incidencias/1/cerrar
✅ Resultado: Incidencia cerrada

FASE 8: Gestión de Reservas
Paso 22: Cancelar una reserva
📍 PATCH /reservas/1/cancelar
✅ Resultado: Reserva cancelada

Paso 23: Ver reservas por estado
📍 GET /reservas/estado/cancelada
✅ Verás solo las reservas canceladas

FASE 9: Gestión de Usuarios (Admin)
Paso 24: Ver todos los usuarios
📍 GET /usuarios
✅ Verás todos los usuarios del sistema

Paso 25: Crear un usuario con rol supervisor
📍 POST /usuarios
json{
  "nombre": "María Supervisor",
  "email": "maria@sistema.com",
  "password": "123456",
  "rolId": 3,
  "activo": true
}
✅ Resultado: Usuario supervisor creado

Paso 26: Desactivar un usuario
📍 PATCH /usuarios/3/toggle-active
✅ Resultado: Usuario desactivado

FASE 10: Filtros y Búsquedas
Paso 27: Buscar espacios por tipo
📍 GET /espacios/tipo/1
✅ Verás solo las salas de reuniones

Paso 28: Ver incidencias por prioridad
📍 GET /incidencias/prioridad/alta
✅ Verás solo incidencias de alta prioridad

Paso 29: Ver reservas de un espacio
📍 GET /reservas/espacio/1
✅ Verás todas las reservas de ese espacio
