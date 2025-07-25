const {URL} = require("../models/url");
const shortid = require("shortid")

async function handleGenerateNewShortUrl(req,res) {
    const body = req.body
    console.log(body)
    if(!body.url)return res.status(404).json({msj : "url is required"})
    const shortID = shortid();
    await URL.create({
        shortId : shortID,
        redirectUrl : body.url,
        visitHistory : [],
        createdBy : req.user._id
    })
    return res.render("home", {id : shortID})
}
async function handleGenerateAnalytics(req,res) {
    const shortID = req.params.shortId
    // console.log(shortID);
    const result = await URL.findOne({"shortId": shortID});
        // console.log(result)

    return res.json({totalClicks : result.visitHistory.length,
        analytics : result.visitHistory
    })
    
}


module.exports = {
    handleGenerateNewShortUrl,
    handleGenerateAnalytics
}