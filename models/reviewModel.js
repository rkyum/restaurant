const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    forename: {
        required: true,
        type: String
    },
    surname: {
        required: true,
        type: String
    },
    review: {
        required: true,
        type: String,
    },
    rating: {
        required: true,
        min: 1,
        max: 5,
        type: Number,
    },
    username: {
        required: true,
        type: String
    }


})

module.exports = mongoose.model('Review', reviewSchema)