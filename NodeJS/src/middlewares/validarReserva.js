
function validarReserva(req, res, next) {
    const {
        id_usuario,
        id_sala,
        fecha_inicio,
        fecha_fin
    } = req.body || {};

    
    if (
        !Number.isInteger(id_usuario) ||
        id_usuario <= 0 ||
        !Number.isInteger(id_sala) ||
        id_sala <= 0
    ) {
        return res.status(400).json({
            mensaje: 'Usuario o sala no validos'
        });
    }

    
    const formatoFecha =
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;

    if (
        typeof fecha_inicio !== 'string' ||
        typeof fecha_fin !== 'string' ||
        !formatoFecha.test(fecha_inicio) ||
        !formatoFecha.test(fecha_fin)
    ) {
        return res.status(400).json({
            mensaje: 'Formato de fechas no valido'
        });
    }

    
    if (fecha_fin <= fecha_inicio) {
        return res.status(400).json({
            mensaje: 'La fecha final debe ser mayor'
        });
    }

    
    next();
}

module.exports = validarReserva;
