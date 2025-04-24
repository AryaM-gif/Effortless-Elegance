import React, { useState, useEffect, useContext } from "react";
// import "../style/Bag.css"; 
import { myContext } from "./context";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaCartArrowDown, FaTrashAlt } from 'react-icons/fa';
import StyleSatchel from "../components/StyleSatchel.png";
import { BsFillCartPlusFill } from "react-icons/bs";
import { BsCartCheckFill } from "react-icons/bs";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { FaFacebook, FaInstagramSquare, FaLinkedin, FaYoutube, FaPinterestSquare } from "react-icons/fa";
import { MdPersonPin } from "react-icons/md";
import { BsCartPlus } from "react-icons/bs";
const Bag = () => {
  const { products, getProducts } = useContext(myContext);
  const [cart, setCart] = useState([]);
  const [Like, setLike] = useState([]);
  const [filterprod, setFilterProd] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userID");

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setFilterProd(products);
  }, [products]);

  useEffect(() => {
    fetchCartItems();
  }, [userId]);

  useEffect(() => {
    displayLike();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/getcartitems?userId=${userId}`);
      setCart(response.data.userCart);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    displayLike();
  }, []);

  const displayLike = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/getLikeitems?userId=${userId}`
      );
      console.log("Fetched like items:", response.data.userlike);
      setLike(response.data.userlike || []); // Ensure fallback to empty array if null
    } catch (error) {
      console.error("Error fetching liked products:", error);
    }
  };

  const handelAddtoCart = async (event, product) => {
    event.stopPropagation();

    if (!token) {
      alert('Please login first before adding items to the cart.');
      navigate('/');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/user/addtocart',
        { userId, product }
      );
      console.log('Response data:', response.data);
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
      navigate('/');
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
      console.log('Response data:', response.data);
      setCart(prevCart => prevCart.filter(item => item.product._id !== productId));
      alert('Item removed from cart successfully!');
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
      setLike(prevLike => prevLike.filter(item => item.product._id !== productId));
      alert("Item removed from Like successfully!");
    } catch (error) {
      console.error("Error removing item from like:", error);
      alert("Error removing item from Like. Please try again.");
    }
  };

  const isLiked = (productId) => {
    return Like.some(item => item.product._id === productId);
  };

  const handleDisplay = (id) => {
    navigate(`/display/${id}`);
  };

  const handleSearchInput = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
    setFilterProd(filteredProducts);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userID");
    navigate("/");
    window.location.reload();
  };

  const totalCartItems = new Set(cart.map(item => item.product._id)).size;
  const totalLikeItems = new Set(Like.map(item => item.product._id)).size;

  return (
    <div>
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
          <h3 className="headline"> PRODUCT LIST </h3>
        </div>
        <div className="buttons-container-cart">
          <Link to={"/like"}>
            <button className="home-button">
              <AiFillHeart /> Likes
              ({totalLikeItems})
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
      <div>
        <input className="search" type="text" name="search" value={searchQuery} onChange={handleSearchInput} placeholder="Search..." />
      </div>
      <div className="product-container">
        {filterprod.map(product => (
          <div className="product-card" key={product.id}>
            <img
              src={product.image1}
              alt={product.name}
              onClick={() => handleDisplay(product.id)}
            />
            <h5>{product.name}</h5>
            <h4>Rs: {product.price}</h4>
            <button onClick={(event) => {
              cart.some(cartItem => cartItem.product._id === product._id)
                ? removeFromCart(event, product._id)
                : handelAddtoCart(event, product);
            }}>
              {cart.some(cartItem => cartItem.product._id === product._id) ? (
                <>
                  <BsCartCheckFill />
                </>
              ) : (
                <>
                <BsCartPlus />
                 </>
              )}
            </button>
            <button onClick={(event) => {
              isLiked(product._id)
                ? removeFromLike(event, product._id)
                : handelAddtoLike(event, product);
            }}>
              {isLiked(product._id) ? <FcLike /> : <FcLikePlaceholder />}
            </button>
          </div>
        ))}
      </div>
      <footer className="footerFOTTER">
        <div className="social-mediaFOTTER">
          <h2>Follow Us</h2>
          <ul className="icons-listFOTTER">
            <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a></li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagramSquare /></a></li>
            <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a></li>
            <li><a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a></li>
            <li><a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer"><FaPinterestSquare /></a></li>
          </ul>
        </div>
        <div className="footer-textFOTTER">
          <div className="footer-linksFOTTER">
            <div className="footer-sectionFOTTER">
              <h3>Explore</h3>
              <ul>
                <li><a href="#">HOME</a></li>
                <li><a href="/products/Clutch" onClick={() => handleCategoryView(category)}>Clutch</a></li>
                <li><a href="/products/Backpack" onClick={() => handleCategoryView(category)}>Backpack</a></li>
                <li><a href="/products/Travel Bag" onClick={() => handleCategoryView(category)}>Travel Bag</a></li>
                <li><a href="/products/Shoulder Bag" onClick={() => handleCategoryView(category)}>Shoulder Bag</a></li>
                {/* <li><a href="#">MAISHA TRIBE</a></li> */}
              </ul>
            </div>
            <div className="footer-sectionFOTTER">
              <h3>Info</h3>
              <ul>
                <li><a href="#">BLOGS</a></li>
                <li><a href="#">ABOUT US</a></li>
                <h3>Help</h3>
                <ul>
                  <li><a href="#">FAQs</a></li>
                  <li><a href="#">POLICIES</a></li>
                  <li><a href="#">HELP DESK</a></li>
                  <li><a href="#">RETURNS/ EXCHANGE</a></li>
                </ul>
              </ul>
            </div>
            <div className="footer-sectionFOTTER">

            </div>
            <div className="footer-contactFOTTER">
              <h3>Effortless Elegance</h3>
              <p>	49 Featherstone Street ,LONDON,EC1Y 8SY,UNITED KINGDOM</p>
              <p>Studio is open between Monday to Saturday : 11 AM till 6:30 PM</p>
              {/* <p>Only for Studio Enquiries +917065896155</p> */}
              <p>For online queries reach out to us on +9192596325741 or care@effortlesselegance.com from Monday to Saturday between 10:30 AM till 5:30 PM</p>
              {/* <p>Subscribe to our newsletter and stay updated with the latest offers and new collection launch.</p> */}
              <div className="newsletterFOTTER">
                <input type="email" placeholder="Enter your email" />
                <button>Subscribe</button>
              </div>
            </div>
          </div>

        </div>
        <div className="footer-bottomFOTTER">
          <p>&copy; 2023 Effortless Elegance</p>
          <p>Privacy Policy | Terms of Use | Sales and Refunds | Legal | Site Map</p>
        </div>
      </footer>
    </div>
  );
};

export default Bag;
7