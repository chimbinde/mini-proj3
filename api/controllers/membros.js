module.exports=app=>{
  //  const membrosdb =app.data.membros;
    const membro =app.data.membros;
    const controller ={};

    //controller.listMembros =membro.getAll();
   // controller.li =(req,res)=>res.status(200).json('{"ur":"faaaa"}');
    /*
    controller.listMembros =(req,res)=>res.status(200).json(membrosdb);
    controller.li =(req,res)=>res.status(200).json('{"ur":"faaaa"}');
    */

  //  console.log(controller.listMembros);
    /*
    const membrosdb= require('../data/membros.json');
    const controller ={};
    controller.listMembros =(req,res)=>res.status(200).json(membrosdb);
    */
    return controller;

}