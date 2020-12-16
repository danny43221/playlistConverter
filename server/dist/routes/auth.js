"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const router = express_1.Router();
router.get("/spotify", auth_1.spotifyLogin);
router.get("/spotify/callback", auth_1.spotifyCallback);
exports.default = router;
