const jwt = require('jsonwebtoken')

function validadorDeCookie(req,res, next){
    const token = req.cookies.TokenAula //pega o token
    if(!token){
        return res.status(401).send({menssage:  "nao existe"})
    } //verifica se o token existe 

    try{
        const decodificado = jwt.verify(token, process.env.chave_criptografia)
    }catch{
        return res.status(401).send({menssage:  "nao existe"})
    }// de der algun erro na decodigi

    next()
}

module.exports= { validadorDeCookie}