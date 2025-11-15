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

----------------------------------------------------------------------------------------------------------------------------

🎯 Hacer una Reserva Completa (Espacio + Horario + Fecha)
📋 Flujo completo paso a paso:

PASO 1: Ver espacios disponibles
📍 GET /espacios?disponible=true
✅ Verás todos los espacios disponibles con sus equipos.
Ejemplo de respuesta:
json[
  {
    "id": 1,
    "nombre": "Sala Ejecutiva A-101",
    "capacidad": 10,
    "tipo": {
      "id": 1,
      "nombre": "Sala de Reuniones"
    },
    "ubicacion": "Edificio A - Piso 1",
    "disponible": true,
    "equipos": [
      {
        "id": 1,
        "nombre": "Proyector HD",
        "cantidad": 1,
        "funcional": true
      },
      {
        "id": 2,
        "nombre": "Pizarra Digital",
        "cantidad": 1,
        "funcional": true
      }
    ]
  }
]
Anota el ID del espacio que quieres reservar (ej: 1)

PASO 2: Ver horarios disponibles
📍 GET /horarios/activos
✅ Verás los horarios disponibles.
Ejemplo:
json[
  {
    "id": 1,
    "horaInicio": "08:00",
    "horaFin": "10:00",
    "descripcion": "Bloque matutino 1",
    "activo": true
  },
  {
    "id": 2,
    "horaInicio": "10:00",
    "horaFin": "12:00",
    "descripcion": "Bloque matutino 2",
    "activo": true
  }
]
Anota el ID del horario que quieres (ej: 1 = 08:00 a 10:00)

PASO 3: Verificar disponibilidad (IMPORTANTE)
📍 GET /reservas/verificar-disponibilidad
Parámetros:

espacioId: 1
horarioId: 1
fecha: 2025-11-16 (formato YYYY-MM-DD, debe ser hoy o futuro)

✅ Respuesta si está disponible:
json{
  "disponible": true
}
❌ Si está ocupado:
json{
  "disponible": false
}

PASO 4: Crear la reserva
📍 POST /reservas
json{
  "usuarioId": 2,
  "espacioId": 1,
  "horarioId": 1,
  "fecha": "2025-11-16",
  "motivo": "Reunión de planificación estratégica",
  "observaciones": "Necesitamos proyector y pizarra digital"
}
Campos explicados:

usuarioId: ID del usuario que hace la reserva (puedes obtenerlo de GET /usuarios)
espacioId: ID del espacio (del PASO 1)
horarioId: ID del horario (del PASO 2)
fecha: Fecha de la reserva (YYYY-MM-DD)
motivo: Para qué es la reserva
observaciones: Equipos o necesidades especiales

✅ Respuesta exitosa:
json{
  "id": 1,
  "usuario": {
    "id": 2,
    "nombre": "Juan",
    "email": "juan@correo123.com"
  },
  "espacio": {
    "id": 1,
    "nombre": "Sala Ejecutiva A-101",
    "tipo": {
      "nombre": "Sala de Reuniones"
    }
  },
  "horario": {
    "id": 1,
    "horaInicio": "08:00",
    "horaFin": "10:00"
  },
  "fecha": "2025-11-16",
  "estado": "activa",
  "motivo": "Reunión de planificación estratégica",
  "observaciones": "Necesitamos proyector y pizarra digital"
}
🔒 El espacio ahora está OCUPADO para ese horario y fecha

PASO 5: Intentar reservar lo mismo (debe fallar)
📍 POST /reservas
json{
  "usuarioId": 3,
  "espacioId": 1,
  "horarioId": 1,
  "fecha": "2025-11-16",
  "motivo": "Otra reunión"
}
❌ Error 409 - Conflicto:
json{
  "statusCode": 409,
  "message": "Ya existe una reserva activa para este espacio, horario y fecha",
  "error": "Conflict"
}
```

✅ **Esto demuestra que el sistema valida disponibilidad**

---

## **PASO 6: Ver todas las reservas**

📍 **GET /reservas**

✅ Verás todas las reservas con información completa:
- Usuario que reservó
- Espacio reservado (con equipos)
- Horario
- Fecha
- Estado

---

## **PASO 7: Ver reservas de un espacio específico**

📍 **GET /reservas/espacio/1**

✅ Verás todas las reservas del espacio con ID 1, para saber qué días/horarios están ocupados.

---

## 🎬 Demostración Completa - Script:

### **Escenario: Admin reserva sala con equipos**

1. **Ver espacios disponibles**
   - GET /espacios?disponible=true
   - "Tenemos la Sala A-101 con proyector y pizarra"

2. **Ver horarios**
   - GET /horarios/activos
   - "Está disponible de 08:00 a 10:00"

3. **Verificar disponibilidad**
   - GET /reservas/verificar-disponibilidad
   - Params: espacioId=1, horarioId=1, fecha=2025-11-16
   - Respuesta: `{ "disponible": true }`

4. **Crear reserva**
   - POST /reservas
   - "Reservo la sala para reunión de equipo"
   - ✅ Reserva creada

5. **Intentar reservar lo mismo**
   - POST /reservas (mismos datos)
   - ❌ Error 409: "Ya existe una reserva"
   - "El sistema previene reservas duplicadas"

6. **Ver reservas del espacio**
   - GET /reservas/espacio/1
   - "Aquí vemos que está ocupado ese horario"

---

## 📊 Resumen del flujo:
```
1. GET espacios disponibles → Elegir espacio
2. GET horarios activos → Elegir horario
3. GET verificar disponibilidad → Confirmar que está libre
4. POST crear reserva → Reserva el espacio
5. GET reservas → Ver todas las reservas

