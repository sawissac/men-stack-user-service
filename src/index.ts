import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import { errorHandler } from "./middlewares/errors";
import { notFound } from "./middlewares/notFound";
import { apiRoutes } from "./routes";
import morgan from "morgan"

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
	origin: '*',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}

app.disable('x-powered-by')
app.use(morgan("tiny"))
app.use(express.json())
app.use(cors(corsOptions))
app.use('/api', apiRoutes)
app.use(notFound);
app.use(errorHandler)

export const server = app;
export const serverPort = port;