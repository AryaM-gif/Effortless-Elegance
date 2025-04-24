// import React, { useContext, useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import axios from 'axios';
// import { FcLike, FcLikePlaceholder } from "react-icons/fc";
// import { FaCartArrowDown } from "react-icons/fa";
// import { BiSolidCartAdd } from "react-icons/bi";
// import { AiFillHeart } from "react-icons/ai";
// import StyleSatchel from "../components/StyleSatchel.png";
// import { myContext } from "./context";

// const ViewBrandwise = () => {
//     const { products } = useContext(myContext);
//     const { brand } = useParams();
//     const navigate = useNavigate();
//     const [cart, setCart] = useState([]);
//     const [like, setLike] = useState([]);
//     const token = localStorage.getItem("authToken");
//     const userId = localStorage.getItem("userID");

//     // Filter products by brand
//     const brandProd = products.filter(item => item.category.toLowerCase() === brand.toLowerCase());

//     // Fetch liked products on component mount
//     useEffect(() => {
//         displayLike();
//     }, []);

//     // Handle logout
//     const handleLogout = () => {
//         navigate("/");
//         localStorage.removeItem("authToken");
//         localStorage.removeItem("userID");
//         window.location.reload();
//     };

//     // Total unique items in cart and like
//     const totalCartItems = new Set(cart.map(item => item.product._id)).size;
//     const totalLikeItems = new Set(like.map(item => item.product._id)).size;

//     // Add to cart functionality
//     const handelAddtoCart = async (event, product) => {
//         event.stopPropagation();
//         if (!token) {
//             alert('Please login first before adding items to the cart.');
//             navigate('/'); // Redirect to login page
//             return;
//         }

//         try {
//             const response = await axios.post(
//                 'http://localhost:5000/api/user/addtocart',
//                 { userId, product }
//             );
//             console.log('Response data:', response.data);

//             // Update frontend state to add the item to cart
//             setCart(prevCart => [...prevCart, { product }]);

//             alert('Item added to cart successfully!');
//         } catch (error) {
//             console.error('Error adding item to cart:', error);
//             alert('Error adding item to cart. Please try again.');
//         }
//     };

//     // Add to like functionality
//     const handelAddtoLike = async (event, product) => {
//         event.stopPropagation();
//         try {
//             const response = await axios.post(
//                 "http://localhost:5000/api/user/addtoLike",
//                 { product, userId }
//             );
//             console.log("Response data:", response.data);

//             // Update liked products list after adding
//             displayLike();
//             alert("Item added to Like successfully!");
//         } catch (error) {
//             console.error("Error adding item to like:", error);
//             alert("Error adding item to Like. Please try again.");
//         }
//     };

//     // Remove from cart functionality
//     const removeFromCart = async (event, productId) => {
//         event.stopPropagation();
//         try {
//             const response = await axios.post(
//                 'http://localhost:5000/api/user/removefromcart',
//                 { userId, productId }
//             );
//             console.log('Response data:', response.data);

//             // Update frontend state to remove the item from cart
//             setCart(prevCart => prevCart.filter(item => item.product._id !== productId));

//             alert('Item removed successfully from cart!');
//         } catch (error) {
//             console.error('Error removing item from cart:', error);
//             alert('Error removing item from cart. Please try again.');
//         }
//     };

//     // Remove from like functionality
//     const removeFromLike = async (event, productId) => {
//         event.stopPropagation();
//         try {
//             const response = await axios.post(
//                 "http://localhost:5000/api/user/removeFromLike",
//                 { productId, userId }
//             );
//             console.log("Response data:", response.data);

//             // Update liked products list after removing
//             displayLike();
//             alert("Item removed successfully from Like!");
//         } catch (error) {
//             console.error("Error removing item from like:", error);
//             alert("Error removing item from Like. Please try again.");
//         }
//     };

//     // Check if product is liked
//     const isLiked = (productId) => {
//         return like.some(item => item.product._id === productId);
//     };

//     // Fetch and display liked products
//     const displayLike = async () => {
//         try {
//             const response = await axios.get(
//                 `http://localhost:5000/api/user/getLikedProducts/${userId}`
//             );
//             console.log("Liked products:", response.data);
//             setLike(response.data.likedProducts);
//         } catch (error) {
//             console.error("Error fetching liked products:", error);
//         }
//     };

//     // Navigate to product display page
//     const handleDisplay = (id) => {
//         navigate(`/display/${id}`);
//     };

