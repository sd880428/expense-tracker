const { query } = require('express')
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const sort = req.query.sort
  const userId = req.user._id

  //判斷使用者是不是選"只顯示類別"內的選項
  let displayRecord = req.query.onlyShow ? { categoryId: req.query.onlyShow } : { userId }
  let sortBy = ''
  switch (sort) {
    case "name":
      sortBy = { name: 'asc' }
      break
    case "date":
      sortBy = { date: 'desc' }
      break
    case "amount":
      sortBy = { amount: 'asc' }
      break
    case "category":
      sortBy = { categoryId: 'asc' }
      break
    default:
      sortBy = { date: 'desc' }
      break
  }

  Record.find(displayRecord).lean().sort(sortBy)
    .then(records => {
      let totalAmount = 0
      records.forEach(record => totalAmount += record.amount) //得出使用者紀錄總金額
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