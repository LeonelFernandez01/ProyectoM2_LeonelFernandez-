const { Pool } = require('pg');
const { db } = require('../config');

const pool = new Pool(db);

async function getAll() {
  const result = await pool.query('SELECT * FROM authors ORDER BY created_at DESC');
  return result.rows;
}

async function getById(id) {
  const result = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);
  return result.rows[0];
}

async function create({ name, email, bio }) {
  const result = await pool.query(
    'INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *',
    [name, email, bio]
  );
  return result.rows[0];
}

async function update(id, { name, email, bio }) {
  const result = await pool.query(
    'UPDATE authors SET name=$1, email=$2, bio=$3 WHERE id=$4 RETURNING *',
    [name, email, bio, id]
  );
  return result.rows[0];
}

async function remove(id) {
  await pool.query('DELETE FROM authors WHERE id = $1', [id]);
}

module.exports = { getAll, getById, create, update, remove };