🎯 Datos de ejemplo para tu demostración:
Primera reserva:
json{
  "usuarioId": 2,
  "espacioId": 1,
  "horarioId": 1,
  "fecha": "2025-11-16",
  "motivo": "Reunión de equipo de ventas",
  "observaciones": "Usar proyector para presentación"
}
Segunda reserva (diferente horario):
json{
  "usuarioId": 2,
  "espacioId": 1,
  "horarioId": 2,
  "fecha": "2025-11-16",
  "motivo": "Capacitación de personal",
  "observaciones": "Necesitamos pizarra digital"
}
Tercera reserva (mismo espacio, otro día):
json{
  "usuarioId": 3,
  "espacioId": 1,
  "horarioId": 1,
  "fecha": "2025-11-17",
  "motivo": "Presentación a clientes"
}

¿Quieres que te guíe con alguna parte específica de la demostración? 🚀ReintentarSsi digamos ya quiero volverlo a poner disponible la reserva o si por algun motivo se cancelo la reserva y quiero volver a habilitarlo como hago?🔄 Cancelar o Completar una Reserva
Tienes varias opciones para liberar un espacio:

Opción 1: Cancelar una reserva ⭐ (Recomendado)
Paso 1: Ver las reservas activas
📍 GET /reservas/estado/activa
✅ Verás todas las reservas con estado "activa"
json[
  {
    "id": 1,
    "espacio": {
      "nombre": "Sala Ejecutiva A-101"
    },
    "horario": {
      "horaInicio": "08:00",
      "horaFin": "10:00"
    },
    "fecha": "2025-11-16",
    "estado": "activa",
    "usuario": {
      "nombre": "Juan"
    }
  }
]
Anota el ID de la reserva que quieres cancelar (ej: 1)

Paso 2: Cancelar la reserva
📍 PATCH /reservas/1/cancelar
✅ Respuesta:
json{
  "id": 1,
  "espacio": {
    "nombre": "Sala Ejecutiva A-101"
  },
  "horario": {
    "horaInicio": "08:00",
    "horaFin": "10:00"
  },
  "fecha": "2025-11-16",
  "estado": "cancelada",  ← CAMBIA A CANCELADA
  "usuario": {
    "nombre": "Juan"
  }
}
🔓 El espacio ahora está DISPONIBLE de nuevo para ese horario y fecha

Paso 3: Verificar disponibilidad
📍 GET /reservas/verificar-disponibilidad
Parámetros:

espacioId: 1
horarioId: 1
fecha: 2025-11-16

✅ Respuesta:
json{
  "disponible": true  ← AHORA ESTÁ DISPONIBLE
}

Opción 2: Completar una reserva (Cuando ya pasó el evento)
📍 PATCH /reservas/1/completar
✅ Cambia el estado a "completada"
json{
  "id": 1,
  "estado": "completada"
}
🔓 También libera el espacio (porque la reserva ya pasó)

Opción 3: Eliminar la reserva (Solo ADMIN)
📍 DELETE /reservas/1
⚠️ Esto elimina completamente la reserva (sin historial)
Solo disponible para administradores.

Opción 4: Actualizar el estado manualmente (Avanzado)
📍 PATCH /reservas/1
json{
  "estado": "cancelada"
}
```

---

## 🎬 Demostración Completa:

### **Escenario: Cancelación de reserva**

**1. Ver reservas activas:**
```
GET /reservas/estado/activa
```

**2. Cancelar la reserva ID 1:**
```
PATCH /reservas/1/cancelar
```

**3. Verificar que está disponible de nuevo:**
```
GET /reservas/verificar-disponibilidad
Params: espacioId=1, horarioId=1, fecha=2025-11-16
Respuesta: { "disponible": true }
```

**4. Hacer una nueva reserva en el mismo espacio/horario:**
```
POST /reservas
{
  "usuarioId": 3,
  "espacioId": 1,
  "horarioId": 1,
  "fecha": "2025-11-16",
  "motivo": "Nueva reunión"
}
✅ Ahora SÍ funciona (antes daba error 409)

📊 Estados de una Reserva:
EstadoDescripciónEspacio disponibleactivaReserva vigente❌ NO (ocupado)completadaYa pasó el evento✅ SÍ (libre)canceladaReserva cancelada✅ SÍ (libre)

🔍 Ver reservas por estado:
📍 GET /reservas/estado/activa → Reservas actuales
📍 GET /reservas/estado/cancelada → Reservas canceladas
📍 GET /reservas/estado/completada → Reservas ya realizadas

💡 Lógica del sistema:
El sistema valida disponibilidad solo considerando reservas con estado "activa":
typescript// En reservas.service.ts
const reservaExistente = await this.reservaRepository.findOne({
  where: {
    espacioId,
    horarioId,
    fecha,
    estado: EstadoReservaEnum.ACTIVA  // ← Solo valida activas
  },
});
Por eso, cuando cancelas o completas una reserva, el espacio queda libre automáticamente ✅

🎯 Para tu demostración:
Mostrar el ciclo completo:

✅ Crear reserva → Espacio ocupado
✅ Intentar reservar lo mismo → Error 409
✅ Cancelar reserva → Estado cambia a "cancelada"
✅ Verificar disponibilidad → Ahora disponible
✅ Crear nueva reserva → Funciona

Esto demuestra la gestión completa del sistema 🎉