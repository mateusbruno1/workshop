const express = require('express');
const server = express();
const nunjucks = require('nunjucks');

server.use(express.urlencoded({ extended: true }))

nunjucks.configure('views', {
  express: server,
  noCache: true,
})
const db = require('./db')
// const ideas = [
//   {
//     img: 'teste',
//     title: 'teste',
//     category:'teste',
//     description: 'teste',
//     url: 'www.google.com'
//   },
//   {
//     img: '',
//     title: '',
//     category:'',
//     description: '',
//     url: ''
//   },
//   {
//     img: '',
//     title: '',
//     category:'',
//     description: '',
//     url: ''
//   },
//   {
//     img: '',
//     title: '',
//     category:'',
//     description: '',
//     url: ''
//   },
// ]
//configurar arquivos estaticos
server.use(express.static("public"))

server.get('/', (req, res) => {

  //consultar dados na tabela
  db.all(`SELECT * FROM ideas`, function (err, rows) {
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados");
    }
    const reverseIdeas = [...rows].reverse();
    let lastIdeas = []
    for (let idea of reverseIdeas) {
      if (lastIdeas.length < 2) {
        lastIdeas.push(idea)
      }
    }
    return res.render("index.html", { ideas: lastIdeas });
  })


});
server.get('/ideias', (req, res) => {

  db.all(`SELECT * FROM ideas`, function (err, rows) {
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados");
    }
    const reverseIdeas = [...rows].reverse();
    return res.render("ideias.html", { ideas: reverseIdeas });

  })


});
server.post('/', function (req, res) {
  //inserir dados na tabela
  const query = `
  INSERT INTO ideas(
    image,
    title,
    category,
    description,
    link
  ) VALUES(
    ?,?,?,?,?
  );
  `
  const values = [
    req.body.image,
    req.body.title,
    req.body.category,
    req.body.description,
    req.body.link,
  ]

  db.run(query, values, function (err) {
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados");
    }
    return res.redirect('/ideias');
  })

})
server.listen(3333);