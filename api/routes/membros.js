const express = require("express");
const router = express.Router();
//const dados = require('./../model/Data'); 
const bcrypt = require("bcryptjs");
//const {eAdmin} = require("../helpers/eAdmin");

router.get('/',(req,res)=>{
     res.send("Pagina principal do membros..");
     //res.render("admin/index");
    // res.render("admin/dashboard");
 });
 router.get('/listar',(req,res)=>{

   const post = require('./../model/Membro');
   //console.log(post.getAll());
   res.send(post.getAll());

});
router.post('/criar',(req,res)=>{
  let nome = req.body.nome;
  let apelido = req.body.apelido;
  let email = req.body.email;
  let anoInicio = req.body.anoInicio;
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
  if(!anoInicio || typeof anoInicio==undefined || anoInicio==null){
      erros.push({texto:"ano invalido.."});
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
  let tipoConta = 1;
console.log(erros);
  if(erros.length>0){
     res.send(JSON.parse('{"statu":"0","msg":"Formato de dados errado.."}'));
  }else {

      bcrypt.genSalt(10,(erro,salt)=>{
          bcrypt.hash(senha,salt,(erro,hash)=>{
              if(erro){
                  res.send(JSON.parse('{"statu":"0","msg":"Erro ao salvar"}'));
              }
              senha= hash; 
              const post = require('./../model/Membro');
             // console.log(nome+'-'+apelido+'-'+ email+'-'+ senha+'-'+tipoConta+'-'+anoInicio);
              post.save(nome,apelido, email, senha, tipoConta,anoInicio);
              res.send(JSON.parse('{"statu":"1","msg":"Inserido com sucesso"}'));
          });
  
      }); 
  }  
});
router.get('/del/:id',(req,res)=>{
 // console.log("ok ok ok"+req.params.id);
  const post = require('./../model/Membro');
  let id=req.params.id;
  //console.log(">>"+id+">>")
  if(post.findId(id)!=-1) {
      
      post.delete(id);
      res.send(JSON.parse('{"statu":"1","msg":"Eliminado com sucesso"}'));
  }  
  else {
     // req.flash("error_msg","Nao localizou o elemento");
     res.send(JSON.parse('{"statu":"0","msg":"Registo nao existe"}'));
     //return;
  }
 
});


module.exports = router;