//     return (
//         <div>
//             <div className="home-containerLike">
//                 <div className="logo-containerLike">
//                     <img src={StyleSatchel} alt="Logo" className="logoLike" />
//                 </div>
//                 <div className="headline-container-Like">
//                     <h3 className="headline">Products from {brand}</h3>
//                 </div>
//                 <Link to={"/bag"}>
//                     <button className="home-button">
//                         Shop More
//                     </button>
//                 </Link>
//                 <div className="buttons-container-Like">
//                     <Link to={"/like"}>
//                         <button className="home-button">
//                             <AiFillHeart /> Likes
//                              {/* ({totalLikeItems}) */}
//                         </button>
//                     </Link>
//                     <Link to={"/cart"}>
//                         <button className="home-button">
//                             <FaCartArrowDown />  Cart 
//                             {/* ({totalCartItems}) */}
//                         </button>
//                     </Link>
//                     {token ? (
//                         <button className="home-button" onClick={handleLogout}>
//                             Logout
//                         </button>
//                     ) : (
//                         <Link to={'/login'}>
//                             <button className="home-button">
//                                 Login
//                             </button>
//                         </Link>
//                     )}
//                 </div>
//             </div>
//             <div className="product-container">
//                 {brandProd.map(product => (
//                     <div className="product-card" key={product.id} onClick={() => handleDisplay(product.id)}>
//                         <img src={product.image1} alt={product.name} />
//                         <h5>{product.name}</h5>
//                         <h4>Rs: {product.price}</h4>
//                         <button onClick={(event) => cart.some(item => item.product._id === product._id)
//                             ? removeFromCart(event, product._id)
//                             : handelAddtoCart(event, product)}>
//                             {cart.some(item => item.product._id === product._id) ? <BiSolidCartAdd /> : "Add to cart"}
//                         </button>
//                         <button className="LikeB" onClick={(event) => isLiked(product._id)
//                             ? removeFromLike(event, product._id)
//                             : handelAddtoLike(event, product)}>
//                             {isLiked(product._id) ? <FcLike className="heart" /> : <FcLikePlaceholder className="heart" />}
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ViewBrandwise;



import React, { useContext, useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { FaCartArrowDown } from "react-icons/fa";
import { BiSolidCartAdd } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import StyleSatchel from "../components/StyleSatchel.png";
import { myContext } from "./context";
import { TbShoppingCartX } from "react-icons/tb";
import { BsFillCartPlusFill } from "react-icons/bs";
import { BsCartCheckFill } from "react-icons/bs";
import { FaFacebook, FaInstagramSquare, FaLinkedin, FaYoutube, FaPinterestSquare } from "react-icons/fa";
import { MdPersonPin } from "react-icons/md";
import { BsCartPlus } from "react-icons/bs";
const ViewBrandwise = () => {
    const { products } = useContext(myContext);
    const { brand } = useParams();
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [like, setLike] = useState([]);
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userID");

    const brandProd = products.filter(item => item.category.toLowerCase() === brand.toLowerCase());


    useEffect(() => {
        localStorage.setItem("like", JSON.stringify(like));
    }, [like]);

    useEffect(() => {
        displayLike();
    }, []);

    const handleLogout = () => {
        navigate("/");
        localStorage.removeItem("authToken");
        localStorage.removeItem("userID");
        window.location.reload();
    };

    const totalCartItems = new Set(cart.map(item => item.product._id)).size;
    const totalLikeItems = new Set(like.map(item => item.product._id)).size;

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/user/getcartitems?userId=${userId}`);
            setCart(response.data.userCart);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    useEffect(() => {
        fetchCartItems();
        const storedLike = localStorage.getItem("like");
        if (storedLike) {
            setLike(JSON.parse(storedLike));
        } else {
            displayLike();
        }
    }, [userId]);

    const handelAddtoCart = async (event, product) => {
        event.stopPropagation();
        if (!token) {
            alert('Please login first before adding items to the cart.');
            navigate('/');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/user/addtocart', { userId, product });
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
            const response = await axios.post('http://localhost:5000/api/user/removefromcart', { userId, productId });
            setCart(prevCart => prevCart.filter(item => item.product._id !== productId));
            alert('Item removed successfully from cart!');
        } catch (error) {
            console.error('Error removing item from cart:', error);
            alert('Error removing item from cart. Please try again.');
        }
    };

    const removeFromLike = async (event, productId) => {
        event.stopPropagation();
        try {
            const response = await axios.post("http://localhost:5000/api/user/removeFromLike", { productId, userId });
            setLike(prevLike => prevLike.filter(item => item.product._id !== productId));
            alert("Item removed successfully from Like!");
        } catch (error) {
            console.error("Error removing item from like:", error);
            alert("Error removing item from Like. Please try again.");
        }
    };

    const isLiked = (productId) => {
        return like.some(item => item.product._id === productId);
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



    const handleDisplay = (id) => {
        navigate(`/display/${id}`);
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
                    <h3 className="headline">Products from {brand}</h3>
                </div>
                <Link to={"/bag"}>
                    <button className="home-button">
                        Shop More
                    </button>
                </Link>
                <div className="buttons-container-Like">
                    <Link to={"/like"}>
                        <button className="home-button">
                            <AiFillHeart /> Likes
                            ({totalLikeItems})
                        </button>
                    </Link>
                    <Link to={"/cart"}>
                        <button className="home-button">
                            <FaCartArrowDown />  Cart ({totalCartItems})
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
                {brandProd.map(product => (
                    <div className="product-card" key={product.id} onClick={() => handleDisplay(product.id)}>
                        <img src={product.image1} alt={product.name} />
                        <h5>{product.name}</h5>
                        <h4>Rs: {product.price}</h4>
                        <button onClick={(event) => cart.some(item => item.product._id === product._id)
                            ? removeFromCart(event, product._id)
                            : handelAddtoCart(event, product)}>
                            {cart.some(cartItem => cartItem.product._id === product._id) ? (
                                <>
                                    <BsCartCheckFill />
                                </>
                            ) : (
                                <>
                                    <BsCartPlus />
                                </>
                            )}    </button>
                        <button className="LikeB" onClick={(event) => isLiked(product._id)
                            ? removeFromLike(event, product._id)
                            : handelAddtoLike(event, product)}>
                            {isLiked(product._id) ? <FcLike className="heart" /> : <FcLikePlaceholder className="heart" />}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewBrandwise;
