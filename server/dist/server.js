"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const SpotifyApi_1 = require("./services/SpotifyApi");
const auth_1 = __importDefault(require("./routes/auth"));
dotenv_1.default.config({ path: __dirname + "/config/config.env" });
SpotifyApi_1.initSpotifyClientCredentials();
const app = express_1.default();
app.use(cookie_parser_1.default());
app.use(cors_1.default());
if (process.env.NODE_ENV === "development") {
    app.use(morgan_1.default("dev"));
}
app.use("/api/auth", auth_1.default);
setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield SpotifyApi_1.getSpotifyPlaylist("0WjvP1GLytqMXyMXgTuEOO");
        console.log(res.data.name);
    }
    catch (err) {
        console.log(err);
    }
}), 500);
const PORT = parseInt(process.env.PORT, 10) || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));
