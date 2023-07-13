const mongoose = require('../config/database')
const Schema = mongoose.Schema

const EntrevistadorSchema = new Schema({
  nome: String,
  cpf: String,
  senha: String,
  categoria: String
})

module.exports = mongoose.model('Entrevistador', EntrevistadorSchema)