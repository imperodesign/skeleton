const router = module.exports = require('express').Router()
const exampleModel = require('./models/example')

router.get('/', (req, res, next) => {
  /*
  const model = new exampleModel(req.db)
  model.find()
  */
  res.render('pages/home')
})
