const service = require('../services/authors.service');

async function getAll(req, res, next) {
  try {
    const authors = await service.getAll();
    res.json(authors);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const author = await service.getById(req.params.id);
    if (!author) return res.status(404).json({ error: 'Author not found' });
    res.json(author);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const { name, email, bio } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'name and email are required' });
    }
    const author = await service.create({ name, email, bio });
    res.status(201).json(author);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { name, email, bio } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'name and email are required' });
    }
    const author = await service.update(req.params.id, { name, email, bio });
    if (!author) return res.status(404).json({ error: 'Author not found' });
    res.json(author);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const author = await service.getById(req.params.id);
    if (!author) return res.status(404).json({ error: 'Author not found' });
    await service.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, getById, create, update, remove };