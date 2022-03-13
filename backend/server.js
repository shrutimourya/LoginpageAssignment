const app = require("./app")

const dotenv = require("dotenv")
// const cloudinary = require("cloudinary")
const connectDatabase = require("./config/database")

dotenv.config({ path: "backend/config/.env" })


connectDatabase()


app.listen(`${process.env.PORT}`, () => {
    console.log(`server is connected to https:localhost:${process.env.PORT}`)
})

