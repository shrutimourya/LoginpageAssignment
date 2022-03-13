
const mongoose = require("mongoose")

const connectdatabase = () => {
    mongoose.connect(`${process.env.DB_URL}`,  {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("connected to database")
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = connectdatabase