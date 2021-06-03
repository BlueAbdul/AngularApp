const express = require('express'),
      router = express.Router(),
      ctrl = require('../controllers/usersController'),
      verifyToken = require('../middlewares/verifytoken');


router.get('/',verifyToken, ctrl.getList )
router.post('/connect', ctrl.getItem)
router.post('/post', ctrl.postItem)
router.put('/edit/:id',verifyToken, ctrl.putItem)
router.delete('/delete/:id',verifyToken, ctrl.deleteItem)

module.exports = router
