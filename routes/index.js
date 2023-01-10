const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const search = require('./modules/search')


router.use('/', home)
router.use('/search', search)

module.exports = router