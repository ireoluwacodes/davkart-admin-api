import express, { json, urlencoded } from "express";
import { Application } from "express";
import cors from "cors";
import morgan from "morgan";

export const app: Application = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
