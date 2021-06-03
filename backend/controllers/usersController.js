const Users = require("../models/users.model"),
      Tokens = require("../models/apiToken.model"),
      bcrypt = require("bcrypt"),
      jwt = require("jsonwebtoken"),
      { v4: uuidv4 } = require('uuid'),
      saltRounds = 10;

exports.getList = (req, res) => {
  Users.find({}, (err, obj) => {
    if (err) {
      console.log(err);
      return res.send(500);
    }
    res.send(obj);
  });
};

exports.getItem = (req, res) => {
  if(!req.body.username || !req.body.password){
    return res.sendStatus(400)
  } else {

    Users.findOne({ username: req.body.username }, (err, obj) => {
      if (err) {
        console.log(err);
        return res.send(500);
      }
      if(obj == null){
        return res.sendStatus(404);
      }else {

          bcrypt.compare(req.body.password, obj.password, function(err, result) {
              if(result == true){

                Tokens.findOne({ userID: obj._id }, (err, token) => {

                  if (token == null) {
                    let token = jwt.sign({ user: obj._id }, obj.username);
                    let JSONtoken = new Tokens({
                      token: token,
                      userID: obj._id
                    });
                    JSONtoken.save().then(() => {
                      obj = {
                        user : obj , token : token
                      };
                      res.status(201).send(obj);
                    });
                  } else {

                    obj = {user : obj, token : token.token}
                    return res.send(obj);
                  }

                  if (err) {
                    console.log(err);
                    return res.status(500).send("Oups something went wrong");
                  }
                });
              } else {
                return res.sendStatus(401)
              }
          });
      }
    });
  }
};

exports.postItem = (req, res) => {

  if (!req.body.username || !req.body.password || !req.body.role) {
    res
      .status(403)
      .send("Username, password, roles et ips sont obligatoires ! ");
  }
  Users.findOne({ username: req.body.username }, (err, obj) => {
    if (err) {
      console.log(err);
      return res.send(500);
    }
    if (obj != null) {
      res.status(403).send("Pseudo déjà utilisé merci d'en choisir un autre !");
    } else {

      req.body.ips = req.ip;
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        req.body.password = hash
        req.body._id = uuidv4()
        let token = jwt.sign({ user: req.body._id }, req.body.username);
        const user = new Users({
          ...req.body,
        });
        user
          .save()
          .then(() => {
            let JSONtoken = new Tokens({
              token: token,
              userID: req.body._id
            });
            JSONtoken.save().then(() => {
              obj = {
                _id : req.body._id,  user : {username : req.body.username}, token : token
              };
              res.json(obj);
            });
          })

     });
    }
  });
};

exports.putItem = (req, res) => {
  Users.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true },
    (err, obj) => {
      if (err) {
        console.log(err);
        return res.send(500);
      }
      return res.send(obj);
    }
  );
};

exports.deleteItem = (req, res) => {
  Users.deleteOne({ _id: req.params.id }, (err, obj) => {
    if (err) {
      console.log(err);
      return res.send(500);
    }
    return res.status(200).send("User supprimé !");
  });
};
