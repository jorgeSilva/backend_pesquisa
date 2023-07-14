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
      await pg.save().then(r => res.status(201).json(r))
    }catch(error){
      res.status(201).json({error})
    }
  }
}

module.exports = new PerguntaController()