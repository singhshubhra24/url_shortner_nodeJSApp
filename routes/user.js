const express = require("express")
const router = express.Router()
const {handleGenerateSignUpUser} = require("../controllers/user")
const {handleGenerateLoginUser} = require("../controllers/user")

router.post("/",handleGenerateSignUpUser)
router.post("/login",handleGenerateLoginUser)



module.exports = router;
