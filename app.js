require("dotenv").config();
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const {restrictToLoggedUserOnly, checkAuth} = require("./middlewares/auth")
const {URL} = require("./models/url")

const {dbConnector} = require("./connection")
const urlRoute = require("./routes/url")
const userRoute = require("./routes/user")
const staticRoute = require("./routes/staticRouter")
const shortid = require("shortid")
const {User} = require("./models/user")




const PORT = process.env.PORT || 8080;

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
})
app.post("/create", async(req, res) => {
    console.log("i m inside post discord req")
    const body = req.body
        console.log(body)
        if(!body.url)return res.status(404).json({msj : "url is required"})
        const shortID = shortid();
        const user = await User.findOne({ email: body.email, password: body.password})
        console.log(user)

        await URL.create({
            shortId : shortID,
            redirectUrl : body.url,
            visitHistory : [],
            createdBy : user._id
        })
        return res.json({shortID})
})
app.post("/login", async(req, res) => {
    console.log("i m inside post login user req for discord app")
    const {email,password} = req.body
    const user = await User.findOne({ email,password})
    // console.log(user)

    if(!user) return res.render("login", {error : "username or password is invalid"})

    const token = setUser(user)
    console.log(token)
    res.cookie("uuid", token)
    return res.json({user})
})
app.post("/signUP", async(req, res) => {
    console.log("i m inside post signup discord req")
    const {user_name,email,password} = req.body
    // console.log(body)
       const user =  await User.create({
            user_name,
            email,
            password})
        return res.json({user})
})
dbConnector(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connect successfully"))
    .catch(err => console.error('❌ MongoDB connection error:', err));

app.listen(process.env.PORT, () => console.log(`server started at port ${process.env.PORT}`))