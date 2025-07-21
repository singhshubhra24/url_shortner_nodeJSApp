const express = require("express")
const route = express.Router();

route.get("/", (req,res)=>{
    return res.render("home")
})

module.exports = route;
