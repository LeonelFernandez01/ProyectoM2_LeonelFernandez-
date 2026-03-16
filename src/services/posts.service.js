const { Pool } = require('pg');
const { db } = require('../config');

const pool = new Pool(db);

async function getAll() {
  const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
  return result.rows;
}

async function getById(id) {
  const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  return result.rows[0];
}

async function getByAuthor(authorId) {
  const result = await pool.query(
    `SELECT posts.*, authors.name AS author_name, authors.email AS author_email, authors.bio AS author_bio
     FROM posts
     JOIN authors ON posts.author_id = authors.id
     WHERE posts.author_id = $1
     ORDER BY posts.created_at DESC`,
    [authorId]
  );
  return result.rows;
}

async function create({ author_id, title, content, published }) {
  const result = await pool.query(
    'INSERT INTO posts (author_id, title, content, published) VALUES ($1, $2, $3, $4) RETURNING *',
    [author_id, title, content, published ?? false]
  );
  return result.rows[0];
}

async function update(id, { author_id, title, content, published }) {
  const result = await pool.query(
    'UPDATE posts SET author_id=$1, title=$2, content=$3, published=$4 WHERE id=$5 RETURNING *',
    [author_id, title, content, published, id]
  );
  return result.rows[0];
}

async function remove(id) {
  await pool.query('DELETE FROM posts WHERE id = $1', [id]);
}

module.exports = { getAll, getById, getByAuthor, create, update, remove };