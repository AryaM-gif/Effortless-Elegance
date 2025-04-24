// import React, { useState, useEffect, useContext } from "react";
// import "../style/Cart.css";
// import StyleSatchel from "../components/StyleSatchel.png";
// import { Link } from "react-router-dom";
// import { FaCartArrowDown } from "react-icons/fa";
// import { FcLike } from "react-icons/fc";
// import axios from "axios";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
// import { myContext } from "./context";
// import { useNavigate } from "react-router-dom";

// const Cart = () => {
//   const [cart, setCart] = useState([]);
//   const userId = localStorage.getItem("userID");
//   const { products } = useContext(myContext);
//   const [like, setLike] = useState([]);
//   const token = localStorage.getItem("authToken");
//   const navigate = useNavigate();

//   useEffect(() => {
//     displayCart();
//     displayLike();
//   }, []);
//   const totalCartItems = new Set(cart.map(item => item.product._id)).size;
//   const totalLikeItems = new Set(like.map(item => item.product._id)).size;

//   const displayCart = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/user/getcartitems?userId=${userId}`
//       );
//       setCart(response.data.userCart);
//     } catch (error) {
//       console.error("Error fetching cart items:", error);
//     }
//   };
//   const displayLike = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/user/getLikeitems?userId=${userId}`
//       );
//       console.log("Fetched like items:", response.data.userlike);
//       setLike(response.data.userlike || []); // Ensure fallback to empty array if null
//     } catch (error) {
//       console.error("Error fetching liked products:", error);
//     }
//   };
//   const handelAddtoLike = async (event, product) => {
//     event.stopPropagation();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/user/addtoLike",
//         {
//           product,
//           userId,
//         }
//       );
//       localStorage.setItem("authToken", response.data.authToken);
//       alert("Item added to Like successfully!");
//       displayLike();
//     } catch (error) {
//       console.error("Error adding item to like:", error);
//       alert("Error adding item to Like. Please try again.");
//     }
//   };

//   const removeFromCart = async (event, productId) => {
//     event.stopPropagation();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/user/removefromcart",
//         { userId, productId }
//       );
//       setCart((prevCart) =>
//         prevCart.filter((item) => item.product._id !== productId)
//       );
//       alert("Item removed successfully!");
//     } catch (error) {
//       console.error("Error removing item from cart:", error);
//       alert("Error removing item from cart. Please try again.");
//     }
//   };

//   const removeFromLike = async (event, productId) => {
//     event.stopPropagation();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/user/removeFromLike",
//         { productId, userId }
//       );
//       displayLike();
//     } catch (error) {
//       console.error("Error removing item from like:", error);
//       alert("Error removing item from like. Please try again.");
//     }
//   };

//   const isLiked = (productId) => {
//     return like.includes(productId);
//   };


//   const handleIncrement = async (event, productId) => {
//     event.stopPropagation();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/user/incrementCartItem",
//         { userId, productId }
//       );
//       setCart((prevCart) =>
//         prevCart.map((item) =>
//           item.product._id === productId
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       );
//     } catch (error) {
//       console.error("Error incrementing quantity:", error);
//       alert("Error incrementing quantity. Please try again.");
//     }
//   };

//   const handleDecrement = async (event, productId, currentQuantity) => {
//     event.stopPropagation();
//     if (currentQuantity === 1) {
//       alert("Minimum quantity reached. Remove the item instead.");
//       return;
//     }
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/user/decrementCartItem",
//         { userId, productId }
//       );
//       setCart((prevCart) =>
//         prevCart.map((item) =>
//           item.product._id === productId
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         )
//       );
//     } catch (error) {
//       console.error("Error decrementing quantity:", error);
//       alert("Error decrementing quantity. Please try again.");
//     }
//   };

//   // Calculate total price of all items in the cart
//   const calculateTotal = () => {
//     let total = cart.reduce((accumulator, item) => {
//       return accumulator + item.product.price * item.quantity;
//     }, 0);
//     return total;
//   };


