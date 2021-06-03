const express = require('express'),
      router = express.Router(),
      ctrl = require('../controllers/tasksController'),
      verifyToken = require('../middlewares/verifytoken');


router.get('/',verifyToken, ctrl.getList )
router.get('/user/:id',verifyToken, ctrl.getItem)
router.post('/post',verifyToken, ctrl.postItem)
router.put('/edit/:id',verifyToken, ctrl.putItem)
router.delete('/delete/:id',verifyToken, ctrl.deleteItem)

module.exports = router