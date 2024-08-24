const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Corresponds to `id` with char(5)
    name: { type: String, required: true }, // Corresponds to `name` with Varchar(50)
    email: { type: String, required: true, unique: true }, // Corresponds to `email` with Varchar(50)
    password: { type: String, required: true }, // Corresponds to `password` with Varchar(30)
});

module.exports = mongoose.model('Admin', userSchema);
