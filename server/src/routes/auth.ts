import { Router } from "express";
import { spotifyCallback, spotifyLogin } from "../controllers/auth";

const router = Router();

router.get("/spotify", spotifyLogin);
router.get("/spotify/callback", spotifyCallback);

export default router;
