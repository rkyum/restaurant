const express = require('express');
const { db } = require('../models/model');
const Model = require('../models/model');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const passport = require('passport');
const { Passport } = require('passport');
const user = require('../models/user');

app = express();

//setting view engine to ejs
app.set("view engine", "ejs")

router.get('/new', isLoggedIn, (req, res) => {
    id = req.params.id
    res.render('reservations/new')
})

router.get('/show', isLoggedIn, async (req, res,) => {
    try {
        Model.find({ username: req.session.passport.user }, function (err, doc) {
            const { forename, surname, mobile, date, username } = doc
            console.log(date)
            res.render('reservations/show', {
                dateList: doc,
                forename: forename,
                surname: surname,
                mobile: mobile,
                date: date,
                username: username
            })
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/choice', isLoggedIn, (req, res) => {
    res.render('reservations/choice')
})

//Post Method
router.post('/new', isLoggedIn, async (req, res) => {

    const reservation = new Model({
        forename: req.body.forename,
        surname: req.body.surname,
        mobile: req.body.mobile,
        date: req.body.date,
        username: req.session.passport.user
    });

    try {
        const reservationToSave = await reservation.save();
        res.status(200).json(reservationToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get('/renderEditForm/:id', (req, res) => {
    const reservationID = req.params.id
    res.render('reservations/update', { reservationID })
})

//Update by ID Method
router.put('/update/:id', isLoggedIn, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedReservation = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedReservation, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', isLoggedIn, async (req, res) => {
    try {
        const id = req.params.id;
        const reservation = await Model.findByIdAndDelete(id)
        res.send(`Document has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;