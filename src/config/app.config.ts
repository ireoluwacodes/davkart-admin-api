import express from "express"
import { Application } from "express"
import cors from "cors"

export const app:Application = express()

app.use(cors())