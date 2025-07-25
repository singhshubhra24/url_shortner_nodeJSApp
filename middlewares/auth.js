const {getUser} = require("../services/auth")

async function restrictToLoggedUserOnly(req,res,next){
  const userUid = req.cookies.uuid;
    console.log(userUid)

  if(!userUid) return res.redirect("/login")
    const user = getUser(userUid)
  if(!user) return res.redirect("/login")
    req.user = user;
next();
}
async function checkAuth(req,res,next) {
  const userUid = req.cookies.uuid;
    console.log(userUid)
    const user = getUser(userUid)
    req.user = user;
next();
}

module.exports= {
    restrictToLoggedUserOnly,
    checkAuth
}