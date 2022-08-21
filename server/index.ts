import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import chalk from "chalk";
import config from "./config";
import Routes from "./routes";
import CronScheduler from "./helpers/cron/cronscheduler";
import helmet from "helmet";
import compression from "compression";
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './docs/config/swaggerDef';

export const app = express();
const router = express.Router();

const start = async () => {
  await mongoose
    .connect(config.database.url || "")
    .then(() => console.log(chalk.blue.bold("DB connected!.")))
    .catch(() => console.log(`${chalk.red()} DB CONNECTION ERROR`));

  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.disable("x-powered-by");
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(compression());
  app.use(cors());

  CronScheduler.startJob();

  app.use("/api/v1", Routes.route(router));

  app.get("/", (req, res) => {
    res.status(200).json({
      message: "Welcome to Mono API - A backend implementation by Femi Oluwatola",
    });
  });

  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  //Error handling
  app.use("*", (req, res) =>
    res.status(404).json({
      status: 404,
      message: "No endpoint matches that URL",
    })
  );

  app.listen(config.port);
};

start().then(() => {
  console.log(chalk.green.bold(`REST API on http://localhost:${config.port}/`));
});

export default app;
