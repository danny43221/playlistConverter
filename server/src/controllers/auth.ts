import { Request, Response } from "express";
import generateRandomString from "../utils/generateRandomString";
import qs from "querystring";
import { AxiosResponse, AxiosError } from "axios";
import { getAuthToken, getSpotifyUser } from "../services/spotifyApi";

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

		getAuthToken(<string>code)
			.then((spotifyRes: AxiosResponse) => {
				res.cookie("spotify_access_token", spotifyRes.data.access_token);
				res.cookie("spotify_refresh_token", spotifyRes.data.refresh_token);
				res.cookie("spotify_expires_in", <number>spotifyRes.data.expires_in)
				res.redirect("/convert-apple");
			})
			.catch((spotifyErr: AxiosError) => {
				console.log(spotifyErr.response);
				res.redirect(
					`/#${qs.stringify({
						error: "invalid_token",
					})}`
				);
			});
	}
};

export const spotifyMe = (req: Request, res: Response): void => {
	const personalToken = req.cookies ? req.cookies["spotify_access_token"] : null;

	getSpotifyUser(personalToken).then((spotifyRes: AxiosResponse) => {
		console.log(spotifyRes.data);
	}).catch((spotifyErr: AxiosError) => {
		console.log(spotifyErr.response)
	});
};
