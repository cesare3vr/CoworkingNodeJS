
require('dotenv').config();

const { MongoClient } = require('mongodb');

const cliente = new MongoClient(process.env.MONGO_URI);

async function conectarMongo() {
try {
    await cliente.connect();

    const db = cliente.db(process.env.MONGO_DATABASE);

    console.log('Conectado a MongoDB');

    return db;
} catch (error) {
    console.error('Error al conectar MongoDB:', error.message);
    throw error;
}
}

module.exports = { conectarMongo };
