const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const search = require('./modules/search')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')
const record = require('./modules/records')

router.use('/record', authenticator, record)
router.use('/search', authenticator, search)
router.use('/users', users)
router.use('/', authenticator, home)

module.exports = router