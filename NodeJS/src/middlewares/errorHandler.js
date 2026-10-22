
function errorHandler(err, req, res, next) {
    console.error('Error:', err.message);

    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({
            mensaje: 'JSON no valido'
        });
    }

    const codigo = err.status || err.statusCode || 500;
    const status = codigo >= 400 && codigo < 600
        ? codigo
        : 500;

    res.status(status).json({
        mensaje: status === 500
            ? 'Error interno del servidor'
            : err.message
    });
}

module.exports = errorHandler;
