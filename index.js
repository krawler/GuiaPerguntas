const express = require("express");
const app = express();

app.set('view engine','ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencode({extended : false}));
app.use(bodyParser.json());

app.get("/", (req,res) => {
    res.render("index",{
        nome: '',
        lang : '',
        empresa: "Guia do Programador",
        msg: 'mensagem',
        produtos: []
    });
});

app.get("/perguntar",(req,res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req,res) => {
    var titulo = req.body.titulo;
    var pergunta = req.body.pergunta;
    res.send("Formulario recebido! titulo " + titulo + " - " + pergunta);
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
*/ */