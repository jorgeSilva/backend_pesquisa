const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EntrevistaModel = new Schema({
  rua: String,
  numeroCasa: String,
  anonimo: Boolean,
  nomeEntrevistado: String,
  resposta: String,
  fkPergunta: {
    type: Schema.Types.ObjectId,
    ref: 'Pergunta'
  }
})

module.exports = mongoose.model('Entrevista', EntrevistaModel)