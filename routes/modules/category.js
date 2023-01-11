const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
router.get('/:category', (req, res) => {
  const key = req.params.category
  const userId = req.user._id
  Record.find({ userId, })
})


module.exports = router