require('dotenv').load()
const express = require('express')
const app = express()

// Configuration
app.locals.pretty = (process.env.MINIFY === 'true')
app.set('views', `${__dirname}/views`)
app.set('view engine', 'jade')
app.use('/static', express.static(`${__dirname}/static`))

// Routes
require('./routes')(app)
app.use('/module', require('./module/routes'))

// Run
app.listen(process.env.NODE_PORT, function (err) {
  if (err) console.error(err)
  else
    console.log(`${process.env.APP_NAME} listening on: http://localhost:${process.env.NODE_PORT}`)
})
