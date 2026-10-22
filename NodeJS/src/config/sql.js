
require('dotenv').config();

const sql = require('mssql/msnodesqlv8');



const config = {
    connectionString:
        `Driver={ODBC Driver 18 for SQL Server};` +
        `Server=${process.env.DB_SERVER};` +
        `Database=${process.env.DB_DATABASE};` +
        `Trusted_Connection=Yes;` +
        `Encrypt=Yes;` +
        `TrustServerCertificate=Yes;`,
    connectionTimeout: 15000
};


async function conectarSQL() {
    try {
        const pool = await sql.connect(config);

        console.log('Conectado a SQL Server');

        return pool;

    } catch (error) {
        console.error(
            'Error  SQL Server:',
            error.message
        );

        throw error;
    }
}

module.exports = { sql, conectarSQL };
