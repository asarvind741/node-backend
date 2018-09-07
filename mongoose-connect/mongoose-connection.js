const mongoose = require('mongoose');

exports.connectToMongo = () => {
    if (process.env.NODE_ENV == 'development') {
        mongoose.connect(process.env.MONGO_CLIENT, {
                useNewUrlParser: true
            })
            .then((db) => {
                console.log("Connected to Mongo DB")
            })
            .catch((err) => {
                console.log("Error occured", err)
            })
    } else if (process.env.NODE_ENV == 'production') {
        mongoose.connect(process.env.MONGO_CLIENT, {
                useNewUrlParser: true
            })
            .then(() => {
                console.log("Connected to Mongo DB")
            })
            .catch((err) => {
                console.log("Error occured", err)
            })
    }
}