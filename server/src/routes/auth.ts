import { Router } from "express";
import { spotifyCallback, spotifyLogin, spotifyMe } from "../controllers/auth";

const router = Router();

router.get("/spotify", spotifyLogin);
router.get("/spotify/callback", spotifyCallback);
router.get("/spotify/me", spotifyMe)

export default router;
