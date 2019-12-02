//So we are importing router from Express
const router = require('express').Router();
//Importing path
const path = require('path');
//Importing apiRoutes, but we haven't made them yet.
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

//this is for production use only, if no API routes are hit then serve up the React front end. What we referred to on line 11 in server.js. That's what React is, one single HTML page.
router.use((req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;
