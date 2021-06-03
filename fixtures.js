const e = require("express");

require("dotenv").config();

const   mongoose = require("mongoose"),
        bcrypt = require("bcrypt"),
        { v4: uuidv4 } = require('uuid'),
        saltRounds = 10,
        Users = require('./backend/models/users.model'),
        Tasks = require('./backend/models/task.model'),
        DB = process.env.DB;



let promise = mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

promise.then(async (database) => {
  console.log("Connected to mongo");
  let usersArray = [{ username : 'JeanSansTerres', password : 'PerfideAlbion', role : 'user', _id : uuidv4()},{ username : 'DouglasMcArthur', password : 'nukechina', role : 'user', _id : uuidv4()}]
  let tasks = [
      {referent : usersArray[0]._id , title : 'Reconquérir le trône d\'Angleterre' , content : 'Trouver une solution pour reconquérir le trône', date : new Date(), status : 'ongoing'},
      {referent : usersArray[0]._id , title : 'Provoquer Philippe II en combat de boxe' , content : 'En cas de défaite, simuler une colique', date : new Date(), status : 'planned'},
      {referent : usersArray[0]._id , title : 'Signer la grande charte' , content : 'Signée mais à contrecoeur', date : new Date(), status : 'ended'},
      {referent : usersArray[1]._id , title : 'Nuke China' , content : 'nuke china', date : new Date(), status : 'planned'},
      {referent : usersArray[1]._id , title : 'Find a solution to korea war' , content : 'solution = nuke china', date : new Date(), status : 'planned'},
      {referent : usersArray[1]._id , title : 'Get fired from us army' , content : 'Oh no', date : new Date(), status : 'ended'}
  ]

  for await(user of usersArray){
    let hashedPassword = await bcrypt.hash(user.password, saltRounds)
      user.password = hashedPassword
      let obj = new Users(user);
      await obj  .save()
            .then(() => console.log('user saved'))
            .catch((error) => console.log(error));
  }


  for await(task of tasks){
    let obj = new Tasks(task)
    await obj.save()
      .then(()=> console.log('Task saved'))
      .catch((error)=> console.log(error))
  }


  console.log('Fixtures created');
  process.exit(0);
  
});


