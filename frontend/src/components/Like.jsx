
import React, { useState, useEffect, useContext } from "react";
import "../style/Like.css";
import StyleSatchel from "../components/StyleSatchel.png";
import { myContext } from "./context";
import { Link } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import axios from "axios";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BiSolidCartAdd } from 'react-icons/bi';
import { FcDislike } from "react-icons/fc";
import { FaFacebook, FaInstagramSquare, FaLinkedin, FaYoutube, FaPinterestSquare } from "react-icons/fa";
import { MdPersonPin } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Like = () => {
  const [cart, setCart] = useState([]);
  const [like, setLike] = useState([]);
  const { products } = useContext(myContext);
  const userId = localStorage.getItem("userID");
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const totalCartItems = cart.length;
  const totalLikeItems = like.length;

  useEffect(() => {
    displayLike();
    displayCart();
  }, []);

  const displayLike = async () => {
    try {
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
      const response = await axios.get(
        `http://localhost:5000/api/user/getCartItems?userId=${userId}`
      );
      console.log("Fetched cart items:", response.data.userCart);
      setCart(response.data.userCart || []); 
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };

  const handelAddtoCart = async (event, product) => {
    event.stopPropagation();
    if (!token) {
      alert('Please login first before adding items to the cart.');
      navigate('/');
      return;
    }

    if (cart.some(item => item.product._id === product._id)) {
      alert('This item is already in your cart.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/user/addtocart',
        { userId, product }
      );
      console.log('Response data:', response.data);

      // Update frontend state to add the item to cart
      setCart(prevCart => [...prevCart, { product }]);

      alert('Item added to cart successfully!');
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('Error adding item to cart. Please try again.');
    }
  };

  const removeFromCart = async (event, productId) => {
    event.stopPropagation();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/user/removefromcart',
        { userId, productId }
      );
      console.log('Response data:', response.data);

      // Update frontend state to remove the item from cart
      setCart(prevCart => prevCart.filter(item => item.product._id !== productId));

      alert('Item removed successfully!');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      alert('Error removing item from cart. Please try again.');
    }
  };

  const removeFromLike = async (event, productId) => {
    event.stopPropagation();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/removeFromLike",
        { productId, userId }
      );
      console.log("Response data:", response.data);
      displayLike(); // Update liked products list after removing
    } catch (error) {
      console.error("Error removing item from like:", error);
      alert("Error removing item from like. Please try again.");
    }
  };

  const isLiked = (productId) => {
    return like.some(item => item.product._id === productId);
  };

  const handleDisplay = (id) => {
    navigate(`/display/${id}`);
  };
  // Logout function
  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userID");
    window.location.reload();
  };

  return (
    <div>
      <div className="home-containerLike">
      {token && (
          <div className="user-icon-container">
            <Link to="/profile">
              <MdPersonPin className="user-icon" />
            </Link>
          </div>
        )}
        <div className="logo-containerLike">
          <img src={StyleSatchel} alt="Logo" className="logoLike" />
        </div>
        <div className="headline-container-Like">
          <h3 className="headline">WISH LIST</h3>
        </div>
        <Link to={"/bag"}>
          <button className="home-button">Shop More</button>
        </Link>
        <div className="buttons-container-Like">
          <Link to={"/like"}>
            <button className="home-button">
              <FcLike />
              {totalLikeItems > 0 && <span className="size">({totalLikeItems})</span>}
            </button>
          </Link>
          <Link to={"/cart"}>
            <button className="home-button">
              <FaCartArrowDown />
              {totalCartItems > 0 && <span className="size">({totalCartItems})</span>}
            </button>
          </Link>
          {token ? (
            <button className="home-button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to={'/login'}>
              <button className="home-button">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      <div className="product-container">
        {like.length === 0 ? (
          <div className="empty-like-message">
            <p>Your wishlist is empty.</p>
            <img
              className="imgcl like-imgcl"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkd8JhazhXfup_HbQMAKvFAaAj8EiaH7mzMDG6K5wvH2ruf7vokTzQc5VzNVsj4gPHu_E&usqp=CAU"
              alt="Alternative text for the image"
            />
          </div>
        ) : (
          like.map((item, index) => (
            <div key={index} className="product-card" onClick={() => handleDisplay(item.product.id)} >
              {item.product && (
                <>
                  <img
                    src={item.product.image1}
                    alt={item.product.name}
                    className="product-image"
                  />
                  <h5>{item.product.name}</h5>
                  <h4>Rs: {item.product.price}</h4>
                  <button
                    onClick={(event) => {
                      cart.some(cartItem => cartItem.product._id === item.product._id)
                        ? removeFromCart(event, item.product._id)
                        : handelAddtoCart(event, item.product);
                    }}
                  >
                    {cart.some(cartItem => cartItem.product._id === item.product._id) ? <BiSolidCartAdd /> : "Add to cart"}
                  </button>
                  <button
                    onClick={(event) => {
                      isLiked(item.product._id)
                        ? removeFromLike(event, item.product._id)
                        : handelAddtoCart(event, item.product);
                    }}
                  >
                    {isLiked(item.product._id) ? <FcDislike /> : <AiOutlineHeart />}
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
  
    </div>
  );
};

export default Like;
