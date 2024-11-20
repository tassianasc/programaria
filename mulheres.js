const express = require ("express") //Iniciando o express 
const router = express.Router() //Conf primeira parte da rota
const cors = require('cors') //trazendo o pacote Cors que permite consumir API no front-end
const conectaBancodeDados = require('./bancoDeDados') //importanto o banco de dados
conectaBancodeDados() //chamando a função que conecta o banco de dados

const Mulher = require('./mulherModel')

const app = express() // iniciando o app
app.use(express.json())
app.use(cors())
const porta = 3333 // criando a porta


//GET
async function mostraMulheres(req,res){
  try {
    const mulheresVindasdoBancoDeDados =await Mulher.find()

    res.json(mulheresVindasdoBancoDeDados)

  }catch (erro) {
    console.log(erro)

  }
}

//POST 
async function criaMulher(req,res) {
  const novaMulher = new Mulher({
    nome: req.body.nome,
    imagem: req.body.imagem,
    minibio: req.body.minibio,
    citacao: req.body.citacao
  })

  try{
    const mulherCriada = await novaMulher.save()
    res.status(201).json(mulherCriada)
  } catch(erro){
  console.log(erro)
}
}
//PATCH
async function corrigeMulher(req, res) {

  try {
      const mulherEncontrada = await Mulher.findById(req.params.id)

      if (req.body.nome) {

          mulherEncontrada.nome = req.body.nome

      }

      if (req.body.minibio) {

          mulherEncontrada.minibio = req.body.minibio

      }

      if (req.body.imagem) {

          mulherEncontrada = req.body.imagem

      }

      if (req.body.citacao) {

          mulherEncontrada = req.body.citacao

      }

      const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()

      res.json(mulherAtualizadaNoBancoDeDados)

  } catch (erro) {

      console.log(erro)

  }
}

//DELETE
async function deletaMulher(req,res){
  try{
    await Mulher.findByIdAndDelete(req.params.id)
    res.json({messagem:'Mulher deletada com sucesso!'})
  } catch(erro){
    console.log(erro)
  }
}

//PORTA
function mostraPorta() {
  console.log("Servidor criado e rodando na porta", porta)
}

app.use(router.get('/mulheres',mostraMulheres)) // configuração rota GET/mulheres
app.use(router.post('/mulheres',criaMulher)) //conf rota POST/mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) //conf da rota patch/mulheres/:id
app.use(router.delete('/mulheres/:id',deletaMulher))
app.listen(porta,mostraPorta) //Servidor ouvindo a porta
