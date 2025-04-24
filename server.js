const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const prodRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const adminRouter = require('./routes/adminRoutes')


const port = 5000; 
const app = express();

app.use(cors({
    origin: "http://localhost:3001", 
    methods: ["GET", "POST", "HEAD", "PUT", "DELETE", "OPTIONS"], 
    credentials: true 
}));

app.use(express.json());
app.use(bodyParser.json());

connectDB();

app.use("/api/products", prodRouter);
app.use("/api/user", userRouter);
app.use("/api/admin",adminRouter)

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});



// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const connectDB = require("./config/db");
// const prodRouter = require("./routes/productRoutes");
// const userRouter = require("./routes/userRoutes");

// const port = 5000; 
// const app = express();


// app.use(cors({
//     origin: "http://localhost:3001", 
//     methods: "GET, POST,HEAD, PUT, DELETE, OPTIONS", 
//     credentials: true 
// }));

// app.use(express.json());
// app.use(bodyParser.json());

// connectDB();

// app.use("/api/products", prodRouter);
// app.use("/api/user", userRouter);

// app.listen(port, () => {
//     console.log(`Server running at port ${port}`);
// });
