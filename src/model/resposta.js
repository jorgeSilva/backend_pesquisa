const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RespostasModel = new Schema({
  type: String,
  resposta0: String,
  resposta1: String,
  resposta2: String,
  resposta3: String,
  resposta4: String,
  resposta5: String,
  resposta6: String,
  resposta7: String,
  resposta8: String,
  resposta9: String,
  fkPergunta: {
    type: Schema.Types.ObjectId,
    ref: 'Pergunta'
  },
  fkCandidato: {
    type: Schema.Types.ObjectId,
    ref: 'Candidato'
  }
})

module.exports = mongoose.model('Resposta', RespostasModel)