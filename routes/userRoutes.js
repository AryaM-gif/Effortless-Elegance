


const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
router.post("/create", user.createUser); 
router.post("/login", user.loginUser); 
router.post("/addtocart", user.addToCart); 
router.get("/getcartitems", user.getCartItems);
router.post("/addtoLike", user.addToLike); 
router.get("/getLikeitems", user.getLikeItems); 
router.post('/removeFromLike', user.removeFromLike);
router.post('/removeFromCart', user.removeFromCart);
router.get("/getUser", user.getUser);
router.post ("/incrementCartItem",user.incrementCartItem)
router.post ("/decrementCartItem",user.decrementCartItem)
router.post("/banUser", user.banUser); 
router.put('/updateUser', user.updateUser);
router.post('/addOrder', user.addOrder);
router.get('/getOrders', user.getOrders);

module.exports = router;
