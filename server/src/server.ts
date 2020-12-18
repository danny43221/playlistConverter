import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { initSpotifyClientCredentials } from "./services/spotifyApi";
import {getSpotifySearch, getSpotifyPlaylist} from "./services/spotifyApi"

import AuthRouter from "./routes/auth";

dotenv.config({ path: `${__dirname}/config/config.env` });
initSpotifyClientCredentials();

const app = express();

app.use(cors());
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use(express.static(`${__dirname}/../../client/build`));

app.use("/api/auth", AuthRouter);

setTimeout(() => {
	getSpotifySearch("playlist", "hello").then(res => {
		console.log(res.data)
	}).catch((err) => {
		console.log(err)
	})
}, 1000)

app.get("*", (req: Request, res: Response) => {
	res.sendFile(path.resolve(`${__dirname}/../../client/build/index.html`));
});

const PORT = parseInt(<string>process.env.PORT, 10) || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));
