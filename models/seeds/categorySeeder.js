const db = require('../../config/mongoose')
const Category = require('../category')

const seedCategory = [
  {
    name: "家居物業",
    image: "https://fontawesome.com/icons/home?style=solid"
  },
  {
    name: '交通出行',
    image: "https://fontawesome.com/icons/shuttle-van?style=solid"
  },
  {
    name: '休閒娛樂',
    image: "https://fontawesome.com/icons/grin-beam?style=solid"
  },
  {
    name: '餐飲食品',
    image: "https://fontawesome.com/icons/utensils?style=solid"
  },
  {
    name: '其他',
    image: "https://fontawesome.com/icons/pen?style=solid"
  }
]

db.once('open', () => {
  return Promise.all(Array.from(
    seedCategory,
    (_, i) => {
      const { name, image } = seedCategory[i]
      return Category.create({ name, image })
    }
  ))
    .then(() => {
      console.log('Category create done!')
      process.exit()
    })
})