//   // Logout function
//   const handleLogout = () => {
//     navigate("/");
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userID");
//     window.location.reload();
//   };

//   return (
//     <div>
//       <div className="cart-container">
//         <div className="logo-containerCart">
//           <img src={StyleSatchel} alt="Logo" className="logoCart" />
//         </div>
//         <div className="headline-container-cart">
//           <h3 className="headline">Shopping Cart</h3>
//         </div>
//         <Link to={"/bag"}>
//           <button className="home-button">Shop More</button>
//         </Link>
//         <div className="buttons-container-cart">
//           <Link to={"/like"}>
//             <button className="home-button">
//               <FcLike />
//               ({totalLikeItems})
//             </button>
//           </Link>
//           <Link to={"/cart"}>
//             <button className="home-button">
//               <FaCartArrowDown />
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
//       {cart.map((item, index) => (
//         <div key={index} className="cart-item">
//           <div className="cart-item-details">
//             <div className="cart-item-image">
//               <img src={item.product.image1} alt={item.product.name} />
//             </div>
//             <div className="cart-item-info">
//               <h4 className="cart-item-name">{item.product.name}</h4>
//               <p className="cart-item-price">₹{item.product.price}</p>
//             </div>
//           </div>
//           <div className="cart-item-actions">
//             <div className="cart-item-quantity">
//               <button
//                 className="cart-quantity-button"
//                 onClick={(event) =>
//                   handleDecrement(event, item.product._id, item.quantity)
//                 }
//               >
//                 -
//               </button>
//               <p>{item.quantity}</p>
//               <button
//                 className="cart-quantity-button"
//                 onClick={(event) => handleIncrement(event, item.product._id)}
//               >
//                 +
//               </button>
//             </div>
//             <button
//               className="cart-item-remove-button"
//               onClick={(event) => removeFromCart(event, item.product._id)}
//             >
//               Remove
//             </button>
//             <button
//               className="cart-item-like-button"
//               onClick={(event) =>
//                 isLiked(item.product._id)
//                   ? removeFromLike(event, item.product._id)
//                   : handelAddtoLike(event, item.product)
//               }
//             >
//               {isLiked(item.product._id) ? (
//                 <AiFillHeart style={{ color: "red" }} />
//               ) : (
//                 <AiOutlineHeart />
//               )}
//             </button>
//           </div>
//         </div>
//       ))}
//       <div className="total-container">
//         <p className="total-text">Total:</p>
//         <p className="total-amount">₹{calculateTotal()}</p>
//       </div>
//     </div>
//   );
// };

