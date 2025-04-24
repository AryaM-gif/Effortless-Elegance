
import React, { useState, useEffect, useContext } from "react";
import "../style/Home.css";
import StyleSatchel from "../components/StyleSatchel.png";
import img1 from "../components/img1.png";
import img2 from "../components/img2.png";
import img3 from "../components/img3.png";
import img4 from "../components/img4.png";
import img5 from "../components/img5.png";
import { myContext } from "./context";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagramSquare, FaLinkedin, FaYoutube, FaPinterestSquare, FaCartArrowDown } from "react-icons/fa";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { FaAnglesRight } from "react-icons/fa6";
import { AiFillHeart } from 'react-icons/ai';
import { BsFillCartPlusFill } from "react-icons/bs";
import { BsCartCheckFill } from "react-icons/bs";
import { MdPersonPin } from "react-icons/md";
import { BsCartPlus } from "react-icons/bs";
import axios from 'axios';

const Home = () => {
  const nav = useNavigate();
  const [cart, setCart] = useState([]);
  const [like, setLike] = useState([]);
  const [username, setUsername] = useState(""); 
  const { products } = useContext(myContext);
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userID");
  localStorage.setItem("username", "TestUser");

  useEffect(() => {
    console.log("Products: ", products);
  }, [products]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [img1, img2, img3, img4, img5];

  useEffect(() => {
    console.log("Stored Username: ", username); 
  }, [username]);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

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
    displayLike();
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

  
  const categoriesMap = products.reduce((acc, product) => {
    const normalizedCategory = product.category.trim().toLowerCase();
    if (!acc[normalizedCategory]) {
      acc[normalizedCategory] = product.category;
    }
    return acc;
  }, {});

  const uniqueCategories = Object.values(categoriesMap);

  const handleCategoryView = (category) => {
    nav(`/products/${category}`);
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
      // if (error.response && error.response.status === 400 && error.response.data.message === "Product is already liked") {
      //   alert("This product is already liked.");
      // } else {
      //   alert("Error adding item to Like. Please try again.");
      // }
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
      setLike(prevLike => prevLike.filter(item => item.product._id !== productId));
    } catch (error) {
      console.error("Error removing item from like:", error);
      alert("Error removing item from like. Please try again.");
    }
  };

  const isLiked = (productId) => {
    return like.some(item => item.product._id === productId);
  };

  const handleDisplay = (id) => {
    nav(`/display/${id}`);
  };

  return (
    <div>
      <div className="home-container">
        {token && (
          <div className="user-icon-container">
            <Link to="/profile">
              <MdPersonPin className="user-icon" />
            </Link>
          </div>
        )}
        <div className="logo-container">
          <img src={StyleSatchel} alt="Logo" className="logo" />
        </div>
        <div className="buttons-container">
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
       
      <div className="effert">
      <h3><i>A bag that Effortlessly exudes Elegance is a timeless accessory.<br />It adds a touch of sophistication to any outfit, making you feel like a true fashion icon.</i></h3>
    

      <h2 className="bg"><b>Your Bag Journey Starts Here...</b></h2>
    
            <Link to="/bag" className="shop-link">
          <button className="shop">
            <b><i>SHOP NOW</i></b> <span></span>
            <FaAnglesRight />
          </button>
        </Link>
      </div>
      <div>
        <img className="pic" src={images[currentImageIndex]} alt="Sliding Pic" />
      </div>

      {/* Category Rows */}
      <div className="categories-container">
        {uniqueCategories.map(category => (
          <div key={category} className="category-row">
            <h2 className="category-title" onClick={() => handleCategoryView(category)}>
              <b className="ncat"><i>{category}</i></b>
            </h2>
            <div className="products-container">
              <div className="product-slideshow">
                {products
                  .filter(product => product.category.trim().toLowerCase() === category.trim().toLowerCase())
                  .map(product => (
                    <div key={product.id} className="product-card">
                      <img src={product.image1} alt={product.name} className="product-image" onClick={() => handleDisplay(product.id)} />
                      <h5>{product.name}</h5>
                      <p>₹{product.price}</p>
                   
                      <button
  onClick={(event) => {
    cart.some(cartItem => cartItem.product._id === product._id)
      ? removeFromCart(event, product._id)
      : handelAddtoCart(event, product);
  }}
>
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

                      <button
                        onClick={(event) => {
                          isLiked(product._id)
                            ? removeFromLike(event, product._id)
                            : handelAddtoLike(event, product);
                        }}
                      >
                        {isLiked(product._id) ? <FcLike /> : <FcLikePlaceholder />}
                      </button>
                    </div>
                  ))}
              </div>
            </div>
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
          <li><a href="/products/Clutch"  onClick={() => handleCategoryView(category)}>Clutch</a></li>
          <li><a href="/products/Backpack"  onClick={() => handleCategoryView(category)}>Backpack</a></li>
          <li><a href="/products/Travel Bag" onClick={() => handleCategoryView(category)}>Travel Bag</a></li>
          <li><a  href="/products/Shoulder Bag" onClick={() => handleCategoryView(category)}>Shoulder Bag</a></li>
          {/* <li><a href="#">MAISHA TRIBE</a></li> */}
        </ul>
      </div>
      <div className="footer-sectionFOTTER">
        <h3>Info</h3>
        <ul>
          <li><a href="#">BLOGS</a></li>
          <li><a href="/aboutus">ABOUT US</a></li>
          <h3>Help</h3>
        <ul>
          <li><a href="#">FAQs</a></li>
          <li><a href="/policies">POLICIES</a></li>
          <li><a href="/helpDesk">HELP DESK</a></li>
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

export default Home;
























// import React, { useState, useEffect, useContext } from "react";
// import "../style/Home.css";
// import StyleSatchel from "../components/StyleSatchel.png";
// import img1 from "../components/img1.png";
// import img2 from "../components/img2.png";
// import img3 from "../components/img3.png";
// import img4 from "../components/img4.png";
// import img5 from "../components/img5.png";
// import { myContext } from "./context"
// import { Link, useNavigate } from "react-router-dom";
// import { FaFacebook, FaInstagramSquare, FaLinkedin, FaYoutube, FaPinterestSquare, FaCartArrowDown } from "react-icons/fa";
// import { FcLike, FcLikePlaceholder } from "react-icons/fc";
// import { FaAnglesRight } from "react-icons/fa6";
// import { AiFillHeart } from 'react-icons/ai';
// import { FaShoppingBasket, FaShoppingCart } from 'react-icons/fa';
// import { BiSolidCartAdd } from "react-icons/bi";
// import { FaHeart, FaRegHeart } from "react-icons/fa";

// import axios from 'axios';

// const Home = () => {
//   const nav = useNavigate();
//   const [cart, setCart] = useState([]);
//   const [Like, setLike] = useState([]);
  
//   const { products } = useContext(myContext);
//   const token = localStorage.getItem("authToken");
//   const userId = localStorage.getItem("userID");

//   useEffect(() => {
//     console.log("Products: ", products);
//   }, [products]);

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const images = [img1, img2, img3, img4, img5];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 2000);
//     return () => clearInterval(interval);
//   }, [images.length]);

//   useEffect(() => {

//     const fetchCartItems = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/user/getcartitems?userId=${userId}`);
//         setCart(response.data.userCart);
//       } catch (error) {
//         console.error('Error fetching cart items:', error);
//       }
//     };
    
//     fetchCartItems();
//   }, [userId]); 

//   useEffect(() => {
   
//     displayLike();
//   }, []); 

//   const displayLike = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/user/getLikedProducts/${userId}`);
//       console.log("Liked products:", response.data);
//       setLike(response.data.likedProducts);
//     } catch (error) {
//       console.error("Error fetching liked products:", error);
//     }
//   };
  
//   const categoriesMap = products.reduce((acc, product) => {
//     const normalizedCategory = product.category.trim().toLowerCase();
//     if (!acc[normalizedCategory]) {
//       acc[normalizedCategory] = product.category;
//     }
//     return acc;
//   }, {});

//   const uniqueCategories = Object.values(categoriesMap);

//   const handleCategoryView = (category) => {
//     nav(`/products/${category}`);
//   };
  

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userID");
//     window.location.reload();
//   };

//   const totalCartItems = new Set(cart.map(item => item.product._id)).size;
//   const totalLikeItems =  new Set(Like.map(item => item.product._id)).size; 

//   const handelAddtoCart = async (event, product) => {
//     event.stopPropagation();

    
//     if (!token) {
//       alert('Please login first before adding items to the cart.');
//       nav('/'); 
//       return;
//     }

//     try {
//       const response = await axios.post(
//         'http://localhost:5000/api/user/addtocart',
//         { userId, product }
//       );
//       console.log('Response data:', response.data);

//       // Update frontend state to add the item to cart
//       setCart(prevCart => [...prevCart, { product }]);

//       alert('Item added to cart successfully!');
//     } catch (error) {
//       console.error('Error adding item to cart:', error);
//       alert('Error adding item to cart. Please try again.');
//     }
//   };

//   const handelAddtoLike = async (event, product) => {
//     event.stopPropagation();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/user/addtoLike",
//         { product, userId }
//       );
//       console.log("Response data:", response.data);
//       localStorage.setItem("authToken", response.data.authToken);
//       alert("Item added to Like successfully!");
//       // Update liked products list after adding
//       displayLike();
//     } catch (error) {
//       console.error("Error adding item to like:", error);
//       if (error.response && error.response.status === 400 && error.response.data.message === "Product is already liked") {
//         alert("This product is already liked.");
//       } else {
//         alert("Error adding item to Like. Please try again.");
//       }
//     }
//   };
//   // const handelAddtoLike = async (event, product) => {
//   //   event.stopPropagation();
//   //   try {
//   //     const response = await axios.post(
//   //       "http://localhost:5000/api/user/addtoLike",
//   //       {
//   //         product,
//   //         userId
//   //       }
//   //     );
//   //     console.log("Response data:", response.data);
//   //     localStorage.setItem("authToken", response.data.authToken);
//   //     alert("Item added to Like successfully!");
//   //     displayLike(); // Update liked products list after adding
//   //   } catch (error) {
//   //     console.error("Error adding item to like:", error);
//   //     if (error.response && error.response.status === 400 && error.response.data.message === "Product is already liked") {
//   //       alert("This product is already liked.");
//   //     } else {
//   //       alert("Error adding item to Like. Please try again.");
//   //     }
//   //   }
//   // };
  
//   // const handelAddtoLike = async (event, product) => {
//   //   event.stopPropagation();
//   //   try {
//   //     const response = await axios.post(
//   //       "http://localhost:5000/api/user/addtoLike",
//   //       {
//   //         product,
//   //         userId
//   //       }
//   //     );
//   //     console.log("Response data:", response.data);
//   //     localStorage.setItem("authToken", response.data.authToken);
//   //     alert("Item added to Like successfully!");
//   //     displayLike(); // Update liked products list after adding
//   //   } catch (error) {
//   //     console.error("Error adding item to like:", error);
//   //     alert("Error adding item to Like. Please try again.");
//   //   }
//   // };

//   const removeFromCart = async (event, productId) => {
//     event.stopPropagation();
//     try {
//       const response = await axios.post(
//         'http://localhost:5000/api/user/removefromcart',
//         { userId, productId }
//       );
//       console.log('Response data:', response.data);

//       // Update frontend state to remove the item from cart
//       setCart(prevCart => prevCart.filter(item => item.product._id !== productId));

//       alert('Item removed successfully!');
//     } catch (error) {
//       console.error('Error removing item from cart:', error);
//       alert('Error removing item from cart. Please try again.');
//     }
//   };

//   const removeFromLike = async (event, productId) => {
//     event.stopPropagation();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/user/removeFromLike",
//         { productId, userId }
//       );
//       console.log("Response data:", response.data);
//       displayLike(); // Update liked products list after removing
//     } catch (error) {
//       console.error("Error removing item from like:", error);
//       alert("Error removing item from like. Please try again.");
//     }
//   };

//   const isLiked = (productId) => {
//     return Like.some(item => item.product._id === productId);
//   };
  
//   const handleDisplay = (id) => {
//     nav(`/display/${id}`);
//   };
  
//   return (
//     <div>
//       <div className="home-container">
//         <div className="logo-container">
//           <img src={StyleSatchel} alt="Logo" className="logo" />
//         </div>
//         <div className="buttons-container">
//           <Link to={"/like"}>
//             <button className="home-button">
//               <AiFillHeart /> Likes ({totalLikeItems})
//             </button>
//           </Link>
//           <Link to={"/cart"}>
//             <button className="home-button">
//               <FaCartArrowDown /> Cart ({totalCartItems})
//             </button>
//           </Link>

//           {token ? (
//             <button className="home-button" onClick={handleLogout}>
//               Logout
//             </button>
//           ) : (
//             <Link to={'/login'}>
//               <button className="home-button">
//                 Login
//               </button>
//             </Link>
//           )}
//         </div>
//       </div>
//       <div className="effert">
//         <h2 className="bg"><b>Your Bag Journey Starts Here...</b></h2>
//         <h3><i>A bag that Effortlessly exudes Elegance is a timeless accessory.<br />It adds a touch of sophistication to any outfit, making you feel like a true fashion icon.</i></h3>
//         <Link to="/bag" className="shop-link">
//           <button className="shop">
//             <b><i>SHOP NOW</i></b> <span></span>
//             <FaAnglesRight />
//           </button>
//         </Link>
//       </div>
//       <div>
//         <img className="pic" src={images[currentImageIndex]} alt="Sliding Pic" />
//       </div>

//       {/* Category Rows */}
//       <div className="categories-container">
//         {uniqueCategories.map(category => (
//           <div key={category} className="category-row">
//             <h2 className="category-title" onClick={() => handleCategoryView(category)}>
//               <b className="ncat"><i>{category}</i></b>
//             </h2>
//             <div className="products-container">
//               <div className="product-slideshow">
//                 {products
//                   .filter(product => product.category.trim().toLowerCase() === category.trim().toLowerCase())
//                   .map(product => (
//                     <div key={product.id} className="product-card">
//                       <img src={product.image1} alt={product.name} className="product-image"  onClick={() => handleDisplay(product.id)} />
//                       <h5>{product.name}</h5>
//                       <p>₹{product.price}</p>
//                       <button
//                         onClick={(event) => {
//                           cart.some(cartItem => cartItem.product._id === product._id)
//                             ? removeFromCart(event, product._id)
//                             : handelAddtoCart(event, product);
//                         }}
//                       >
//                         {cart.some(cartItem => cartItem.product._id === product._id) ? <BiSolidCartAdd /> : "Add to cart"}
//                       </button>
//                       {/* <button
//                         onClick={(event) => {
//                           isLiked(product._id)
//                             ? removeFromLike(event, product._id)
//                             : handelAddtoLike(event, product);
//                         }}
//                       >
//                         {isLiked(product._id) ? 
//                         // <FcLike /> 
//                         "Remove"
//                         : <FcLikePlaceholder />}
//                       </button> */}
//                       {isLiked(product._id) ? (
//   <button onClick={(event) => removeFromLike(event, product._id)}>
//     Remove
//   </button>
// ) : (
//   <button onClick={(event) => handelAddtoLike(event, product)}>
//     <FcLikePlaceholder />
//   </button>
// )}
//                     </div>
//                   ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <footer className="footerFOTTER">
//   <div className="social-mediaFOTTER">
//     <h2>Follow Us</h2>
//     <ul className="icons-listFOTTER">
//       <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a></li>
//       <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagramSquare /></a></li>
//       <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a></li>
//       <li><a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a></li>
//       <li><a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer"><FaPinterestSquare /></a></li>
//     </ul>
//   </div>
//   <div className="footer-textFOTTER">
//     <div className="footer-linksFOTTER">
//       <div className="footer-sectionFOTTER">
//         <h3>Explore</h3>
//         <ul>
//           <li><a href="#">HOME</a></li>
//           <li><a href="#">Clutch</a></li>
//           <li><a href="#">Backpack</a></li>
//           <li><a href="#">Travel Bag</a></li>
//           <li><a href="#">Shoulder Bag</a></li>
//           {/* <li><a href="#">MAISHA TRIBE</a></li> */}
//         </ul>
//       </div>
//       <div className="footer-sectionFOTTER">
//         <h3>Info</h3>
//         <ul>
//           <li><a href="#">BLOGS</a></li>
//           <li><a href="#">ABOUT US</a></li>
//           <h3>Help</h3>
//         <ul>
//           <li><a href="#">FAQs</a></li>
//           <li><a href="#">POLICIES</a></li>
//           <li><a href="#">HELP DESK</a></li>
//           <li><a href="#">RETURNS/ EXCHANGE</a></li>
//         </ul>
//         </ul>
//       </div>
//       <div className="footer-sectionFOTTER">
       
//       </div>
//       <div className="footer-contactFOTTER">
//       <h3>Effortless Elegance</h3>
//       <p>	49 Featherstone Street ,LONDON,EC1Y 8SY,UNITED KINGDOM</p>
//       <p>Studio is open between Monday to Saturday : 11 AM till 6:30 PM</p>
//       {/* <p>Only for Studio Enquiries +917065896155</p> */}
//       <p>For online queries reach out to us on +9192596325741 or care@effortlesselegance.com from Monday to Saturday between 10:30 AM till 5:30 PM</p>
//       {/* <p>Subscribe to our newsletter and stay updated with the latest offers and new collection launch.</p> */}
//       <div className="newsletterFOTTER">
//         <input type="email" placeholder="Enter your email" />
//         <button>Subscribe</button>
//       </div>
//     </div>
//     </div>
   
//   </div>
//   <div className="footer-bottomFOTTER">
//     <p>&copy; 2023 Effortless Elegance</p>
//     <p>Privacy Policy | Terms of Use | Sales and Refunds | Legal | Site Map</p>
//   </div>
// </footer>


//     </div>
//   );
// };

// export default Home;