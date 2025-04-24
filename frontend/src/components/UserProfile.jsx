import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/UserProfile.css';

const UserProfile = () => {
  const [cart, setCart] = useState([]);
  const [like, setLike] = useState([]);
  const [orders, setOrders] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [activeTab, setActiveTab] = useState('cart');
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userID");
  const nav = useNavigate();

  useEffect(() => {
    if (!token) {
      nav('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:5000/api/user/getUser`, {
          params: { userId }
        });
        const user = userResponse.data.find(u => u._id === userId);
        setUsername(user.username);
        setEmail(user.email);
        setPassword(user.password);

        setFormData({
          username: user.username,
          email: user.email,
          password: user.password
        });

        const cartResponse = await axios.get(`http://localhost:5000/api/user/getCartItems`, {
          params: { userId }
        });
        console.log("Cart response:", cartResponse.data);
        setCart(cartResponse.data.userCart || []);

        const likeResponse = await axios.get(`http://localhost:5000/api/user/getLikeitems`, {
          params: { userId }
        });
        console.log("Like response:", likeResponse.data);
        setLike(likeResponse.data.userlike || []);

        const ordersResponse = await axios.get(`http://localhost:5000/api/user/getOrders`, {
          params: { userId }
        });
        console.log("Orders response:", ordersResponse.data);
        setOrders(ordersResponse.data.orders || []);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId, token, nav]);

  const handleEditClick = () => {
    if (window.confirm("Are you sure you want to edit your details?")) {
      setIsEditing(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/user/updateUser`, {
        userId, email,
        ...formData
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('Update response:', response);

      if (response.status === 200) {
        setUsername(formData.username);
        setEmail(formData.email);
        setPassword(formData.password);
        setIsEditing(false);
      } else {
        console.error('Failed to update user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      username,
      email,
      password,
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="userpro-profile-container">
      <h1>User Profile</h1>
      <div className="userpro-info">
        {isEditing ? (
          <div className="userpro-edit-form">
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </label>
            <div className="userpro-edit-buttons-pro">
              <button onClick={handleSave} className="userpro-save-button-pro">Save</button>
              <button onClick={handleCancel} className="userpro-cancel-button-pro">Cancel</button>
            </div>
          </div>
        ) : (
          < div >
            <h3>Username: {username} </h3>
            <h3>Email: {email}</h3>
            {/* <h4>Password: {'.'.repeat(password.length)}</h4> Show password as dots */}
            {/* <button onClick={handleEditClick} className="userpro-edit-button">Edit</button> */}
          </div>
        )}
      </div>
      <div className="userpro-tab-buttons">
        <button onClick={() => handleTabChange('cart')} className={`userpro-tab-button ${activeTab === 'cart' ? 'active' : ''}`}>  <b>Cart</b> </button>
        <button onClick={() => handleTabChange('like')} className={`userpro-tab-button ${activeTab === 'like' ? 'active' : ''}`}>  <b>Liked Items</b></button>
        <button onClick={() => handleTabChange('orders')} className={`userpro-tab-button ${activeTab === 'orders' ? 'active' : ''}`}>Orders</button>
      </div>
      {activeTab === 'cart' && (
        <div className="userpro-cart-section">
          <h2>Cart Items</h2>
          {cart && cart.length > 0 ? (
            <ul>
              {cart.map(item => (
                <li key={item.product._id} className="userpro-product-item">
                  <img src={item.product.image1} alt={item.product.name} className="userpro-product-image" />
                  <div className="userpro-product-details">
                    <h5>{item.product.name}</h5>
                    <h4>${item.product.price}</h4>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="userpro-no-items">No items in cart.</p>
          )}
        </div>
      )}
      {activeTab === 'like' && (
        <div className="userpro-like-section">
          <h2>Liked Items</h2>
          {like && like.length > 0 ? (
            <div>
              {like.map(item => (
                <div key={item.product._id} className="userpro-product-item">
                     <div className="userpro-product-details">
                     <img src={item.product.image1} alt={item.product.name} className="userpro-product-image" />
               
                    <h5>{item.product.name}</h5>
                    <h4>${item.product.price}</h4>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="userpro-no-items">No liked items.</p>
          )}
        </div>
      )}
      {activeTab === 'orders' && (
        <div className="userpro-orders-section">
          <h2>Orders</h2>
          {orders && orders.length > 0 ? (
            <ul>
              {orders.map((order, index) => (
                <li key={index} className="userpro-order-item">
                  {/* <h4>Order {index + 1}</h4> */}
                  {/* <h5>Products:</h5> */}
                  <ul>
                    {order.products.map((item, idx) => (
                      <li key={idx} className="userpro-order-product-item">
                        <img src={item.product.image1} alt={item.product.name} className="userpro-order-product-image" />
                        <div className="userpro-order-product-details">
                          <p >Name: {item.product.name}</p>
                          <p>Price: ${item.product.price}</p>
                          <p>Order Date: {formatDate(item.orderDate)}</p>
                          <p>Estimated Arrival Date: {formatDate(item.arrivalDate)}</p>
                          {/* <p>Quantity: {item.qty}</p> */}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <h4>Total Amount: ${order.totalAmount}</h4>
                </li>
              ))}
            </ul>
          ) : (
            <p className="userpro-no-orders">No orders placed.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
