const db = require('../../config/mongoose')
const Category = require('../category')
const CATEGORY = {
  家居物業: "fa-solid fa-house",
  交通出行: "fa-solid fa-van-shuttle",
  休閒娛樂: "fa-solid fa-face-grin-beam",
  餐飲食品: "fa-solid fa-utensils",
  其他: "fa-solid fa-pen"
}

const seedCategory = [
  {
    name: "家居物業",
    icon: CATEGORY.家居物業
  },
  {
    name: '交通出行',
    icon: CATEGORY.交通出行
  },
  {
    name: '休閒娛樂',
    icon: CATEGORY.休閒娛樂
  },
  {
    name: '餐飲食品',
    icon: CATEGORY.餐飲食品
  },
  {
    name: '其他',
    icon: CATEGORY.其他
  }
]

db.once('open', () => {
  return Promise.all(Array.from(
    seedCategory,
    (_, i) => {
      const { name, icon } = seedCategory[i]
      return Category.create({ name, icon })
    }
  ))
    .then(() => {
      console.log('seed category create done!')
      process.exit()
    })
})
