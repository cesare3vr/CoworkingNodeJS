
const { conectarSQL, sql } = require('./config/sql');

async function probarConexion() {
    try {
        const pool = await conectarSQL();

        const resultado = await pool.request().query(
            'SELECT * FROM dbo.Usuarios'
        );

        console.log('Usuarios registrados:');
        console.log(resultado.recordset);

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await sql.close();
    }
}

probarConexion();
