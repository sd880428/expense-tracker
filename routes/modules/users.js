const express = require('express')
const passport = require('passport')
const router = express.Router()
const flash = require('connect-flash')
const User = require('../../models/user')
const bcrypt = require('bcryptjs')
router.get('/login', (req, res) => { //登入
  res.render('login')
})

router.post('/login', passport.authenticate('local', { //登入
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/logout', (req, res, next) => { //登出
  req.logout(err => {
    if (err) { return next(err) }
    req.flash("successMsg", "你已成功登出")
    res.redirect('/users/login')
  })
})

router.get('/register', (req, res) => { //註冊
  res.render('register')
})

router.post('/register', (req, res) => { //註冊
  const { name, email, password, confirmPassword } = req.body
  let error = []
  if (!name || !email || !password || !confirmPassword) {
    error.push({ message: '請填寫所有欄位' })
  }
  if (password !== confirmPassword) {
    error.push({ message: '密碼與確認密碼不符' })
  }
  if (error.length) {
    return res.render('register', {
      name,
      email,
      password,
      confirmPassword,
      error
    })
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        error.push({ message: "此使用者已存在" })
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword,
          error
        })
      }
      bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))

        .then(() => {
          req.flash('successMsg', '註冊成功!登入後開始使用')
          res.redirect('/users/login')
        })
    })
})



module.exports = router