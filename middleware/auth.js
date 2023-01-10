module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warringMsg', '請先登入才能使用!')
    return res.redirect('/users/login')
  }
}