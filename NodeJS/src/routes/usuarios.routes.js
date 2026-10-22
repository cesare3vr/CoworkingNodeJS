
const express = require('express');
const router = express.Router();

const { conectarSQL } = require('../config/sql');

// Consultar usuarios desde SQL Server
router.get('/', async (req, res, next) => {
    try {
        const pool = await conectarSQL();

        const resultado = await pool.request().query(`
            SELECT
                id_usuario,
                nombre,
                apellido,
                correo,
                telefono,
                CONVERT(VARCHAR(10), fecha_registro, 23)
                    AS fecha_registro
            FROM dbo.Usuarios
        `);

        res.status(200).json({
            mensaje: 'Listado de usuarios',
            usuarios: resultado.recordset
        });

    } catch (error) {
        next(error);
    }
});

module.exports = router;
