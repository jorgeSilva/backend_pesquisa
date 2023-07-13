const mongoose = require('../config/database')
const Schema = mongoose.Schema

const CandidatoSchema = new Schema({
  nome: String,
  cpf: String,
  senha: String,
  categoria: String
})

module.exports = mongoose.model('Candidato', CandidatoSchema)