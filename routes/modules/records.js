const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => { //新增支出
  Category.find().lean()
    .then(category => {
      res.render('new', { category })
    })
    .catch(error => console.error(error))
})

router.post('/new', (req, res) => {
  const userId = req.user._id
  return Record.create({ ...req.body, userId })
    .then(() => {
      req.flash('successMsg', '新增成功!')
      res.redirect('/')
    })
    .catch(error => console.error(error))
})

router.get('/edit/:id', (req, res) => { //編輯資訊
  const _id = req.params.id
  const userId = req.user._id
  let categoryName = ''
  return Record.findOne({ _id, userId }).lean() //取得欲修改支出紀錄
    .then(record => {
      Category.findOne({ _id: record.categoryId }).lean()
        .then(category => {
          categoryName = category.name //取得該紀錄的分類名並賦值
          Category.find().lean() //取得所有分類
            .then(category => {
              res.render('edit', { record, category, categoryName })
            })
        })
    })
    .catch(error => console.error(error))
})

router.put('/edit/:id', (req, res) => { //編輯資訊
  const _id = req.params.id
  const userId = req.user._id

  return Record.findOne({ _id, userId })
    .then((record) => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => {
      req.flash('successMsg', '儲存變更成功!')
      res.redirect('/')
    })
    .catch(error => console.error(error))
})

router.delete('/:id', (req, res) => { //刪除支出
  const _id = req.params.id
  const userId = req.user._id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => {
      req.flash('successMsg', '已刪除此餐廳')
      res.redirect('/')
    })
    .catch(error => console.error(error)) //錯誤處理
})

module.exports = router