const mongoose = require('mongoose')
require('dotenv').config()

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@bdmerendaescolar.xrokiff.mongodb.net/pesquisaEleitoral?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

module.exports = mongoose