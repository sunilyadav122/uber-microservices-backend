const express = require("express");
const userRouter = require("./routes/user.routes");
const { swaggerUi, swaggerSpec } = require("./swagger");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./db/db");

dotenv.config();
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", userRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
