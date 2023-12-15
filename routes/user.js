const router = require('express').Router();
const userController = require('../Controller/userController');
const { verifyToken } = require('../utility/verify');



//  Udate
router.put('/:id', verifyToken, userController.updateUser)
//  Delete
router.delete('/:id', verifyToken, userController.deleteUser)
//  Get
router.get('/:id', userController.getUser)
//  Get ALL
router.get('/', verifyToken, userController.getAllUser)



module.exports = router;