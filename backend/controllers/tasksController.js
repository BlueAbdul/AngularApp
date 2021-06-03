const Tasks = require('../models/task.model')

exports.getList = (req,res) =>{
    Tasks.find({}, (err,obj) => {
        if(err){
            console.log(err);
            return res.send(500);
        }
        res.send(obj)
    });


}

exports.getItem = (req,res) =>{

    Tasks.find({referent: req.params.id}, (err, obj) => {
        if(err) {
          console.log(err);
          return res.send(500);
        }
        return res.send(obj);
      });

}

exports.postItem = (req,res) =>{
 if(!req.body.status || !req.body.title || !req.body.content || !req.body.referent){
     res.status(403).send('Title, status, content et referent sont obligatoires ! ')
 } else {

   const task = new Tasks({
       ...req.body
   })

   task.save().then(() => {
  res.json('Task créé')
   }).catch(error => res.status(400).json({error}))
 }


}


exports.putItem = (req,res) =>{
  console.log(req.params._id);
Tasks.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}, (err, obj) => {
    if(err) {
      console.log(err);
      return res.send(500);
    }
    return res.send(obj);
  });

}


exports.deleteItem = (req,res) =>{
Tasks.deleteOne({_id: req.params.id}, (err, obj) => {
    if(err) {
      console.log(err);
      return res.send(500);
    }
    return res.json('User supprimé !');
  });

}
