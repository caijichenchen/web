const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

})

const Kittens = mongoose.model('user',UserSchema);

module.exports = Kittens;