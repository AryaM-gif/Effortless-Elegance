import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../style/Login.css";
import { Link } from "react-router-dom";

function LogUser() {
  // const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", {
      
        email: userEmail,
        password: userPassword,
      });
      
      console.log("response", res.data);

      if (res.data.user.banned) {
        alert("Your account is banned. Please contact support for assistance.");
        return;
      }

      localStorage.setItem("authToken", res.data.authToken);
      localStorage.setItem("userID", res.data.user._id);


      alert("Login successful!");
      navigate("/");
      // setUserName('');
      setUserEmail('');
      setUserPassword('');

    } catch (error) {
      if (error.response) {
        console.log("Error data:", error.response.data);
        console.log("Error status:", error.response.status);
        console.log("Error headers:", error.response.headers);
        alert(`Error: ${error.response.data.error || "Login failed"}`);
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
    <div className="overlay-login">
      <div className="container-login">
        <h4 className="title-login">Member Login</h4>
        <div className="input-group-login">
          <label className="lab-login">Email:</label>
          <input
            className="input-login"
            type="email"
            placeholder="Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div className="input-group-login">
          <label className="lab-login">Password:</label>
          <input
            className="input-login"
            type="password" id="psw" 
            placeholder="Password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>
        <h6 className="ShowPass">Show Password  <input type="checkbox" onClick={myFunction}/></h6>
       
        <button className="button-login" onClick={login}>LOGIN</button> <br />
        <div className="reg-login">
          <label>Not a member?</label>
          <Link className="btm-login" to={'/create'}>
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LogUser;


// import { useEffect, useState } from "react"
// import axios from 'axios'
// import { Navigate, useNavigate } from "react-router-dom"



// function LogUser(){
//     const[userName,setUserName]=useState("")
//   const[userEmail,setUserEmail]=useState("")
//   const[userPassword,setUserPassword]=useState("")
// const navigate=useNavigate()

//     const login= async()=>{
//         try{
//           const res=await axios.post("http://localhost:5000/api/user/log",
//           {
//             name:userName,
//             // email:userEmail,
//             password:userPassword
//           }
//           )
//           console.log("response",res.data)
//           localStorage.setItem("authToken",res.data.authToken)
//           localStorage.setItem("userID",res.data.user._id)
//           alert("login sucesfull")
//           navigate("/")
//           setUserName('');
//           // setUserEmail('');
//           setUserPassword('')
//         } catch(error){
//           console.log(error);
//         }
//       }
//     return(
//       <div>
//         <h4> LOGIN</h4>
//       <input type="text" placeholder= "Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
//       {/* <input type="text" placeholder="Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} /> */}
//       <input type="text" placeholder=" password" value={userPassword} onChange={(e)=> setUserPassword(e.target.value)} />
//       <button onClick={login}>LOGIN</button>
   
//       </div>
//     )
// }
// export default LogUser
