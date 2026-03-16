require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const errorHandler = require("./middleware/errorHandler");
const authorsRoutes = require("./routes/authors.routes");
const postsRoutes = require("./routes/posts.routes");

const app = express();

const swaggerDocument = YAML.load(__dirname + "/openapi.yaml");

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/authors", authorsRoutes);
app.use("/posts", postsRoutes);

app.use(errorHandler);

module.exports = app;
