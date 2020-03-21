require('dotenv').config()
const mongoose = require('mongoose')
const UserSchema = require('./userSchema')

mongoose.connect(
  process.env.DATABASE_URL || 'mongodb://localhost/auth-test-dev',
  { autoIndex: false, useUnifiedTopology: true, useNewUrlParser: true }
)

mongoose.connection.on('open', _ => {
  console.log('Database is connected to', process.env.DATABASE_URL)
})

module.exports = mongoose.model('User', UserSchema)
