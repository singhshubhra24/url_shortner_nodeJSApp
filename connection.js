const  mongoose  = require("mongoose")

async function dbConnector(dbURI){
    return mongoose.connect(dbURI)
}

module.exports = {
    dbConnector,
}