const express = require ("express")
const router = express.Router()

const app = express()
const porta = 3333

function mostraMulher(req,res) {
  res.json({
    nome: 'Tássia Nascimento',
    minibio: "Estudante de Eng de Software - 6º período - Universidade de Vasssouras"

  })
}

function mostraPorta() {
  console.log("Servidor criado e rodando na porta", porta)
}

app.use(router.get('/mulher', mostraMulher))
app.listen(porta,mostraPorta)