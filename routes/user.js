const router = require('express').Router();

const { getUserInfo, getUsers } = require('../controllers/user');

// Получает информацию о текущем пользователе
router.get('/users', getUsers);
router.get('/users/me', getUserInfo);


module.exports = router;
