const Yup = require('yup')
const Pergunta = require('../model/pergunta')
const Candidato = require('../model/candidato')

class PerguntaController {
  async store(req, res){
    const schema = Yup.object().shape({
      pergunta: Yup.string().required(),
      fkCandidato: Yup.string().required()
    })

    const { pergunta, fkCandidato } = req.body

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({erro: 'Falha na validação dos campos.'})
    }

    const candidatoExist = await Candidato.findOne({
      cpf: {'$eq': fkCandidato}
    })

    if(!candidatoExist){
      return res.status(400).json({error: 'Candidato não encontrado.'})
    }

    const pg = await Pergunta.create({
      pergunta,
      fkCandidato: candidatoExist
    })

    try{
      await pg.save()
      return res.status(201).json({msg: 'Pergunta cadastrada com sucesso.'})
    }catch(error){
      res.status(201).json({error})
    }
  }

  async index(req, res){
    const { fkCandidato } = req.params

    const candidatoExist = await Candidato.findOne({
      _id: {'$eq': fkCandidato}
    })

    if(!candidatoExist){
      return res.status(400).json({error: 'Candidato não encontrado.'})
    }
    
    await Pergunta.find({
      fkCandidato:{'$eq':candidatoExist}
    }).then(r => res.status(200).json(r))
    .catch(error => res.status(400).json(error))
  }
}

module.exports = new PerguntaController()