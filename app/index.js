require('dotenv').load()
const express = require('express')
const app = express()

// Configuration
app.set('port', process.env.NODE_PORT || 3000)
app.set('views', `${__dirname}/views`)
app.set('view engine', 'jade')
app.use('/static', express.static(`${__dirname}/static`))
app.locals.pretty = (process.env.MINIFY === 'true')

// Routes
require('./routes')(app)
app.use('/module', require('./module/routes'))

// Run
app.listen(app.get('port'), function (err) {
  if (err) console.error(err)
  else console.log(`Server started: http://localhost:${app.get('port')}/`)
})
