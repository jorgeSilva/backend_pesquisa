const Yup = require('yup')
const Resposta = require('../model/resposta')
const Pergunta = require('../model/pergunta')
const Candidato = require('../model/candidato')

class RespostaController {
  async store(req, res){
    const {_id} = req.params

    const userExist = await Candidato.findOne({
      _id: {'$eq': _id}
    })

    if(!userExist){
      return res.status(400).json({error: 'Cliente não foi encontrada.'})
    }

    const schema = Yup.object().shape({
      fkPergunta: Yup.string().required()
    })

    const {
      type,
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
      _id:{'$eq':fkPergunta}
    })

    if(!perguntaExist){
      return res.status(400).json({error: 'Pergunta não foi encontrada.'})
    }

    const resp = await Resposta.create({
      type,
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
      fkPergunta: perguntaExist,
      fkCandidato: userExist
    })

    try{
      await resp.save()      
      return res.status(201).json({msg: 'Resposta cadastrado com sucesso.'})
    }catch(error){
      res.status(201).json(error)
    }
  }

  async index(req, res){
    const { _id } = req.params

    const candidatoExist = await Candidato.findById(_id)

    if(!candidatoExist){
      return res.status(400).json({error: 'Candidato não encontrado.'})
    }
    
    await Resposta.find({
      fkCandidato:{'$eq': _id}
    }).then(r => res.status(200).json(r)).catch(error => res.status(400).json(error))
  }
}

module.exports = new RespostaController()