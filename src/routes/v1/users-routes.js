const express = require('express');
const { isValidHostname, isAuth, isAdmin } = require('../../middleware/auth');
const usersController = require('../../controllers/v1/users-controller');

const router = express.Router();

router.post('/login', usersController.login);
router.post('/create', usersController.createUser);
router.put('/update', isValidHostname, isAuth, usersController.updateUser);
router.delete('/delete', isAuth, isAdmin, usersController.deleteUser);
router.get('/get-all', isAuth, isAdmin, usersController.getUsers);

module.exports = router;