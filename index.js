const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const perguntaModel = require('./models/Pergunta');

connection.authenticate().then(() =>{
    console.log("Conexão feita com o banco de dados")
}).catch((msgErro) =>{
    console.log(msgErro)
})

app.set('view engine','ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.get("/", (req,res) => {
    const order = [['id','desc']];
    perguntaModel.findAll({raw: true, order: order}).then(perguntas => {
        res.render("index",{
            perguntas: perguntas
         });
    });
});

app.get('/pergunta/:id', (req,res) => {
    var id = req.params.id;
    perguntaModel.findOne({
        where : {id : id}
    }).then(pergunta => {
        if(pergunta === undefined)
           res.redirect('/')  
        else      
           res.render('pergunta',{
               pergunta: pergunta
           })   
    });
});

app.get("/perguntar",(req,res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req,res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    perguntaModel.create({
        titulo : titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect('/');
    });
});

app.listen(8081,() => {console.log("App rodando")});

/*

app.get("/:nome/:lang",(req,res) => {
    
    var nome = req.params.nome;
    var lang = req.params.lang;
    
    res.render("index",{
        nome : nome,
        lang: lang,
        empresa: "Guia do Programador",
        inscritos: 8000,
        msg:'',
        produtos:[],
    });
});
*/ 