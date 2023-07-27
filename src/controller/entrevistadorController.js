require('dotenv').config()
const Yup = require('yup')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Entrevistador = require('../model/entrevistador')

class EntrevistadorController{
  async store(req, res){
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      cpf: Yup.string().required(),
      senha: Yup.string().required(),
      confirmSenha: Yup.string().required()
    })

    const { nome, cpf, senha, confirmSenha } = req.body

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({erro: 'Falha na validação dos campos.'})
    }

    const cpfExist = await Entrevistador.findOne({
      cpf: {'$eq': cpf}
    })

    if(cpfExist){
      return res.status(400).json({erro: 'CPF já cadastrado.'})
    }

    if(senha != confirmSenha){
      return res.status(400).json({error: 'Senhas incopativeis'})
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(senha, salt)

    const entrevistador = await Entrevistador.create({
      nome,
      cpf,
      categoria: 'Entrevistador',
      senha: passwordHash
    })
    try{
      await entrevistador.save()
      res.status(201).json({msg: 'Entrevistador cadastrado com sucesso.'})
    }catch(error){
      res.status(500).json({error})
    }
  }

  async login(req, res){
    const schema = Yup.object().shape({
      cpf: Yup.string().required(),
      senha: Yup.string().required()
    })

    const { cpf, senha } = req.body

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error:'Informe email e senha.'})
    }

    const entrevistador = await Entrevistador.findOne({cpf: cpf})

    if(!entrevistador){
      return res.status(400).json({error: 'Entrevistador não encontrado'})
    }

    const checkPassword = await bcrypt.compare(senha, entrevistador.senha)

    if(!checkPassword){
      return res.status(400).json({error: 'Senha inválida'})
    }

    try{
      const secret = process.env.SECRET
      const token = jwt.sign(
        {
          id: entrevistador._id
        },
        secret
      )

      res.status(200).json({entrevistador, token})
    }catch(error){
      res.status(500).json(error)
    }
  }

  async index(req, res){
    const { _id } = req.params

    const userExist = await Entrevistador.findById(_id, '-senha')

    if(!userExist){
      return res.status(400).json({error: 'Usuario não encontrado'})
    }

    res.status(200).json({userExist})
  }
}

module.exports = new EntrevistadorController()
