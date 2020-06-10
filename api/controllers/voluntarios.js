module.exports=app=>{
    const voluntariosdb =app.data.voluntarios;
    const controller ={};
    controller.listaVoluntarios =(req,res)=>res.status(200).json(voluntariosdb);
 //   controller.listaVoluntarios =(req,res)=>res.status(200).json('{"ur":"faaaa"}');
    controller.li =(req,res)=>res.status(200).json('{"voluntarios":"voluntarios"}');
    console.log(controller.listaVoluntarios);
    /*
    const voluntariosdb= require('../data/membros.json');
    const controller ={};
    controller.listaVoluntarios =(req,res)=>res.status(200).json(voluntariosdb);
    */
    return controller;

}