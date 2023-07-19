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
  },
  fkCandidato: {
    type: Schema.Types.ObjectId,
    ref: 'Candidato'
  },
  fkEntrevistador: {
    type: Schema.Types.ObjectId,
    ref: 'Entrevistador'
  }
})

module.exports = mongoose.model('Entrevista', EntrevistaModel)