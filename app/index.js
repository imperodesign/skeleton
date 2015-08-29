require('dotenv').load()
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

// Configuration
app.set('port', process.env.NODE_PORT || 3000)
app.set('views', `${__dirname}/views`)
app.set('view engine', 'jade')
app.use('/static', express.static(`${__dirname}/static`))
app.locals.pretty = (process.env.MINIFY === 'true')

// Body parsing & Cookies
app.use(bodyParser.urlencoded({ extended: false })) // application/x-www-form-urlencoded
app.use(bodyParser.json()) // application/json
app.use(cookieParser())

// Routes
require('./routes')(app)
app.use('/module', require('./module/routes'))

// Run
app.listen(app.get('port'), function (err) {
  if (err) console.error(err)
  else console.log(`Server started: http://localhost:${app.get('port')}/`)
})
