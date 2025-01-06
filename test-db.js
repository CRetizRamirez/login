import mysql from 'mysql2/promise';

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: '34.29.48.251', // Forzamos TCP/IP
      user: 'chato',
      password: 'LunaRetiz3004./*',
      database: 'PruebasNode',
      port: 3306,
      connectAttributes: {
        program_name: 'Node.js Test Connection'
      }
    });

    console.log('✅ Conexión exitosa a la base de datos');
    await connection.end();
  } catch (err) {
    console.error('❌ Error al conectar:', err.message);
  }
}

testConnection();


