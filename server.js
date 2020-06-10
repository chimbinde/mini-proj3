//carregando modulos para usar
const express = require("express");
//const flash = require('connect-flash');
//const path = require("path");
// configuracao para o formulario
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
const membros = require('./api/routes/membros');
const voluntario = require('./api/routes/voluntarios');

//const session = require('express-session');
//const passport = require("passport");

//app.engine('handlebars',handlebars({defaultLayout:'main'}));
//app.set('view engine','handlebars'); 
//configuracao de bodyparser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
  res.send("default router..");
  //res.render("admin/index");
 // res.render("admin/dashboard");
});
//======================================================
app.use('/membro',membros);
app.use('/voluntario',voluntario);

const PORT = process.env.PORT || 8081;
app.listen(PORT,()=>{
    console.log("servidor rodando:port:8081");
}); 