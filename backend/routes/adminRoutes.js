const express = require('express');
const adminController = require('../controllers/admincontroller');

const router = express.Router();

router.post('/login', adminController.login);
router.post('/register', adminController.adminReg);


module.exports = router;
