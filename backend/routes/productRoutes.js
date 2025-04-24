// const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/productController');

// router.get('/get', productController.getProducts);
// router.post('/addproducts', productController.addProduct);
// router.put('/updatedProduct/:id', productController.updatedProduct);
// router.delete('/deleteProduct/:id', productController.deleteProduct);

// module.exports = router;


const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/get", productController.getProducts);
router.post("/addproducts", productController.addProduct);
router.put("/updatedProduct/:id", productController.updatedProduct);
router.delete("/deleteProduct/:id", productController.deleteProduct);

module.exports = router;
