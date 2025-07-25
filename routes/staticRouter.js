const express = require("express")
const route = express.Router();
const {URL} = require("../models/url");


route.get("/", async(req,res)=>{
    if(!req.user) return res.redirect("/login")
    const allurls = await URL.find({createdBy : req.user._id}) 
    console.log("I can get ALL urls created by 1 users")
    console.log(req.user._id)

    console.log(allurls)
    return res.render("home",{"urls": allurls})
})
route.get("/signUP", async(req,res)=>{
    return res.render("signUP")
})
route.get("/login", async(req,res)=>{
    console.log("i m inside login function")
    return res.render("login")
})


module.exports = route;
