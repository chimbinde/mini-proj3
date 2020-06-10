const express = require("express");
const router = express.Router();
//const dados = require('./../model/Data'); 
const bcrypt = require("bcryptjs");
//const {eAdmin} = require("../helpers/eAdmin");

router.get('/',(req,res)=>{
     res.send("Pagina principal do voluntarios..");
     //res.render("admin/index");
    // res.render("admin/dashboard");
 });

 router.get('/listar',(req,res)=>{ 
    const post = require('./../model/Voluntario');
    //console.log(post.getAll());
    res.send(post.getAll());
  //  res.send("Pagina principal do membros..");
});

router.post('/criar',(req,res)=>{
  let nome = req.body.nome;
  let apelido = req.body.apelido;
  let email = req.body.email;
  //let anoInicio = req.body.anoInicio;
  let password = req.body.password;
  let confPassword = req.body.confPassword;

//  console.log(nome);
  let erros=[];
  if(nome=="" || typeof nome==undefined || nome==null){
      erros.push({texto:"nome invalido.."});
  }
  if(apelido=="" || typeof apelido==undefined || apelido==null){
      erros.push({texto:"apelido invalido.."});
  }

  if(!email || typeof email==undefined || email==null){
      erros.push({texto:"email invalido.."});
  }
  if(!password || typeof password==undefined || password==null){
      erros.push({texto:"password invalida.."});
  }
  if(!confPassword || typeof confPassword==undefined || confPassword==null){
      erros.push({texto:"conf password invalida.."});
  }
  if(confPassword !== password){
      erros.push({texto:"palavras diferentes."});
  }
  let senha = password;
  let tipoConta = 0;


  if(erros.length>0){
     // alert("Dados com problemas");
       console.log(password+"@"+erros.length);
       res.send(JSON.parse('{"statu":"0","msg":"Dados incorrectos.."}'));
    // res.send(JSON.parse('{statu:"0",msg:"Dados incorrectos.."}'));
     // return;
     // res.render("admin/voluntarios",{erros:erros});
    //  console.log("@"+erros.length);
  }else {

      bcrypt.genSalt(10,(erro,salt)=>{
          bcrypt.hash(senha,salt,(erro,hash)=>{
              if(erro){
                res.send(JSON.parse('{"statu":"0","msg":"erro ..."}'));
              }
              senha= hash; 
              const post = require('./../model/Voluntario');
              post.save(nome,apelido, email, senha, tipoConta);
             // res.send('{statu:"1",msg:"Inserido com sucesso"}');
               res.send(JSON.parse('{"statu":"1","msg":"Adicionado com sucesso."}'));
          });
  
      }); 
  }  

});

router.get('/del/:id',(req,res)=>{
  // console.log("ok ok ok"+req.params.id);
   const post = require('./../model/Voluntario');
   let id=req.params.id;
   if(post.findId(id)!=-1) {
       
       post.delete(id);
       res.send(JSON.parse('{"statu":"1","msg":"Eliminado com sucesso"}'));
      //console.log("aqui bro..@"+id);
   }  
   else {
       // res.send('{"statu":"0","msg":"nao achou..}');
        res.send(JSON.parse('{"statu":"0","msg":"Nao foi possivel localizar este registo"}'));
       // console.log("aqui bro..@@"+id);
   }

});


 module.exports = router;