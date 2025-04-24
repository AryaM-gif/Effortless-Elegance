import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/AdLogin.css';

export default function AdminLogin() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/admin/login', credentials);
            console.log('Login successful:', response.data);
            navigate('/admin');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Invalid username or password');
            } else {
                setError('An error occurred. Please try again.');
            }
            console.error('Login failed:', error);
        }
    };

    return (
        <div className='admin-overlay'>
            <div className="admin-container-reg">
                <h2 className="admin-title">ADMIN LOGIN</h2>
                <form onSubmit={handleSubmit}>
                    <div className="admin-input-group">
                        <label>
                            Username:
                            <input
                                type="text"
                                name="username"
                                value={credentials.username}
                                onChange={handleInputChange}
                                required
                                className="admin-input"
                            />
                        </label>
                    </div>
                    <div className="admin-input-group">
                        <label>Password: 
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleInputChange}
                                required
                                className="admin-input"
                            />
                        </label>
                    </div>
                    {error && <p className="admin-error">{error}</p>}
                    <button type="submit" className="admin-button">Login</button>
                </form>
                <div className="admin-logo-container-login">
                    <div className="admin-img-login"></div>
                </div>
            </div>
        </div>
    );
}


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../style/AdLogin.css';

// export default function AdminLogin() {
//     const [credentials, setCredentials] = useState({ username: '', password: '' });
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setCredentials({
//             ...credentials,
//             [name]: value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5000/api/admin/login', credentials);
//             console.log('Login successful:', response.data);
//             navigate('/admin');
//         } catch (error) {
//             if (error.response && error.response.status === 401) {
//                 setError('Invalid username or password');
//             } else {
//                 setError('An error occurred. Please try again.');
//             }
//             console.error('Login failed:', error);
//         }
//     };

//     return (
//         <div className='admin-bac'>
//             <br /><br /><br />
//             <div className="admin-login-container">
//                 <h2>ADMIN LOGIN</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div>
//                         <label>
//                             Username:
//                             <input
//                                 type="text"
//                                 name="username"
//                                 value={credentials.username}
//                                 onChange={handleInputChange}
//                                 required
//                                 className="admin-input"
//                             />
//                         </label>
//                     </div>
//                     <div>
//                         <label>Password: 
//                             <input
//                                 type="password"
//                                 name="password"
//                                 value={credentials.password}
//                                 onChange={handleInputChange}
//                                 required
//                                 className="admin-input"
//                             />
//                         </label>
//                     </div>
//                     {error && <p className="admin-error">{error}</p>}
//                     <button type="submit" className="admin-button">Login</button>
//                 </form>
//             </div>
//         </div>
//     );
// }


// import { useState } from "react";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import "../style/AdLogin.css";
// import { Link } from "react-router-dom";

// function AdminLogin() {
//   const [username, setUsername] = useState("");
//   const [useremail, setUserEmail] = useState("");
//   const [userPassword, setUserPassword] = useState("");
//   const navigate = useNavigate();

//   const login = async () => {
//     try {
//       if (username !== "123" || useremail !== "123" || userPassword !== "123") {
//         alert("Invalid credentials. Only authorized person can login..");
//         return;
//       }

//       localStorage.setItem("authToken", mockResponse.authToken);
//       localStorage.setItem("userID", mockResponse.user._id);
//       alert("Login successful!");
//       navigate("/admin");
//       setUserPassword('');
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("Login failed. Please try again.");
//     }
//   };

//   return (
//     <div className="adlogin-overlay">
//       <div className="adlogin-container">
//         <h4 className="adlogin-title">Admin Login</h4>
//         <div className="adlogin-input-group">
//           <label className="adlogin-label">Name:</label>
//           <input
//             className="adlogin-input"
//             type="text"
//             placeholder="Name"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div className="adlogin-input-group">
//           <label className="adlogin-label">Email:</label>
//           <input
//             className="adlogin-input"
//             type="email"
//             placeholder="Email"
//             value={useremail}
//             onChange={(e) => setUserEmail(e.target.value)}
//           />
//         </div>
//         <div className="adlogin-input-group">
//           <label className="adlogin-label">Password:</label>
//           <input
//             className="adlogin-input"
//             type="password"
//             placeholder="Password"
//             value={userPassword}
//             onChange={(e) => setUserPassword(e.target.value)}
//           />
//         </div>
//         <button className="adlogin-button" onClick={login}>LOGIN</button>
//         <br />
      
//       </div>
//     </div>
//   );
// }

// export default AdminLogin;
