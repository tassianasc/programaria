const express = require ("express")
const router = express.Router()

const app = express()
const porta = 3333

const mulheres = [
  {
    nome:"Tássia Nascimento",
    minibio: "Estudante de Eng de Software - 6º período - Universidade de Vasssouras"
  } ,
  { nome:"Simaria Conceição",
    minibio: "Desenvolvedora e instrutora"
  },
  {
    nome:"Iana Chan",
    minibio: "Fundadora da Programaria"
  }
]

function mostraMulheres(req,res) {
  res.json(mulheres)
}

function mostraPorta() {
  console.log("Servidor criado e rodando na porta", porta)
}

app.use(router.get('/mulheres',mostraMulheres))
app.listen(porta,mostraPorta)
