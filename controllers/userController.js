const User = require('../models/user')


let createUser = (req, res) => {

    User.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email
    })
    .then(user => {
        res.json(user)
    })
}

let getuser = (req, res) => {
    console.log("asa",req.params)
    User.findOne({email: req.params['email']})
    .then((user) => {
        console.log(user)
        res.json(user)
    })
}

module.exports = {
    createUser,
    getuser
}