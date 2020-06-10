const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const consign = require('consign');

const membro = require('./../api/routes/membros');
//app.use('/api/membro',membro);
module.exports=()=>{
    const app = express();
    app.set('port',process.env.PORT|| config.get('server.port'));
    app.use(bodyParser.json());
    app.use('/api/membro',membro);
 //   app.use(bodyParser.json());
  //  require('../api/routes/membros')(app);
  console.log("");
  consign({cwd:'api'})
    .then('data')
    .then('controllers')
    .then('routes')
    .into(app);
    return app;
}