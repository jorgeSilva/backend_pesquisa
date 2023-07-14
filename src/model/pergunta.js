const mongoose = require('../config/database')
const Schema = mongoose.Schema

const PerguntasModel = new Schema({
  pergunta:String,
  fkCandidato: {
    type: Schema.Types.ObjectId,
    ref: 'Candidato'
  }
})

module.exports = mongoose.model('Pergunta', PerguntasModel)