const express = require('express');
const router = express.Router();

const { conectarSQL } = require('../config/sql');

// Consultar las salas desde SQL Server
router.get('/', async (req, res, next) => {
    try {
        const pool = await conectarSQL();

        const resultado = await pool.request().query(`
            SELECT
                id_sala,
                nombre,
                capacidad,
                estado
            FROM dbo.Salas
            ORDER BY id_sala
        `);

        res.status(200).json({
            mensaje: 'Listado de salas',
            salas: resultado.recordset
        });

    } catch (error) {
        next(error);
    }
});

module.exports = router;
