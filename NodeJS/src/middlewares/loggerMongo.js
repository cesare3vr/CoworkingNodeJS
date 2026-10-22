
function crearLoggerMongo(db) {
return (req, res, next) => {
    const inicio = Date.now();

    res.on('finish', () => {
    const registro = {
        metodo: req.method,
        ruta: req.originalUrl,
        estado: res.statusCode,
        duracion_ms: Date.now() - inicio,
        fecha: new Date(),
        origen: 'api'
    };

    db.collection('logs')
        .insertOne(registro)
        .catch((error) => {
        console.error('Error al guardar log en MongoDB:', error.message);
        });
    });

    next();
};
}

module.exports = { crearLoggerMongo };
