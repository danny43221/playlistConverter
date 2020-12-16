import { Request, Response } from "express";
import generateRandomString from "../utils/generateRandomString";
import qs from "querystring";
import axios, { AxiosResponse, AxiosError } from "axios";

export const spotifyLogin = (req: Request, res: Response): void => {
	const state = generateRandomString(16);
	res.cookie("spotify_auth_state", state);

	const query = qs.stringify({
		response_type: "code",
		client_id: process.env.SPOTIFY_CLIENT_ID,
		scope: "playlist-modify-private",
		redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
		state: state,
	});
	res.redirect(`https://accounts.spotify.com/authorize?${query}`);
};

export const spotifyCallback = (req: Request, res: Response): void => {
	const code = req.query.code || null;
	const state = req.query.state || null;
	const storedState = req.cookies ? req.cookies["spotify_auth_state"] : null;

	if (state === null || state !== storedState) {
		res.redirect(`/#${qs.stringify({ error: "state_mismatch" })}`);
	} else {
		res.clearCookie("spotify_auth_state");

		const data = qs.stringify({
			code: <string>code,
			redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
			grant_type: "authorization_code",
		});
		const token = Buffer.from(
			`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
		).toString("base64");

		axios
			.post("https://accounts.spotify.com/api/token", data, {
				headers: {
					Authorization: `Basic ${token}`,
					"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
					"Content-Length": Buffer.byteLength(data),
				},
			})
			.then((tokenRes: AxiosResponse) => {
				res.cookie("spotify_access_token", tokenRes.data.access_token);
				res.cookie("spotify_refresh_token", tokenRes.data.refresh_token);
				res.redirect("/convert-apple");
			})
			.catch((err: AxiosError) => {
				console.log(err);
				res.redirect(
					`/#${qs.stringify({
						error: "invalid_token",
					})}`
				);
			});
	}
};
