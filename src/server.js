import express from 'express';
import { pool } from './db.js';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.get('/user', async (req, res) => {
  const { id } = req.query;

  if (id === undefined || id === '') {
    return res.status(400).json({ error: 'Query parameter "id" is required' });
  }

  try {
    const { rows } = await pool.query(
      'SELECT id, email, name, created_at FROM users WHERE id = $1',
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(rows[0]);
  } catch (err) {
    console.error('Failed to fetch user', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

const server = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

async function shutdown() {
  server.close();
  await pool.end();
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
