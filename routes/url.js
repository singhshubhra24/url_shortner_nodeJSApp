const express = require("express")
const router = express.Router();
const {handleGenerateNewShortUrl} = require("../controllers/url")
const {handleGenerateAnalytics} = require("../controllers/url")

router.post("/",(req,res)=>{
    console.log(req)
    console.log("gdhjgsdsjagdjshdgas")
})
router.get("/analytics/:shortId",handleGenerateAnalytics)

module.exports = router;
