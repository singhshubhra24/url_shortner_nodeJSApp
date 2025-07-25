const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const {restrictToLoggedUserOnly, checkAuth} = require("./middlewares/auth")
const {URL} = require("./models/url")

const {dbConnector} = require("./connection")
const urlRoute = require("./routes/url")
const userRoute = require("./routes/user")
const staticRoute = require("./routes/staticRouter")


const port = 8001;
const app = express();


app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());


app.use("/url", restrictToLoggedUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);



app.get("/url/:shortid", async(req, res) => {
    console.log("i m inside get req")
    const shortId = req.params.shortid;
    // console.log(shortId)
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    })
    res.redirect(entry.redirectUrl)
})

dbConnector("mongodb://localhost:27017/shortURL_db")
    .then(() => console.log("MongoDB connect successfully"))
    .catch(err => console.error('❌ MongoDB connection error:', err));

app.listen(port, () => console.log(`server started at port ${port}`))