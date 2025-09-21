import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createShortUrl } from "../controllers/shortUrlController.js";
import { redirectToOriginalUrl } from "../controllers/shortUrlController.js";
import { updateshortUrlController } from "../controllers/shortUrlController.js";
import { deleteShortUrlController } from "../controllers/shortUrlController.js";

const shortURLRouter = Router();

shortURLRouter.post("/", authMiddleware, createShortUrl);
shortURLRouter.get("/:shortCode", redirectToOriginalUrl);
shortURLRouter.patch("/:shortCode", authMiddleware, updateshortUrlController);
shortURLRouter.delete("/:shortCode", authMiddleware, deleteShortUrlController);

export default shortURLRouter;
