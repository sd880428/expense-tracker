const express = require('express')
const router = express.Router()
const Record = require('../../models/record') 
const Category = require('../../models/category')

router.get('/new', (req, res) => { //新增支出
  Category.find().lean()
    .then(category => {
      res.render('new', { category })
    })
})

router.post('/new', (req, res) => {
  const userId = req.user._id
  return Record.create({ ...req.body, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error)) //錯誤處理
})





module.exports = router