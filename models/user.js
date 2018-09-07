const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    username: String,
    email: {
        type: String,
        // index: true
    }
})

userSchema.index({ email: 1})

module.exports = mongoose.model('User', userSchema);