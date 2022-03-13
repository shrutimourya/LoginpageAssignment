const express = require("express")
const { registerUser, loginUser, logoutUser, getAllUser } = require("../controller/userController")
const { autorizesRoles, isAutheticated} = require("../middleware/auth")

const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)

router.route("/admin/users").get(isAutheticated, autorizesRoles("admin"), getAllUser)

// router.route("/getall").get(isAuthenticated,autorizesRoles("admin"),getAllUser)

// router.route("/details").get(getUserDetails)

module.exports = router