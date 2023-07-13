require('dotenv').config()
const Yup = require('yup')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Administrador = require('../model/administrador')

class AdministradorController{
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

    const cpfExist = await Administrador.findOne({
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

    const adm = await Administrador.create({
      nome,
      cpf,
      categoria: 'Administrador',
      senha: passwordHash
    })
    try{
      await adm.save()
      res.status(201).json({msg: 'Administrador cadastrado com sucesso.'})
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

    const adm = await Administrador.findOne({cpf: cpf})

    if(!adm){
      return res.status(400).json({error: 'Administrador não encontrado'})
    }

    const checkPassword = await bcrypt.compare(senha, adm.senha)

    if(!checkPassword){
      return res.status(400).json({error: 'Senha inválida'})
    }

    try{
      const secret = process.env.SECRET
      const token = jwt.sign(
        {
          id: adm._id
        },
        secret
      )

      res.status(200).json({adm, token})
    }catch(error){
      res.status(500).json(error)
    }
  }
}

module.exports = new AdministradorController()