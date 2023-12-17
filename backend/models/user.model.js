const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create username field
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;