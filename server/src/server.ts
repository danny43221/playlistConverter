import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import {
	initSpotifyClientCredentials,
	getSpotifySearch,
	getSpotifyPlaylist,
	getSpotifyTrack,
} from "./services/SpotifyApi";

import AuthRouter from "./routes/auth";

dotenv.config({ path: __dirname + "/config/config.env" });
initSpotifyClientCredentials();

const app = express();

app.use(cookieParser());
app.use(cors());
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use("/api/auth", AuthRouter);

setTimeout(async () => {
	try {
		const res = await getSpotifyPlaylist("0WjvP1GLytqMXyMXgTuEOO");
		console.log(res.data.name);
	} catch (err) {
		console.log(err);
	}
}, 500);

const PORT = parseInt(<string>process.env.PORT, 10) || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));
