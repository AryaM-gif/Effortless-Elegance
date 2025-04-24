import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../style/Payment.css'; 
import axios from 'axios';
const Payment = () => {
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userID");
  
  useEffect(() => {
    const storedTotal = localStorage.getItem('totalPrice');
    if (storedTotal) {
      setTotal(parseFloat(storedTotal));
    } else {
      navigate('/cart');
    }
  }, [navigate]);

  const handlePayment = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/user/addOrder", {
        userId,
        totalAmount: total, 
      });

      console.log("Response from server:", response.data);
  
      alert("Payment successful and order created!");
      navigate("/");
    } catch (error) {

      console.error("Payment failed:", error.response ? error.response.data : error.message);
      alert("Payment failed. Please try again.");
    }
  };
  

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h2>Payment Details</h2>
      </div>
      <form className="payment-form" onSubmit={handlePayment}>
        <div className="form-group">
          <label>Select Payment Method:</label>
          <div className="payment-options">
            <button
              type="button"
              className={`payment-option ${paymentMethod === 'cashOnDelivery' ? 'selected' : ''}`}
              onClick={() => setPaymentMethod('cashOnDelivery')}
            >
              Cash on Delivery
            </button>
            <button
              type="button"
              className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}
              onClick={() => setPaymentMethod('upi')}
            >
              Pay with UPI
            </button>
            <button
              type="button"
              className={`payment-option ${paymentMethod === 'creditCard' ? 'selected' : ''}`}
              onClick={() => setPaymentMethod('creditCard')}
            >
              Credit/Debit Card
            </button>
            <button
              type="button"
              className={`payment-option ${paymentMethod === 'netBanking' ? 'selected' : ''}`}
              onClick={() => setPaymentMethod('netBanking')}
            >
              Net Banking
            </button>
          </div>
        </div>
        {paymentMethod === 'upi' && (
          <div className="form-group">
            <label htmlFor="upiId">UPI ID:</label>
            <input type="text" id="upiId" required />
          </div>
        )}
        {paymentMethod === 'creditCard' && (
          <>
            <div className="form-group">
              <label htmlFor="cardName">Name on Card:</label>
              <input type="text" id="cardName" required />
            </div>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number:</label>
              <input type="text" id="cardNumber" required />
            </div>
            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date:</label>
              <input type="text" id="expiryDate" placeholder="MM/YY" required />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV:</label>
              <input type="text" id="cvv" required />
            </div>
          </>
        )}
        <div className="form-group total-display">
          <p>Total: ₹{total}</p>
        </div>
        <button type="submit" className="payment-button">Pay Now</button>
        <Link to="/cart">
          <button type="button" className="back-button">Back to Cart</button>
        </Link>
      </form>
    </div>
  );
};

export default Payment;
