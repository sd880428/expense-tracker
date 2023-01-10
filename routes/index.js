const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const search = require('./modules/search')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')
const record = require('./modules/records')

router.use('/record', record)
router.use('/users', users)
router.use('/search', search)
router.use('/', home)

module.exports = router