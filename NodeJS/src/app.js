
require('dotenv').config();

const express = require('express');
const app = express();

const PORT = Number(process.env.PORT);

const { conectarMongo } = require('./config/mongo');
const { crearLoggerMongo } = require('./middlewares/loggerMongo');

const logger = require('./middlewares/logger');


const usuariosRouter = require('./routes/usuarios.routes');
const salasRouter = require('./routes/salas.routes');
const reservasRouter = require('./routes/reservas.routes');
const errorHandler = require('./middlewares/errorHandler');

// Permitir recibir datos JSON
app.use(express.json());

app.use(logger);

async function iniciarServidor() {
    try {
        const db = await conectarMongo();

        app.use(crearLoggerMongo(db));

        // Rutas de  API
        app.use('/api/usuarios', usuariosRouter);
        app.use('/api/salas', salasRouter);
        app.use('/api/reservas', reservasRouter);

        
        app.get('/', (req, res) => {
            res.json({
                mensaje: 'Bienvenido al Sistema Coworking',
                estado: 'Servidor funcionando'
            });
        });

        
        app.use(errorHandler);

        
        app.listen(PORT, () => {
            console.log(`Servidor funcionando en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('No se pudo iniciar el servidor:', error.message);
        process.exit(1);
    }
}

iniciarServidor();
