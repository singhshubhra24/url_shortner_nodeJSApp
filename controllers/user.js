const { v4: uuidv4 } = require('uuid');

const {User} = require("../models/user")
const {setUser} = require("../services/auth")

async function handleGenerateSignUpUser(req,res) {
    const {user_name,email,password} = req.body
    // console.log(body)
        await User.create({
            user_name,
            email,
            password})
        return res.render("home")
}
async function handleGenerateLoginUser(req,res) {
    const {email,password} = req.body
    const user = await User.findOne({ email,password})
    // console.log(user)

    if(!user) return res.render("login", {error : "username or password is invalid"})
    const token = setUser(user)
    console.log(token)
    res.cookie("uuid", token)
    return res.redirect("/")
}

module.exports = {
    handleGenerateSignUpUser,
    handleGenerateLoginUser
};
