const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const usuario = require('./routes/usuario');
const nota = require('./routes/nota');
const checklist = require('./routes/checklist');
const tag = require('./routes/tag');
const porta = 3000;

app.use(bodyParser.json());

app.use('/usuario', usuario);
app.use('/checklist', checklist);
app.use('/tag', tag);
app.use('/nota', nota);

app.listen(porta, function () {
  console.log(`API rodando na porta ${porta}`);
});
