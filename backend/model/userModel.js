
const mongoose = require("mongoose")
const validator = require("validator")
const brcypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter the Name"],
        maxlength: [20, "Character should not be more than 20"],
        minlength: [4, "Character should be more than 4"]
    },
    email:{
        type: String,
        required: [true, "Please Enter the Email"],
        maxlength: [30, "character should not be more than 30"],
        validate: [validator.isEmail, "Please enter the Valid Email"],
        unique: true
    },
    password:{
        type: String,
        require: [true, "Please Enter the Password"],
        minlength: [8, "Password Should be greater than 8"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await brcypt.hash(this.password, 10)
})

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

userSchema.methods.comparePassword = async function (password) {
    return await brcypt.compare(password, this.password)
}

module.exports = new mongoose.model("User", userSchema)