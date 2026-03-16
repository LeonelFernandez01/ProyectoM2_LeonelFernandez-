const service = require('../services/posts.service');

async function getAll(req, res, next) {
  try {
    const posts = await service.getAll();
    res.json(posts);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const post = await service.getById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
}

async function getByAuthor(req, res, next) {
  try {
    const posts = await service.getByAuthor(req.params.authorId);
    res.json(posts);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const { author_id, title, content, published } = req.body;
    if (!author_id || !title || !content) {
      return res.status(400).json({ error: 'author_id, title and content are required' });
    }
    const post = await service.create({ author_id, title, content, published });
    res.status(201).json(post);
  } catch (err) {
    if (err.code === '23503') {
      return res.status(400).json({ error: 'Author not found' });
    }
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { author_id, title, content, published } = req.body;
    if (!author_id || !title || !content) {
      return res.status(400).json({ error: 'author_id, title and content are required' });
    }
    const post = await service.update(req.params.id, { author_id, title, content, published });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const post = await service.getById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    await service.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, getById, getByAuthor, create, update, remove };