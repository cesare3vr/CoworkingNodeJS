
# Sistema de Reservas Coworking

## Descripción
API REST desarrollada con Node.js y Express para gestionar
usuarios, salas y reservas de espacios de coworking.

## Tecnologías
- Node.js
- Express
- SQL Server
- MongoDB

## Funcionalidades
- Consultar usuarios registrados.
- Consultar salas disponibles en la base de datos.
- Consultar reservas realizadas.
- Registrar nuevas reservas.
- Validar datos y evitar conflictos de horarios.
- Registrar automáticamente la actividad en MongoDB.

## Instalación

1. Instalar Node.js.
2. Abrir una terminal en la carpeta del proyecto.
3. Ejecutar:

npm install

4. Crear un archivo .env utilizando .env.example
   como referencia.
5. Configurar las conexiones a SQL Server y MongoDB.
6. Iniciar el servidor:

npm start

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/usuarios | Consultar usuarios |
| GET | /api/salas | Consultar salas |
| GET | /api/reservas | Consultar reservas |
| POST | /api/reservas | Registrar reserva |

## Códigos de respuesta
- 200: Consulta exitosa.
- 201: Reserva creada correctamente.
- 400: Datos incorrectos o incompletos.
- 409: Conflicto de horario de reserva.
- 500: Error interno del servidor.

## Pruebas
El archivo request.http contiene las peticiones HTTP
para probar la API desde Visual Studio Code.

## Bases de datos
SQL Server almacena usuarios, salas y reservas.

MongoDB utiliza la base de datos CoworkingLogs y la
colección logs para registrar las peticiones de la API.