// export default Cart;
import React, { useState, useEffect, useContext } from "react";
import "../style/Cart.css";
import StyleSatchel from "../components/StyleSatchel.png";
import { Link } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import axios from "axios";
import { FaFacebook, FaInstagramSquare, FaLinkedin, FaYoutube, FaPinterestSquare } from "react-icons/fa";
import { MdPersonPin } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { myContext } from "./context";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const userId = localStorage.getItem("userID");
  const { products } = useContext(myContext);
  const [like, setLike] = useState([]);
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  // Define totalLikeItems state
  const [totalLikeItems, setTotalLikeItems] = useState(0);

  useEffect(() => {
    displayCart();
    displayLike();
  }, []);

  useEffect(() => {
    console.log("Cart items:", cart); 
    setTotalLikeItems(new Set(like.map(item => item.product._id)).size);
  }, [cart, like]);

  const displayCart = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/getcartitems?userId=${userId}`
      );
      if (response.data && response.data.userCart) {
        setCart(
          response.data.userCart.map(item => ({
            ...item.product,
            quantity: item.quantity || 1, 
          }))
        );
      } else {
        console.error("No cart items found in response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

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

  const handelAddtoLike = async (event, product) => {
    event.stopPropagation();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/addtoLike",
        {
          product,
          userId,
        }
      );
      localStorage.setItem("authToken", response.data.authToken);
      alert("Item added to Like successfully!");
      displayLike();
    } catch (error) {
      console.error("Error adding item to like:", error);
      alert("Error adding item to Like. Please try again.");
    }
  };

  const removeFromCart = async (event, productId) => {
    event.stopPropagation();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/removefromcart",
        { userId, productId }
      );
      setCart(prevCart =>
        prevCart.filter(item => item._id !== productId) // Filter directly on _id
      );
      alert("Item removed successfully!");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      alert("Error removing item from cart. Please try again.");
    }
  };

  const removeFromLike = async (event, productId) => {
    event.stopPropagation();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/removeFromLike",
        { productId, userId }
      );
      displayLike();
    } catch (error) {
      console.error("Error removing item from like:", error);
      alert("Error removing item from like. Please try again.");
    }
  };

  const isLiked = productId => {
    return like.some(item => item.product._id === productId);
  };

  const handleIncrement = async (event, productId) => {
    event.stopPropagation();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/incrementCartItem",
        { userId, productId }
      );
      setCart(prevCart =>
        prevCart.map(item =>
          item._id === productId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } catch (error) {
      console.error("Error incrementing quantity:", error);
      alert("Error incrementing quantity. Please try again.");
    }
  };

  const handleDecrement = async (event, productId, currentQuantity) => {
    event.stopPropagation();
    if (currentQuantity === 1) {
      alert("Minimum quantity reached. Remove the item instead.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/decrementCartItem",
        { userId, productId }
      );
      setCart(prevCart =>
        prevCart.map(item =>
          item._id === productId // Check against _id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } catch (error) {
      console.error("Error decrementing quantity:", error);
      alert("Error decrementing quantity. Please try again.");
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + (product.price * product.quantity), 0);
  };

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userID");
    window.location.reload();
  };
  const handlePaymentRedirect = () => {
    const total = calculateTotal();
    localStorage.setItem('totalPrice', total);
    navigate('/payment');
  };
  return (
    <div>
      <div className="cart-container">
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
          <h3 className="headline">Shopping Cart   </h3>
        </div>
        <Link to={"/bag"}>
          <button className="home-button">Shop More</button>
        </Link>
        <div className="buttons-container-cart">
          <Link to={"/like"}>
            <button className="home-button">
              <FcLike />
              ({totalLikeItems})
            </button>
          </Link>
          <Link to={"/cart"}>
            <button className="home-button">
              <FaCartArrowDown />
              
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
      {cart.map((item, index) => (
        <div key={index} className="cart-item" >
          <div className="cart-item-details" >
            <div className="cart-item-image">
              <img src={item.image1} alt={item.name} />
            </div>
            <div className="cart-item-info">
              <h4 className="cart-item-name">{item.name}</h4>
              <p className="cart-item-price">₹{item.price * item.quantity}</p>
            </div>
          </div>
          <div className="cart-item-actions">
            <div className="cart-item-quantity">
            <button
                className="cart-quantity-button"
                onClick={(event) => handleIncrement(event, item._id)}
              >
                +
              </button>
              <p>{item.quantity}</p>
              <button
                className="cart-quantity-button"
                onClick={(event) =>
                  handleDecrement(event, item._id, item.quantity) // Adjusted to use item._id
                }
              >
                -
              </button>
             
              
            </div>
            <button
              className="cart-item-remove-button"
              onClick={(event) => removeFromCart(event, item._id)}
            >
              Remove
            </button>
            <button
              className="cart-item-like-button"
              onClick={(event) =>
                isLiked(item._id) 
                  ? removeFromLike(event, item._id)
                  : handelAddtoLike(event, item)
              }
            >
              {isLiked(item._id) ? (
                <AiFillHeart style={{ color: "red" }} />
              ) : (
                <AiOutlineHeart />
              )}
            </button>
          </div>
        </div>
      ))}
      <div className="total-container">
        <p className="total-text">Total:</p>
        <p className="total-amount">₹{calculateTotal()}</p>
      </div>
      <button onClick={handlePaymentRedirect} className="payment-button">Check Out</button>

    </div>
  );
};

export default Cart;
