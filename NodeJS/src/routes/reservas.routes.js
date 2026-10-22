const express = require('express');
const router = express.Router();

const { conectarSQL, sql } = require('../config/sql');

const validarReserva = require('../middlewares/validarReserva');


// Consultar reservas desde SQL Server
router.get('/', async (req, res, next) => {
    try {
        const pool = await conectarSQL();

        const resultado = await pool.request().query(`
            SELECT
                r.id_reserva,
                u.nombre + ' ' + u.apellido AS usuario,
                s.nombre AS sala,
                CONVERT(VARCHAR(10),
                    r.fecha_inicio, 23) AS fecha,
                CONVERT(VARCHAR(5),
                    r.fecha_inicio, 108) AS hora_inicio,
                CONVERT(VARCHAR(5),
                    r.fecha_fin, 108) AS hora_fin,
                r.estado
            FROM dbo.Reservas r
            INNER JOIN dbo.Usuarios u
                ON r.id_usuario = u.id_usuario
            INNER JOIN dbo.Salas s
                ON r.id_sala = s.id_sala
            ORDER BY r.id_reserva
        `);

        res.status(200).json({
            mensaje: 'Listado de reservas',
            reservas: resultado.recordset
        });

    } catch (error) {
        next(error);
    }
});



// Registrar una nueva reserva

router.post('/', validarReserva, async (req, res, next) => {
    try {
        const {
            id_usuario,
            id_sala,
            fecha_inicio,
            fecha_fin
        } = req.body;



        const pool = await conectarSQL();

        const resultado = await pool.request()
            .input('id_usuario', sql.Int, id_usuario)
            .input('id_sala', sql.Int, id_sala)
            .input('fecha_inicio', sql.VarChar(19), fecha_inicio)
            .input('fecha_fin', sql.VarChar(19), fecha_fin)
            .execute('dbo.RegistrarReserva');

        res.status(201).json({
            mensaje: 'Reserva registrada correctamente',
            id_reserva: resultado.recordset[0].id_reserva
        });

    } catch (error) {
        if (error.message.includes('Horario ocupado')) {
            return res.status(409).json({
                mensaje: 'La sala ya esta reservada en ese horario'
            });
        }

        next(error);
    }
});


module.exports = router;
