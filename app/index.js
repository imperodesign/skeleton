require('dotenv').load()
const express = require('express')
const expressMongoDB = require('express-mongo-db')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const app = module.exports = express()

// Configuration
app.set('port', process.env.NODE_PORT || 3000)
app.set('views', `${__dirname}/views`)
app.set('view engine', 'jade')
app.use('/static', express.static(`${__dirname}/static`))
app.locals.pretty = (process.env.MINIFY === 'false')

// Database
app.set('DB_URI', `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
app.use(expressMongoDB(app.get('DB_URI')))

// Body parsing, Cookies & Sessions
app.use(bodyParser.urlencoded({ extended: false })) // application/x-www-form-urlencoded
app.use(bodyParser.json()) // application/json
app.use(cookieParser())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ url: app.get('DB_URI') })
}))

// Routes
app.use('/', require('./routes'))
app.use('/module', require('./module/routes'))

// Run
app.listen(app.get('port'), err => {
  if (err) console.error(err)
  else console.log(`Server started: http://localhost:${app.get('port')}/`)
})
