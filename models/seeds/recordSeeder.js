const db = require('../../config/mongoose')
const Record = require('../record')
const Category = require('../category')
const User = require('../user')
const bcrypt = require('bcryptjs')

const seedUser = {
  name: 'user1',
  email: 'user1@example.com',
  password: 'qweqwe'
}


const seedRecord = [
  {
    name: '午餐',
    date: '2019.4.23',
    amount: 60,
    categoryId: Category.findOne({ name: '餐飲食品' }).lean._id
  },
  {
    name: '晚餐',
    date: '2019.4.23',
    amount: 60,
    categoryId: Category.findOne({ name: '餐飲食品' }).lean._id
  },
  {
    name: '捷運',
    date: '2019.4.23',
    amount: 120,
    categoryId: Category.findOne({ name: '交通出行' }).lean._id
  },
  {
    name: '電影:驚奇隊長',
    date: '2019.4.23',
    amount: 220,
    categoryId: Category.findOne({ name: '休閒娛樂' }).lean._id
  },
  {
    name: '租金',
    date: '2015.4.01',
    amount: 25000,
    categoryId: Category.findOne({ name: '家居物業' }).lean._id
  },
]


db.once('open', () => {
  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(seedUser.password, salt))
    .then(hash => {
      const { name, email } = seedUser
      User.create({ name, email, password: hash })
        .then(user => {
          return Promise.all(Array.from(
            { length: 5 },
            (_, i) => {
              return Record.create({ ...seedRecord[i], userId: user._id })
            }
          ))
            .then(() => {
              console.log('creat record done!')
              process.exit()
            })
        })
    })
})
