const request = require('supertest');
const app = require('../src/app');

describe('Authors API', () => {
  let authorId;

  test('POST /authors - crear autor', async () => {
    const res = await request(app)
      .post('/authors')
      .send({ name: 'Test User', email: `test${Date.now()}@test.com`, bio: 'Bio test' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    authorId = res.body.id;
  });

  test('GET /authors - listar autores', async () => {
    const res = await request(app).get('/authors');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /authors/:id - obtener autor', async () => {
    const res = await request(app).get(`/authors/${authorId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', authorId);
  });

  test('PUT /authors/:id - actualizar autor', async () => {
    const res = await request(app)
      .put(`/authors/${authorId}`)
      .send({ name: 'Updated', email: `updated${Date.now()}@test.com`, bio: 'Updated bio' });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Updated');
  });

  test('GET /authors/:id - autor no encontrado', async () => {
    const res = await request(app).get('/authors/99999');
    expect(res.statusCode).toBe(404);
  });

  test('POST /authors - sin nombre devuelve 400', async () => {
    const res = await request(app)
      .post('/authors')
      .send({ email: 'noname@test.com' });
    expect(res.statusCode).toBe(400);
  });

  test('DELETE /authors/:id - eliminar autor', async () => {
    const res = await request(app).delete(`/authors/${authorId}`);
    expect(res.statusCode).toBe(204);
  });
});