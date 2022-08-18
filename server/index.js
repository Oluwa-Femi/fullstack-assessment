import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import dotenv from "dotenv";
import chalk from "chalk";
import config from "./config/index";
import router from './routes';
import { connect } from "./utils/db";

export const app = express();

dotenv.config();

app.use(helmet());
app.disable("x-powered-by");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Mono API - A backend financial provider",
  });
});

app.use('/api', router);

app.use("*", (req, res) =>
  res.status(404).json({
    status: 404,
    message: "No endpoint matches that URL",
  })
);

export const start = async () => {
  try {
    await connect();

    app.listen(config.port, () => {
      console.log(
        chalk.green.bold(`REST API on http://localhost:${config.port}/`)
      );
    });
  } catch (error) {
    console.log(chalk.red(error));
  }
};
