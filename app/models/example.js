const DB = require('./db')

class Example extends DB {
  constructor (db) {
    super(db, 'example_collection')
  }
}

module.exports = Example
