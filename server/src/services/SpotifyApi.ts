import axios, { AxiosResponse, AxiosError } from "axios";
import qs from "querystring";

const apiUrl = "https://api.spotify.com/v1";
const authUrl = "https://accounts.spotify.com";

export const initSpotifyClientCredentials = (): void => {
	const data = qs.stringify({
		grant_type: "client_credentials",
	});
	const token = Buffer.from(
		`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
	).toString("base64");

	axios
		.post(`${authUrl}/api/token`, data, {
			headers: {
				Authorization: `Basic ${token}`,
				"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
				"Content-Length": Buffer.byteLength(data),
			},
		})
		.then((res: AxiosResponse) => {
			process.env["SPOTIFY_ACCESS_TOKEN"] = res.data.access_token;
		})
		.catch((err: AxiosError) => {
			console.log(err);
		});
};

export const getSpotifySearch = (type: string, query: string, limit: number = 20): Promise<any> => {
	return axios.get(`${apiUrl}/search`, {
		params: {
			type,
			q: query,
			limit,
		},
		headers: {
			Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
		},
	});
};

export const getSpotifyPlaylist = (id: string): Promise<any> => {
	return axios.get(`${apiUrl}/playlists/${id}`, {
		headers: {
			Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
		},
	});
};

export const getSpotifyTrack = (id: string): Promise<any> => {
	return axios.get(`${apiUrl}/tracks/${id}`, {
		headers: {
			Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
		},
	});
};
