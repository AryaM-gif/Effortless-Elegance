const Admin = require("../models/adminSchema")
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');


const adminReg=async (req,res)=>{
  try {
    const {username,password}=req.body
    const hashedPassword=await bcrypt.hash(password,10)

    const adminuser=await Admin.findOne({username}) 
if(adminuser)
    {
    return res.send("Already registered as admin")
  }else{
    const admin=new Admin({username,password:hashedPassword})
    await admin.save()
    res.send("Admin Registered successfully")
  }
  } catch (error) {
    console.log(error);
  }
}

const login = async (req, res) => {
  const { username, password } = req.body;
  {console.log('Username:', username);
  console.log('Password:', password);}
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
  
  module.exports = {
   adminReg, 
   login,
  };