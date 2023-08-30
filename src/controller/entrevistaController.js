const Yup = require('yup')
const Resposta = require('../model/resposta')
const Pergunta = require('../model/pergunta')
const Entrevista = require('../model/entrevista')
const Candidato = require('../model/candidato')
const Entrevistador = require('../model/entrevistador')
class EntrevistaController{
  async store(req, res){
    const schema = Yup.object().shape({
      rua: Yup.string().required(),
      bairro: Yup.string().required(),
      cep: Yup.string().required(),
      anonimo: Yup.boolean().required(),
      resposta: Yup.string().required(),
      fkPergunta: Yup.string().required(),
      fkCandidato: Yup.string().required(),
      fkEntrevistador: Yup.string().required()
    })

    const { rua, bairro, cep, anonimo, numeroCasa, nomeEntrevistado, resposta, fkPergunta, fkCandidato, fkEntrevistador } = req.body

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({erro: 'Falha na validação dos campos.'})
    }

    const candidatoExist = await Candidato.findOne({
      cpf:{'$eq':fkCandidato}
    })

    if(!candidatoExist){
      return res.status(400).json({error: 'candidato não foi encontrado.'})
    }

    const perguntaExist = await Pergunta.findOne({
      _id:{'$eq':fkPergunta}
    })

    if(!perguntaExist){
      return res.status(400).json({error: 'Pergunta não foi encontrada.'})
    }

    const entrevistadorExist = await Entrevistador.findOne({
      cpf:{'$eq':fkEntrevistador}
    })

    if(!entrevistadorExist){
      return res.status(400).json({error: 'Entrevistador não foi encontrada.'})
    }

    const resp = await Entrevista.create({
      rua,
      bairro,
      cep,
      numeroCasa,
      anonimo,
      nomeEntrevistado,
      resposta,
      fkPergunta: perguntaExist,
      fkCandidato: candidatoExist,
      fkEntrevistador: entrevistadorExist
    })
    
    try{
      await resp.save().then((r) => res.status(201).json({
        r,
        msg: 'Entrevista enviada com sucesso.'}
      ))
    }catch(error){
      res.status(201).json(error)
    }
  }

  async index(req, res){
    const { fkCandidato } = req.params

    const candidatoExist = await Candidato.findOne({
      cpf: {'$eq': fkCandidato}
    })

    if(!candidatoExist){
      return res.status(400).json({error: 'Candidato não encontrado.'})
    }

    await Entrevista.find({
      fkCandidato:{'$eq':candidatoExist}
    }).populate('fkCandidato').populate('fkPergunta').then(r => res.status(200).json(r)).catch(e => res.status(400).json(e))
  }

  async referentePergunta(req, res){
    const { fkCandidato, pergunta } = req.params

    const candidatoExist = await Candidato.findOne({
      cpf: {'$eq': fkCandidato}
    })

    if(!candidatoExist){
      return res.status(400).json({error: 'Candidato não encontrado.'})
    }

    try{
      await Entrevista.find({
        fkPergunta:{'$eq': pergunta}
      }).populate('fkPergunta').populate('fkEntrevistador').then(r => res.status(200).json(r)).catch(e => res.status(400).json(e))
    }catch{
      return res.status(500).json({error: 'Deu tudo errado'})
    }
  }

  async referenteEntrevistador(req, res){
    const { fkEntrevistador } = req.body
    const { fkCandidato } = req.params

    const candidatoExist = await Candidato.findOne({
      cpf: {'$eq': fkCandidato}
    })

    if(!candidatoExist){
      return res.status(400).json({error: 'Candidato não encontrado.'})
    }

    const entrevistadorExist =  await Entrevistador.find({
      cpf:{'$eq':fkEntrevistador}
    }).then().catch((e) => res.status(400).json(e))
    
    if(entrevistadorExist == null){
      return res.status(400).json({error: 'Entrevistador não encontrado.'})
    }

    await Entrevista.find({
      fkEntrevistador:entrevistadorExist
    }).then(r => res.status(200).json(r)).catch(e => res.status(400).json(e))
  }

  async referenteEntrevistado(req, res){
    const { fkCandidato } = req.params
    const { anonimo, nomeEntrevistado, numeroCasa, rua } = req.body

    const candidatoExist = await Candidato.findOne({
      cpf: {'$eq': fkCandidato}
    })

    if(!candidatoExist){
      return res.status(400).json({error: 'Candidato não encontrado.'})
    }

    await Entrevista.find({
      nomeEntrevistado:{'$eq':nomeEntrevistado},
      numeroCasa:{'$eq':numeroCasa},
      rua:{'$eq':rua},
      anonimo:{'$eq':anonimo}
    }).then(r => res.status(200).json(r)).catch(e => res.status(400).json(e)) 
  }

  async referentePerguntaResposta(req, res){
    const { fkCandidato, pergunta, resposta } = req.params

    const candidatoExist = await Candidato.findOne({
      cpf: {'$eq': fkCandidato}
    })

    if(!candidatoExist){
      return res.status(400).json({error: 'Candidato não encontrado.'})
    }

    await Entrevista.find({
      fkPergunta:{'$eq': pergunta},
      resposta:{'$eq': resposta}
    })
    .populate('fkPergunta')
    .populate('fkEntrevistador')
    .then(r => res.status(200).json(r))
    .catch(e => res.status(400).json(e))
  }
}

module.exports = new EntrevistaController()