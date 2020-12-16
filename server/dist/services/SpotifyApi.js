"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpotifyTrack = exports.getSpotifyPlaylist = exports.getSpotifySearch = exports.initSpotifyClientCredentials = void 0;
const axios_1 = __importDefault(require("axios"));
const querystring_1 = __importDefault(require("querystring"));
const apiUrl = "https://api.spotify.com/v1";
const authUrl = "https://accounts.spotify.com";
const initSpotifyClientCredentials = () => {
    const data = querystring_1.default.stringify({
        grant_type: "client_credentials",
    });
    const token = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64");
    axios_1.default
        .post(`${authUrl}/api/token`, data, {
        headers: {
            Authorization: `Basic ${token}`,
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            "Content-Length": Buffer.byteLength(data),
        },
    })
        .then((res) => {
        process.env["SPOTIFY_ACCESS_TOKEN"] = res.data.access_token;
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.initSpotifyClientCredentials = initSpotifyClientCredentials;
const getSpotifySearch = (type, query, limit = 20) => {
    return axios_1.default.get(`${apiUrl}/search`, {
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
exports.getSpotifySearch = getSpotifySearch;
const getSpotifyPlaylist = (id) => {
    return axios_1.default.get(`${apiUrl}/playlists/${id}`, {
        headers: {
            Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
        },
    });
};
exports.getSpotifyPlaylist = getSpotifyPlaylist;
const getSpotifyTrack = (id) => {
    return axios_1.default.get(`${apiUrl}/tracks/${id}`, {
        headers: {
            Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
        },
    });
};
exports.getSpotifyTrack = getSpotifyTrack;
