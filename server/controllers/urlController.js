import { nanoid } from "nanoid";
import Url from "../models/url.js";

const handleUrlShortner = async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) return res.status(400).json({ error: "URL is required" });

  const shortCode = nanoid(6);
  const newUrl = new Url({ originalUrl, shortCode });
  await newUrl.save();

  res.json({ shortUrl: `${process.env.BASE_URL}/${shortCode}` });
};

const handleUrlRedirect = async (req, res) => {
  const { shortcode } = req.params;
  const urlDoc = await Url.findOne({ shortCode: shortcode });

  if (!urlDoc) return res.status(404).send("URL not found");

  urlDoc.visits += 1;
  await urlDoc.save();

  res.redirect(urlDoc.originalUrl);
};

const getUrlDetails = async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching URLs" });
  }
};

export { handleUrlRedirect, handleUrlShortner, getUrlDetails };
