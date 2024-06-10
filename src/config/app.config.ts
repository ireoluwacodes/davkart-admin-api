import express, { json, urlencoded } from "express";
import { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import { AuthRouter } from "../auth";
import { UserRouter } from "../users";
import { BlogRouter } from "../blogs";
import { CategoryRouter } from "../category";

export const app: Application = express();

// middleware init
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// route init
app.use("/api/v1/auth", AuthRouter)
app.use("/api/v1/user", UserRouter)
app.use("/api/v1/blog", BlogRouter)
app.use("/api/v1/category", CategoryRouter)