const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({

    forename: {
        required: true,
        type: String
    },
    surname: {
        required: true,
        type: String
    },
    mobile: {
        required: true,
        type: Number
    },
    date: {
        required: true,
        min: Date.now(),
        type: Date
    },
    username: {
        required: true,
        type: String
    },



})

module.exports = mongoose.model('Reservation', reservationSchema)