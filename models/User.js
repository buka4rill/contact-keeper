const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    // Properties of this User
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now 
    }
});

module.exports = mongoose.model('User', UserSchema);