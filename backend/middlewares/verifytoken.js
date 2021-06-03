const Token = require('../models/apiToken.model');

const verifyToken = (req, res, next) => {

    if(!req.headers.authorization){
        return res.status(401).send("Vous n'avez pas de clé API, allez sur /authentifcation pour en générer une et le mettre dans votre header");
    }

    Token.findOne({token: req.headers.authorization}, (err, obj) => {
      if(err){
        console.log(err);
        return res.status(500).send("Oups something went wrong");
      }
      if(obj=== null){
        return res.status(401).send("Votre clé API est périmée, rendez vous sur /authentification pour en générer une");
      }else{

        next()
      }
      });
   
    // si je ne fais pas next, le server n'envoie pas de réponse !!!
  }
  
  
  module.exports = verifyToken