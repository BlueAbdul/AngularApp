require("dotenv").config();

const express = require("express"),
      app = express(),
      cors = require("cors"),
      Token = require("./backend/models/apiToken.model"),
      jwt = require("jsonwebtoken"),
      usersRoutes = require("./backend/routes/users"),
      tasksRoutes = require("./backend/routes/tasks"),
      mongoose = require("mongoose"),
      DB = process.env.DB,
      port = 8080;

app.use(express.json());
app.use(cors());
app.use("/users", usersRoutes);
app.use("/tasks", tasksRoutes);

let promise = mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

promise.then(async (database) => {
  console.log("Connected to mongo");
  app.listen(port, () => console.log(`Backend sur le port ${port}`));
});

app.get("/", (req, res) => {
  if (req.headers.authorization) {
    res.send("Bienvenue sur l'API Angular");
  } else {
    res.send(
      "Bienvenue sur l'API Angular \n Allez sur /authentification en méthode POST avec un userID en body pour générer une clé API !"
    );
  }
});

app.post("/authentification", (req, res) => {
  if (req.headers.authorization) {
    Token.findOne({ token: req.headers.authorization }, (err, obj) => {

      if (obj != null) {
        res.status(400).send("Vous avez déjà une clé API encore valide !");
      }

      if (err) {
        console.log(err);
        return res.status(500).send("Oups something went wrong");
      }

    });

  } else {

    let token = jwt.sign({ user: req.body.userID }, "foo");

    let JSONtoken = new Token({
      token: token,
      userID: req.body.userID
    });

    JSONtoken.save().then(() => {
      let obj = {
        consigne: `Voici votre token. Merci de le fournir avec dans le headers de vos requêtes, une clé Authorization avec cette clé en valeur.`,
        token: token
      };
      res.status(201).send(obj);
    });

  }
});
