const mongoose = require("mongoose")

const schema = mongoose.Schema({
    email: {
        required: true,
        unique: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    token: {
        type: String
    },
    favoriteMovies: Array
})

module.exports = {
    User: mongoose.model("User", schema)
}