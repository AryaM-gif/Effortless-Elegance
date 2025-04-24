import { useParams } from "react-router-dom";
import { myContext } from "./context";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { Link } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import { AiFillHeart } from 'react-icons/ai';
import { BsFillCartPlusFill, BsCartCheckFill } from "react-icons/bs";
import axios from 'axios';
import { FaFacebook, FaInstagramSquare, FaLinkedin, FaYoutube, FaPinterestSquare } from "react-icons/fa";
import { MdPersonPin } from "react-icons/md";
import "../style/Dis.css";
import StyleSatchel from "../components/StyleSatchel.png";

export default function DisplayBag() {
  const nav = useNavigate();
  const { id } = useParams();
  const { products } = useContext(myContext);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [cart, setCart] = useState([]);
  const [like, setLike] = useState([]);

  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userID");

  const product = products.find((product) => product.id === id);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/getcartitems?userId=${userId}`);
        setCart(response.data.userCart);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, [userId]);

  useEffect(() => {
    const displayLike = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/getLikeitems?userId=${userId}`
        );
        setLike(response.data.userlike || []);
      } catch (error) {
        console.error("Error fetching liked products:", error);
      }
    };
    displayLike();
  }, [userId]);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleImageClick = (image) => {
    setZoomedImage(image);
  };

  const handleCloseZoom = () => {
    setZoomedImage(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userID");
    window.location.reload();
  };

  const totalCartItems = new Set(cart.map(item => item.product._id)).size;
  const totalLikeItems = new Set(like.map(item => item.product._id)).size;

  const handelAddtoCart = async (event, product) => {
    event.stopPropagation();

    if (!token) {
      alert('Please login first before adding items to the cart.');
      nav('/');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/user/addtocart',
        { userId, product }
      );
      setCart(prevCart => [...prevCart, { product }]);
      alert('Item added to cart successfully!');
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('Error adding item to cart. Please try again.');
    }
  };

  const handelAddtoLike = async (event, product) => {
    event.stopPropagation();
    if (!token) {
      alert('Please login first before adding items to the like.');
      nav('/');
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/addtoLike",
        { product, userId }
      );
      console.log("Response data:", response.data);
      localStorage.setItem("authToken", response.data.authToken);
      alert("Item added to Like successfully!");
      setLike(prevLike => [...prevLike, { product }]);
    } catch (error) {
      console.error("Error adding item to like:", error);
      if (error.response && error.response.status === 400 && error.response.data.message === "Product is already liked") {
        alert("This product is already liked.");
      } else {
        alert("Error adding item to Like. Please try again.");
      }
    }
  };


  const removeFromCart = async (event, productId) => {
    event.stopPropagation();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/user/removefromcart',
        { userId, productId }
      );
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
      setLike(prevLike => prevLike.filter(item => item.product._id !== productId));
    } catch (error) {
      console.error("Error removing item from like:", error);
      alert("Error removing item from like. Please try again.");
    }
  };

  const isLiked = (productId) => {
    return like.some(item => item.product._id === productId);
  };

  return (
    <div>
      <div key={product.id}>
        <div className="home-containerCart">
        {token && (
          <div className="user-icon-container">
            <Link to="/profile">
              <MdPersonPin className="user-icon" />
            </Link>
          </div>
        )}
          <div className="logo-containerCart">
            <img src={StyleSatchel} alt="Logo" className="logoCart" />
          </div>
          <div className="headline-container-cart">
            <h3 className="headline">{product.name}</h3>
          </div>
          <div className="buttons-container">
          <Link to={"/bag"}>
          <button className="home-button">Shop More</button>
        </Link>  
            <Link to={"/like"}>
              <button className="home-button">
                <AiFillHeart /> Likes ({totalLikeItems})
              </button>
            </Link>
            <Link to={"/cart"}>
              <button className="home-button">
                <FaCartArrowDown /> Cart ({totalCartItems})
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
      </div>
      <div className="dis">
        <img className="imgDis" src={product.image1} alt={`${product.name} image1`} />

        <div className="Dis-notecontainer">
          <h4 className="cat">Category: {product.category}</h4>
          <p className="disnote">{product.description}</p>
          <h3 className="rs">
            <i>Rs:</i> {product.price} <br /> <span>  </span>

            <button
              className="button-dis"
              onClick={(event) => {
                cart.some(cartItem => cartItem.product._id === product._id)
                  ? removeFromCart(event, product._id)
                  : handelAddtoCart(event, product);
              }}
            >
              {cart.some(cartItem => cartItem.product._id === product._id) ? (
                <>
                  <BsCartCheckFill /> Remove from Cart
                </>
              ) : (
                <>
                  <BsFillCartPlusFill /> Add to Cart
                </>
              )}
            </button>

            <button
              className="button-dis"
              onClick={(event) => {
                isLiked(product._id)
                  ? removeFromLike(event, product._id)
                  : handelAddtoLike(event, product);
              }}
            >
              {isLiked(product._id) ? (
                <>
                  <FcLike />
                </>
              ) : (
                <>
                  <FcLikePlaceholder /> Like
                </>
              )}
            </button>

          </h3>
        </div>

        <div className="img-row">
          <img
            className={`imgDis1`}
            src={product.image2}
            alt={`${product.name} image2`}
            onClick={() => handleImageClick(product.image2)}
          />
          <img
            className={`imgDis1`}
            src={product.image3}
            alt={`${product.name} image3`}
            onClick={() => handleImageClick(product.image3)}
          />
          <img
            className="imgDis1"
            src={product.image4}
            alt={`${product.name} image4`}
            onClick={() => handleImageClick(product.image4)}
          />

        </div>
        {zoomedImage && (
          <div className="fullscreen-overlay" onClick={handleCloseZoom}>
            <img className="fullscreen-image" src={zoomedImage} alt="Zoomed" />
          </div>
        )}
      </div>
         </div>
  );
}
