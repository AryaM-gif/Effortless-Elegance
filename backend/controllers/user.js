
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users); 
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server Error' });
  }
};
const createUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ msg: "User Already Exists" });
    }
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      username: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });
    res.status(200).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: "An Error Occurred" });
  }
};

const jwtSecretKey = "arya123";

const loginUser = async (req, res) => {
  try {
    console.log('Login request received:', req.body);
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found', success: false });
    }
    const comparePwd = await bcrypt.compare(req.body.password, user.password);
    if (!comparePwd) {
      console.log('Incorrect Password');
      return res.status(400).json({ error: 'Incorrect Password!', success: false });
    }
  
    user.isLoggedIn = true;
    user.lastLoginAt = new Date();
    await user.save();

    const authToken = jwt.sign({ username: user.username }, jwtSecretKey, { expiresIn: '1d' });
    console.log('Auth token generated:', authToken);
    res.json({ success: true, authToken, user, userId: user._id });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'An Error Occurred' });
  }
};

const logoutUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.isLoggedIn = false;
    user.lastLogoutAt = new Date();
    await user.save();

    res.status(200).json({ msg: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'Internal Error' });
  }
};
const banUser = async (req, res) => {
  const { userId, isBanned } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { banned: isBanned },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: `User ${isBanned ? 'banned' : 'unbanned'} successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateUser = async (req, res) => {
  const { userId, username, email, password } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.username = username;
    user.email = email;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.status(200).json({ msg: "User updated successfully" });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// CART //

const addToCart = async (req, res) => {
  const { userId, product } = req.body;
  console.log('Request received', userId, product);
  try {
    const user = await User.findOne({ _id: userId });
    console.log("user", user);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const existingCartItem = user.cart.find(item => item.product._id.toString() === product._id.toString());

    if (existingCartItem) {
      existingCartItem.qty += 1; 
    } else {
      user.cart.push({ product });
    }

    await user.save();
    return res.status(200).json({ msg: 'Item added to cart successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Error' });
  }
};

const getCartItems = async (req, res) => {
  try {
    const userId = req.query.userId;
    const user = await User.findOne({ _id: userId });
    if (user) {
      let userCart = user.cart;
      res.status(200).send({ userCart });
    } else {
      res.status(404).send({ error: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.cart = user.cart.filter(cartItem => cartItem.product._id.toString() !== productId);

    await user.save();
    return res.status(200).json({ msg: 'Item removed from cart successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Error' });
  }
};


// Like //

const addToLike = async (req, res) => {
  const { userId, product } = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    user.like.push({ product });
    await user.save();
    return res.status(200).json({ msg: 'Item is liked successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Error' });
  }
};

const getLikeItems = async (req, res) => {
  try {
    const userId = req.query.userId;
    const user = await User.findOne({ _id: userId });
    if (user) {
      let userlike = user.like;
      res.status(200).send({ userlike });
    } else {
      res.status(404).send({ error: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const removeFromLike = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.like = user.like.filter(likeItem => likeItem.product && likeItem.product._id.toString() !== productId);

    await user.save();

    return res.status(200).json({ msg: 'Item removed successfully' });
  } catch (error) {
    console.error("Error removing item from like:", error);
    return res.status(500).json({ error: 'Failed to remove item from Like. Please try again.' });
  }
};


module.exports = { addToCart, getCartItems, removeFromCart, addToLike, getLikeItems, removeFromLike };


const incrementCartItem = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    
    const cartItem = user.cart.find(item => item.product._id.toString() === productId.toString());
    if (!cartItem) {
      return res.status(404).json({ msg: "Item not found in cart" });
    }

    cartItem.qty += 1;

    await user.save();
    res.status(200).json({ msg: "Cart item quantity incremented successfully" });
  } catch (error) {
    console.error("Error incrementing cart item quantity:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const decrementCartItem = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    
    const cartItem = user.cart.find(item => item.product._id.toString() === productId.toString());
    if (!cartItem) {
      return res.status(404).json({ msg: "Item not found in cart" });
    }

    if (cartItem.qty === 1) {
      return res.status(400).json({ msg: "Minimum quantity reached" });
    }

    cartItem.qty -= 1;

    await user.save();
    res.status(200).json({ msg: "Cart item quantity decremented successfully" });
  } catch (error) {
    console.error("Error decrementing cart item quantity:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const displayLike = async () => {
  try {
    const userId = localStorage.getItem("userID");
    const response = await axios.get(
      `http://localhost:5000/api/user/getLikeitems?userId=${userId}`
    );
    console.log("Fetched like items:", response.data.userlike);
    setLike(response.data.userlike || []); 
  } catch (error) {
    console.error("Error fetching liked products:", error);
  }
};

const displayCart = async () => {
  try {
    const userId = localStorage.getItem("userID");
    const response = await axios.get(
      `http://localhost:5000/api/user/getCartItems?userId=${userId}`
    );
    console.log("Fetched cart items:", response.data.userCart);
    setCart(response.data.userCart || []);
  } catch (error) {
    console.error("Error fetching cart products:", error);
  }
};


//ORDER"S
const addOrder = async (req, res) => {
  const { userId, totalAmount } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({ msg: "No items in cart" });
    }

    const newOrder = {
      products: user.cart.map(item => ({
        product: item.product,
        qty: item.qty,
        orderDate: new Date(),
        arrivalDate: new Date(new Date().setDate(new Date().getDate() + 7))
      })), 
      totalAmount,
      orderDate: new Date(),
      status: "Pending"
    };

    user.order.push(newOrder);
    user.cart = []; 

    await user.save();
    return res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getOrders = async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const user = await User.findById(userId);
    if (user) {
      return res.status(200).json({ orders: user.order });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  loginUser,
  addToCart,
  getCartItems,
  addToLike,
  getLikeItems,
  removeFromLike,
  removeFromCart,
  getUser,
  banUser,
  logoutUser,
  decrementCartItem,
  incrementCartItem,
  displayLike,
  displayCart,
  updateUser ,
  addOrder,
  getOrders,
}



