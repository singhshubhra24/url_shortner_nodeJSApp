const {URL} = require("../models/url");
const shortid = require("shortid")

async function handleGenerateNewShortUrl(req,res) {
    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
    const body = req.body
    console.log(body)
    if(!body.url)return res.status(404).json({msj : "url is required"})
    const shortID = shortid();
    await URL.create({
        shortId : shortID,
        redirectUrl : body.url,
        visitHistory : []
    })
    return res.json({id : shortID})
}
async function handleGenerateAnalytics(req,res) {
    const shortID = req.params.shortId
    console.log(shortID);
    // console.log(URL)
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