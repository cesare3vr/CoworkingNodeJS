
const { conectarMongo } = require('./config/mongo');

async function probarConexion() {
try {
    const db = await conectarMongo();

    console.log('Base de datos:', db.databaseName);
    console.log('Prueba de MongoDB exitosa');

    process.exit(0);
} catch (error) {
    console.error('Prueba fallida:', error.message);
    process.exit(1);
}
}

probarConexion();
