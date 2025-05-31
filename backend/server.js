const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de la base de datos desde variables de entorno
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSLMODE === 'require' ? { rejectUnauthorized: false } : false, // Básico para DO, en prod usa el CA cert
});

// Middleware
app.use(express.json()); // Para parsear JSON en el body

// Verificar conexión a la BD y crear tabla si no existe
async function initializeDatabase() {
  try {
    const client = await pool.connect();
    console.log('Conectado a la base de datos PostgreSQL!');
    await client.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Tabla "notes" verificada/creada.');
    client.release();
  } catch (err) {
    console.error('Error al conectar o inicializar la base de datos:', err);
    // Salir si no se puede conectar a la BD es una opción, o reintentar.
    // Por simplicidad, solo lo logueamos. La app podría no funcionar.
  }
}

// Rutas de la API
app.get('/api/notes', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, content FROM notes ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener notas:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/notes', async (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'El contenido de la nota es requerido' });
  }
  try {
    const result = await pool.query('INSERT INTO notes (content) VALUES ($1) RETURNING id, content', [content]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al agregar nota:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Iniciar el servidor
app.listen(PORT, async () => {
  await initializeDatabase();
  console.log(`Backend escuchando en el puerto ${PORT}`);
});