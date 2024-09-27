const db = require("../db.json")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const login = async (req, res) =>{
    try {
        const {email, senha} = req.body;
        //pegando emial e senha so corpo da requisiçao
        const lista_cliente = db.clientes
        //importando toda requisição do cliente 

        if(!email || !senha) {
            res.statu(406).send({erro: 'email ou senha não enviado'})
        }
        //verificando se Usu mandou email ou senha

        const cliente = lista_cliente.find((cliente) => cliente?.email == email) //procurando cliente 

        if(!cliente){
            res.status(404).send({error:'not found'})
        } // se nao achou cliente retorna 404

        const senhaValida = bcrypt.compareSync(senha, cliente.senha)//compara a senha que o usu mandou é a mesma que ta salvo no banco de dados
        if(!senhaValida){
            res.send({error: 'a senha nao é valida'})
        }
        //valida senha
        const token = jwt.sign( //criar token
            {//mandar informações para criação
                nome: cliente.nome,
                email: cliente.email,
                _id: cliente.id
            },
            process.env.chave_criptografia,//chave de criptografia 
            {expiresIn: 1000*60*60*24*365} //propriedade de tempo de expiração 
        )
        console.log(token)

        res.cookie("TokenAula", token).send({message: 'ok'})

    } catch (e) {
        console.log(e)
    }
}


const logout = async(req,res) =>{
    res.cookie('TokenAula', "none", expiresIn = 5)
    res.send({message: "usuario fez logout"})
}
module.exports = {login,logout}