const router = require('express').Router();

const { createOrder, addItemsInNewOrder, addItemsInOldOrder, getOrders } = require('../controllers/order');

// Создаем заказ
router.get('/orders', getOrders);
// Создаем заказ
router.post('/create-order', createOrder);
// Добавляем позиции в новый заказ
router.post('/add-items-in-new-order', addItemsInNewOrder);
// Добавляем позиции в старый заказ
router.post('/add-items-in-old-order/:id', addItemsInOldOrder);

module.exports = router;
