import {
  getUrlDetails,
  handleUrlRedirect,
  handleUrlShortner,
} from "../controllers/urlController.js";
import express from "express";

const router = express.Router();

router.post("/api/shorten", handleUrlShortner);
router.get("/url/details", getUrlDetails);
router.get("/:shortcode", handleUrlRedirect);

export default router;
