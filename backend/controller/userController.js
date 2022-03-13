
const User = require("../model/userModel")
const sendToken = require("../utils/sendToken")

exports.registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        const user = await User.create({
            name,
            email,
            password,
            avatar:{
                public_id: "this is public id",
                url: "smaple url",
            }
        })
        console.log(user)
        const token = user.getJWTToken()
        res.status(200).json({
            success: true,
            user,
            token
        })

    } catch (err) {
        res.status(500).json(err)
    }
}

// exports.loginUser = async(req,res) => {
exports.loginUser = (async (req, res, next) => {
    try{
        const { email, password } = req.body

    if (!email || !password) {
        return res.status(500).json({
            message: "Invalid Email or password"
        })
    }

    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return res.status(500).json({
            message: "Invalid Email or Password"
        })
    }

    const isPassword = await user.comparePassword(password)
    if (!isPassword) {
        return res.status(500).json({
            message: "Invalid Email or Password"
        })
    }

    sendToken(user, 200, res)
    // const token = user.getJWTToken()
    // res.status(200).json({
    //     success: true,
    //     message: "Logged in",
    //     token
    // })
    }catch(err){
        res.status(500).json(err)
    }
})

exports.logoutUser = async(req,res) => {
    try{
        res.cookie("token", null,{
            expires: new Date(Date.now()),
            httpOnly: true,
        })

        res.status(200).json({
            success: true,
            message: "user logged Out"
        })

    }catch(err){
        res.status(500).json(err)
    }
}

exports.getAllUser = async(req,res) => {
    try{
        const users = await User.find()

        res.status(200).json({
            success: true,
            users
        })

    }catch(err){
        res.status(500).json(err)
    }
}



