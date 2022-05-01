const express = require('express');
const router = express.Router();

router.get('/:locale', (req, res, next) =>{
    const locale = req.params.locale;

    res.cookie('np-locale', locale, {
        maxAge: 1000 * 60 * 60 * 24 * 30
    });

    res.redirect(req.get('Referer'));

});

module.exports = router;