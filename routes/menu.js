const express = require('express');
const router = express.Router();

router.get('/viewMenu', (req, res) => {
    res.render('menu/menu')
})

module.exports = router;