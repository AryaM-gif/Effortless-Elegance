import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../style/CreateUser.css";
import StyleSatchel from "../components/StyleSatchel.png";

function CreateUser() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/user/create", {
        name: userName,
        email: userEmail,
        password: userPassword
      });
      alert("Registration successful!");
      navigate("/login");
      setUserName('');
      setUserEmail('');
      setUserPassword('');
    } catch (error) {
      if (error.response) {
        console.log("Error data:", error.response.data);
        console.log("Error status:", error.response.status);
        console.log("Error headers:", error.response.headers);
        
        if (error.response.status === 409) { 
          const goToLogin = window.confirm("User already exists. Do you want to go to the login page?");
          if (goToLogin) {
            navigate("/login");
          }
        } else {
          alert(`Error: ${error.response.data.msg || "Registration failed"}`);
        }
      } else if (error.request) {
        console.log("Error request:", error.request);
        alert("No response received from server");
      } else {
        console.log("Error message:", error.message);
        alert("Error: " + error.message);
      }
    }
  };
  function myFunction() {
    var x = document.getElementById("psw");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  return (
    <div className="overlay-reg">
        {/* <img src={StyleSatchel} alt="Logo" className="logo" /> */}
      <div className="container-reg">
        <h4 className="title"><b>Create Account</b></h4>
        <div className="input-group-admin">
          <input 
            type="text" 
            placeholder="Name" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)} 
            className="input-admin"
          />
        </div>
        <div className="input-group-admin">
          <input 
            type="text" 
            placeholder="Email" 
            value={userEmail} 
            onChange={(e) => setUserEmail(e.target.value)} 
            className="input-admin"
          />
        </div>
        <div className="input-group-admin">
          <input 

            type="password" id="psw" 
            placeholder="Password" 
            value={userPassword} 
            onChange={(e) => setUserPassword(e.target.value)} 
            className="input-admin"
          />
        </div>
        <h6 className="ShowPass">Show Password  <input type="checkbox" onClick={myFunction}/></h6>
          
        <button onClick={register} className="button"><b><i>REGISTER</i></b></button>
      </div>
      <div className="img-login-reg"> 
        <img className="img-login-reg" src="https://i.pinimg.com/564x/4e/c3/f8/4ec3f89b5a4e1a8d4d8034b97aca3a20.jpg" alt="" />
      </div>
    </div>
  );
}

export default CreateUser;





// import { useState } from "react";
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
// import "../style/CreateUser.css";
// import StyleSatchel from "../components/StyleSatchel.png";

// function CreateUser() {
//   const [userName, setUserName] = useState("");
//   const [userEmail, setUserEmail] = useState("");
//   const [userPassword, setUserPassword] = useState("");
//   const navigate = useNavigate();

//   const register = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/api/user/create", {
//         name: userName,
//         email: userEmail,
//         password: userPassword
//       });
//       alert("Registration successful!");
//       navigate("/login");
//       setUserName('');
//       setUserEmail('');
//       setUserPassword('');
//     } catch (error) {
//       if (error.response) {
      
//         console.log("Error data:", error.response.data);
//         console.log("Error status:", error.response.status);
//         console.log("Error headers:", error.response.headers);
//         alert(`Error: ${error.response.data.msg || "Registration failed"}`);
//       } else if (error.request) {
//         console.log("Error request:", error.request);
//         alert("No response received from server");
//       } else {
//         console.log("Error message:", error.message);
//         alert("Error: " + error.message);
//       }
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(userEmail)) {
//           alert("Please enter a valid email address.");
//           return;
//         }
//   };

//   return (
//     <div className="overlay-reg">
      
//       <div className="logo-container-login">
//           <img src={StyleSatchel} alt="Logo" className="logo" />
//         </div>
//       <div className="container-reg">
        
//         <h4 className="title">Create Account</h4>
//         <div className="input-group-admin">
//           <input 
//             type="text" 
//             placeholder="Name" 
//             value={userName} 
//             onChange={(e) => setUserName(e.target.value)} 
//             className="input-admin"
//           />
//         </div>
//         <div className="input-group-admin">
//           <input 
//             type="text" 
//             placeholder="Email" 
//             value={userEmail} 
//             onChange={(e) => setUserEmail(e.target.value)} 
//             className="input-admin"
//           />
//         </div>
//         <div className="input-group-admin">
//           <input 
//             type="password" 
//             placeholder="Password" 
//             value={userPassword} 
//             onChange={(e) => setUserPassword(e.target.value)} 
//             className="input-admin"
//           />
//         </div>
//         <button onClick={register} className="button">Register</button>
//       </div>
//       <div className="img-login-reg"> </div>
//     </div>
//   );
// }

// export default CreateUser;



// import { useEffect, useState } from "react"
// import axios from 'axios'
// import { useNavigate } from "react-router-dom"




// function CreateUser() {
//   const [userName, setUserName] = useState("")
//   const [userEmail, setUserEmail] = useState("")
//   const [userPassword, setUserPassword] = useState("")
// const navigate=useNavigate()

//   const register = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/user/create",
//         {
//           name: userName,
//           email: userEmail,
//           password: userPassword
//         }
//       );
//       alert("Registration successful!")
//       navigate("/login")
//       setUserName('');
//       setUserEmail('');
//       setUserPassword('')
    
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   return (
//     <div>
//       <h4> Register</h4>
//       <input type="text" placeholder="Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
//       <input type="text" placeholder="Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
//       <input type="text" placeholder=" password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />

//       <button onClick={register}>Register</button>
//     </div>
//   )
// }
// export default CreateUser 