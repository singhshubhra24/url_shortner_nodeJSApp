const express = require("express")
const router = express.Router();
const {handleGenerateNewShortUrl} = require("../controllers/url")
const {handleGenerateAnalytics} = require("../controllers/url")

router.post("/",handleGenerateNewShortUrl)
router.get("/analytics/:shortId",handleGenerateAnalytics)

module.exports = router;
