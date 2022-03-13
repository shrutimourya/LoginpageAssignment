const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))

const userRoute = require("./routes/userRoute")

app.use("/api/v1/", userRoute)

module.exports = app;