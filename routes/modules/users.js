const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../../models/user')
const flash = require('connect-flash')
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) { return next(err) }
    flash("successMsg", "你已成功登出")
    res.redirect('/users/login')
  })
})
module.exports = router