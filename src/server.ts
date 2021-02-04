import express from "express";
import helmet from "helmet";
import cors from "cors";
import { Server } from "http";
import { config } from "dotenv";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";
import logger from "morgan";
import Cat from "../models/megamind/cat.model";

/* --------------------------------- Runner --------------------------------- */
config();

/* ------------------------------ Use Database ------------------------------ */
const kitty = new Cat({ name: "Zildjian" });
kitty.save().then(() => console.log("meow"));

/* -------------------------------- Constants ------------------------------- */
const app: express.Application = express();
const server = new Server(app);
const io = require("socket.io")(server);
const port: number = Number(process.env.PORT || process.env.APPLICATION_PORT);
const limiter: rateLimit.RateLimit = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
});

/* ------------------------------- Set Configs ------------------------------ */
app.set("port", port);
app.set("view engine", "pug");

/* ------------------------------- Middlewares ------------------------------ */
app.use(helmet());
process.env.NODE_ENV !== "development"
	? app.use(cors())
	: app.use(cors({ origin: process.env.ORIGIN }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(limiter);
app.use(express.static("public"));
app.use(logger("dev"));

/* --------------------------------- Router --------------------------------- */
app.get("/", (req, res) => {
	res.render("index");
});

io.on("connection", function (socket: any) {
	console.log("a user connected");
	// whenever we receive a 'message' we log it out
	socket.on("message", function (message: any) {
		console.log(message);
	});
});

server.listen(port, () => console.log(`server is listening on ${port}`));
