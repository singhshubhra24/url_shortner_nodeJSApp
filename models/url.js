const mongoose = require("mongoose");

//creating schema
const urlSchema = new mongoose.Schema({
    shortId :{
        type : String,
        requied : true,
        unique : true
    },
    redirectUrl : {
        type : String,
        required : true
    },
    visitHistory : [{timestamp : {type : Number} }]
},
{timestamps : true}
)
//creating models using urlSchema
const URL = mongoose.model("url",urlSchema)

module.exports =
{
    URL
};