const Yup = require('yup')
const Resposta = require('../model/resposta')
const Pergunta = require('../model/pergunta')

class RespostaController {
  async store(req, res){
    const schema = Yup.object().shape({
      resposta0: Yup.string().required(),
      fkPergunta: Yup.string().required()
    })

    const {
      resposta0,
      resposta1,
      resposta2,
      resposta3,
      resposta4,
      resposta5,
      resposta6,
      resposta7,
      resposta8,
      resposta9,
      fkPergunta
    } = req.body
    
    if(!(await schema.isValid(req.body))){
      return res.status(400).json({erro: 'Falha na validação dos campos.'})
    }

    const perguntaExist = await Pergunta.findOne({
      pergunta:{'$eq':fkPergunta}
    })

    if(!perguntaExist){
      return res.status(400).json({error: 'Pergunta não foi encontrada.'})
    }

    const resp = await Resposta.create({
      resposta0,
      resposta1,
      resposta2,
      resposta3,
      resposta4,
      resposta5,
      resposta6,
      resposta7,
      resposta8,
      resposta9,
      fkPergunta: perguntaExist
    })

    try{
      await resp.save().then(r => res.status(201).json(r))
    }catch(error){
      res.status(201).json(error)
    }
  }
}

module.exports = new RespostaController()