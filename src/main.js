const express = require('express');
const bodyParser = require('body-parser'); // importei o body-parser
const mongoose = require('mongoose');

// ***** ÍNÍCIO DA PARTE DO BANCO DE DADOS *****
// 1. Criando um esquema de banco de dados
const ProdutoSchema = { 
  nome: String ,
  preco: Number
};
// 2. Criando um model (gera as funções de save, find ...)
const Produto = mongoose.model('Produto', ProdutoSchema);
// 3. Conecta ao banco de dados
mongoose.connect('mongodb://127.0.0.1/projeto03').then(() => console.log('conectado')).catch(erro => console.error(erro));
// ***** FIM DA PARTE DO BANCO DE DADOS *****

// ***** INÍCIO DA PARTE WEB *****
const app = express();

// adicionando o body-parser na aplicação
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Fazendo a API REST para manter o recurso 'produtos'
app.get('/produtos', async (req, res) => {
  res.json(await Produto.find({})); // retorna todos os produtos do banco
});
app.get('/produtos/:id', async (req, res) => {
  res.json(await Produto.findById(req.params.id));
});
app.post('/produtos', async (req, res) => {
  res.json(await Produto(req.body).save()); // salva um novo produto
});
app.put('/produtos/:id', async (req, res) => {
  res.json(await Produto.findByIdAndUpdate(req.params.id, req.body)); // peocura um produto
});
app.delete('/produtos/:id', async(req, res) => {
  res.json(await Produto.findByIdAndDelete(req.params.id)); // deleta um produto
});

console.log('Iniciando o servidor ...');
app.listen(5000, () => {
  console.log('Acesse em http://localhost:5000')
});
// ***** FIM DA PARTE WEB *****