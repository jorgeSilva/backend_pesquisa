const Yup = require('yup')
const Resposta = require('../model/resposta')
const Pergunta = require('../model/pergunta')
const Entrevista = require('../model/entrevista')

class EntrevistaController{
  async store(req, res){
    const schema = Yup.object().shape({
      rua: Yup.string().required(),
      anonimo: Yup.boolean().required(),
      resposta: Yup.string().required(),
      fkPergunta: Yup.string().required()
    })

    const { rua, anonimo, numeroCasa, nomeEntrevistado, resposta, fkPergunta } = req.body

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({erro: 'Falha na validação dos campos.'})
    }

    const perguntaExist = await Pergunta.findOne({
      pergunta:{'$eq':fkPergunta}
    })

    if(!perguntaExist){
      return res.status(400).json({error: 'Pergunta não foi encontrada.'})
    }

    const resp = await Entrevista.create({
      rua,
      numeroCasa,
      anonimo,
      nomeEntrevistado,
      resposta,
      fkPergunta: perguntaExist
    })
    
    try{
      await resp.save().then(r => res.status(201).json(r))
    }catch(error){
      res.status(201).json(error)
    }
  }
}

module.exports = new EntrevistaController()