INSERT INTO authors (name, email, bio) VALUES
  ('Juan Pérez', 'juan@email.com', 'Escritor y desarrollador'),
  ('María García', 'maria@email.com', 'Periodista y blogger');

INSERT INTO posts (author_id, title, content, published) VALUES
  (1, 'Mi primer post', 'Contenido del primer post', true),
  (1, 'Segundo post', 'Contenido del segundo post', false),
  (2, 'Post de María', 'Contenido del post de María', true);