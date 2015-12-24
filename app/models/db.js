class DB {
  constructor (db, collection) {
    this.col = db.collection(collection)
  }

  update (key, data) {
    return this.col.update(key, { '$set': data }, { 'upsert': true })
  }

  find (query) {
    return new Promise((yep, nope) => {
      this.col.find(query).toArray((err, result) => err ? nope(err) : yep(result))
    })
  }

  findOne (query) {
    return this.col.findOne(query)
  }

  remove (query) {
    return this.col.remove(query)
  }

}

module.exports = DB