"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spotifyCallback = exports.spotifyLogin = void 0;
const generateRandomString_1 = __importDefault(require("../utils/generateRandomString"));
const querystring_1 = __importDefault(require("querystring"));
const axios_1 = __importDefault(require("axios"));
const spotifyLogin = (req, res) => {
    const state = generateRandomString_1.default(16);
    res.cookie("spotify_auth_state", state);
    const query = querystring_1.default.stringify({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: "playlist-modify-private",
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        state: state,
    });
    res.redirect(`https://accounts.spotify.com/authorize?${query}`);
};
exports.spotifyLogin = spotifyLogin;
const spotifyCallback = (req, res) => {
    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies["spotify_auth_state"] : null;
    if (state === null || state !== storedState) {
        res.redirect(`/#${querystring_1.default.stringify({ error: "state_mismatch" })}`);
    }
    else {
        res.clearCookie("spotify_auth_state");
        const data = querystring_1.default.stringify({
            code: code,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
            grant_type: "authorization_code",
        });
        const token = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64");
        axios_1.default
            .post("https://accounts.spotify.com/api/token", data, {
            headers: {
                Authorization: `Basic ${token}`,
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                "Content-Length": Buffer.byteLength(data),
            },
        })
            .then((tokenRes) => {
            res.cookie("spotify_access_token", tokenRes.data.access_token);
            res.cookie("spotify_refresh_token", tokenRes.data.refresh_token);
            res.send("hello nigga");
        })
            .catch((err) => {
            console.log(err);
            res.redirect(`/#${querystring_1.default.stringify({
                error: "invalid_token",
            })}`);
        });
    }
};
exports.spotifyCallback = spotifyCallback;
