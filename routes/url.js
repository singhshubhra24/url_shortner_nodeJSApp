const express = require("express")
const router = express.Router();
const {handleGenerateNewShortUrl,handleGenerateNewShortUrlAPIforDiscord} = require("../controllers/url")
const {handleGenerateAnalytics} = require("../controllers/url")

router.post("/",handleGenerateNewShortUrl)
router.post("/create",handleGenerateNewShortUrlAPIforDiscord)
router.get("/analytics/:shortId",handleGenerateAnalytics)

module.exports = router;
