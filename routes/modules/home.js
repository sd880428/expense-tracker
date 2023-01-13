const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId }).lean().sort({ date: 'desc' })
    .then(records => {
      const totalAmount = records.reduce((prev, curr,) => { //得出使用者紀錄總金額
        return prev + curr.amount
      }, 0)
      Promise.all(Array.from(
        { length: records.length },
        (_, i) => {
          return Category.findOne({ _id: records[i].categoryId }).lean()//抓出單紀錄的類別icon
            .then(category => {
              records[i].categoryIcon = category.icon
            })
        }
      ))
        .then(() => {
          Category.find().lean()
            .then(category => {
              res.render('index', { records, category, totalAmount })
            })
        })
    })
})

module.exports = router