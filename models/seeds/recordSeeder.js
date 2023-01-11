const db = require('../../config/mongoose')
const Record = require('../record')
const Category = require('../category')
const User = require('../user')
const bcrypt = require('bcryptjs')
const category = require('../category')


const seedUser = {
  name: 'user1',
  email: 'user1@example.com',
  password: 'qweqwe'
}


const seedRecord = [
  {
    name: '午餐',
    date: '2019/4/23',
    amount: 60,
    category: "餐飲食品"
  },
  {
    name: '晚餐',
    date: '2019/4/23',
    amount: 60,
    category: "餐飲食品"
  },
  {
    name: '捷運',
    date: '2019/4/23',
    amount: 120,
    category: "交通出行"
  },
  {
    name: '電影:驚奇隊長',
    date: '2019/4/23',
    amount: 220,
    category: "休閒娛樂"
  },
  {
    name: '租金',
    date: '2015/4/01',
    amount: 25000,
    category: "家居物業"
  },
]


db.once('open', () => {
  //創建使用者
  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(seedUser.password, salt))
    .then(hash => {
      const { name, email } = seedUser
      User.create({ name, email, password: hash }) //創建使用者
        .then(user => { //取得使用者ID
          return Promise.all(Array.from(
            seedRecord,
            (records, i) => {
              return Category.findOne({ name: records.category }).lean() //找出記錄類別的物件ID
                .then(category => {
                  const { name, date, amount } = records
                  return Record.create({ //創建紀錄，綁定使用者ID及類別ID
                    name,
                    date,
                    amount,
                    userId: user._id,
                    categoryId: category._id
                  })
                })
            }
          ))
            .then(() => {
              console.log('seed record create done!')
              process.exit()
            })
        })
    })
})
