const router = require('express').Router()
const bookRoutes = require('./book-routes')
// define routes and they will be prefixed with whatever you put in the argument for router.use

router.use('/books', bookRoutes)

module.exports = router;