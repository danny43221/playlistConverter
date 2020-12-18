import axios, { AxiosResponse, AxiosError } from "axios";
import dotenv from "dotenv";
import qs from "querystring";

dotenv.config({ path: `${__dirname}/../config/config.env` });

const spotifyApiUrl = "https://api.spotify.com/v1";
const spotifyAuthUrl = "https://accounts.spotify.com";

const basicOptions = {
	headers: {
		Authorization:
			"Basic " +
			Buffer.from(
				`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
			).toString("base64"),
		"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
	},
};

const getClientOptions = () => {
	return {
		headers: {
			Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
		},
	};
};

const getAuthOptions = (personalToken: string) => {
	return {
		headers: {
			Authorization: `Bearer ${personalToken}`,
		},
	};
};

//Spotify API

export const getSpotifySearch = (type: string, q: string, limit: number = 20): Promise<any> => {
	return axios.get(`${spotifyApiUrl}/search`, {
		params: {
			type,
			q,
			limit,
		},
		...getClientOptions(),
	});
};

export const getSpotifyPlaylist = (id: string): Promise<any> => {
	return axios.get(`${spotifyApiUrl}/playlists/${id}`, getClientOptions());
};

export const getSpotifyTrack = (id: string): Promise<any> => {
	return axios.get(`${spotifyApiUrl}/tracks/${id}`, getClientOptions());
};

//Spotify Authentication

export const initSpotifyClientCredentials = (): void => {
	getClientToken()
		.then((res: AxiosResponse) => {
			process.env["SPOTIFY_ACCESS_TOKEN"] = res.data.access_token;
		})
		.catch((err: AxiosError) => {
			console.log(err);
		});
};

export const getAuthToken = (code: string): Promise<any> => {
	const data = qs.stringify({
		code,
		redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
		grant_type: "authorization_code",
	});
	return axios.post(`${spotifyAuthUrl}/api/token`, data, basicOptions);
};

export const getClientToken = (): Promise<any> => {
	const data = qs.stringify({
		grant_type: "client_credentials",
	});

	return axios
		.post(`${spotifyAuthUrl}/api/token`, data, basicOptions)
}

export const getSpotifyUser = (personalToken: string): Promise<any> => {
	return axios.get(`${spotifyApiUrl}/me`, getAuthOptions(personalToken));
};
