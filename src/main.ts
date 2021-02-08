import "reflect-metadata"; // this shim is required
import { useExpressServer } from "routing-controllers";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { Server } from "http";
import { resolve } from "path";
import { config } from "dotenv";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";
import logger from "morgan";

/* --------------------------------- Runner --------------------------------- */
config();

/* ------------------------------ Use Database ------------------------------ */
// import Cat from "../models/megamind/cat.model";
// const kitty = new Cat({ name: "Zildjian" });
// kitty.save().then(() => console.log("meow"));

/* -------------------------------- Constants ------------------------------- */
const app: express.Application = express();
const server: Server = new Server(app);
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
app.use(
	helmet({
		contentSecurityPolicy: false,
	})
);
process.env.NODE_ENV !== "development"
	? app.use(cors({ origin: process.env.ORIGIN }))
	: app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(limiter);
app.use(express.static("public"));
app.use(logger("dev"));

/* --------------------------------- Socket --------------------------------- */
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

/* --------------------------------- Router --------------------------------- */
useExpressServer(app, {
	// routePrefix: "/api/v1",
	controllers: [resolve(__dirname + "/**/*.controller.ts")],
	middlewares: [resolve(__dirname + "/**/*.middleware.ts")],
	interceptors: [resolve(__dirname + "/**/*.interceptors.ts")],
});

server.listen(port, () => console.log(`server is listening on ${port}`));
