const express = require('express');
const { db, findById } = require('../models/model');
const Model = require('../models/reviewModel');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const { Passport } = require('passport');
const passport = require('passport');
const user = require('../models/user');

app = express();

//setting view engine to ejs
app.set("view engine", "ejs")

router.get('/create', isLoggedIn, (req, res) => {
    res.render('reviews/create')
})

router.get('/update', (req, res) => {
    res.render('reviews/update')
})

router.post('/create', async (req, res) => {

    const review = new Model({
        forename: req.body.forename,
        surname: req.body.surname,
        review: req.body.review,
        rating: req.body.rating,
        username: req.session.passport.user
    })

    try {
        const reviewToSave = await review.save();
        res.status(200).json(reviewToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Index
router.get('/', async (req, res) => {
    try {
        const reviews = await Model.find();
        res.render('reviews/index', {
            reviews,
            currentUser: req.session.passport.user
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const review = await Model.findByIdAndDelete(id)
        res.send(`Document with has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


module.exports = router;