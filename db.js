
const sql = require('mssql');

const sqlConfig = {
    user: 'SA',
    password: '@HelloWorld',
    server: '168.119.169.166',
    port: 1433,
    database: 'Shopify',
    options:{
        encrypt: false, // Use this if you're on Azure
        trustServerCertificate: true // Change to false if you have a valid certificate
    }
};

const pool= new sql.ConnectionPool(sqlConfig);
const poolConnect = pool.connect();

const GetMethod = async (query) => {
    try {
        await poolConnect;
        const result = await pool.request().query(query);
        return result;
    } catch (err) {
        console.error('SQL error', err);
        throw err;
    }
};

module.exports = {
    sql,
    pool,
    poolConnect,
    GetMethod
}