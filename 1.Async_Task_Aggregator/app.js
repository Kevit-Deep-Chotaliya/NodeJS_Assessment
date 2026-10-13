const express = require("express");

const taskRoutes = require("./api/routes/tasks");
const notFound = require("./api/middleware/not-found");
const errorHandler = require("./api/middleware/error-handler");

const app = express();

app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.use(notFound);

app.use(errorHandler);

module.exports = app;