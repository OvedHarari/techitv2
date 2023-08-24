const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const register = require("./routes/register")
const login = require("./routes/login")
const profile = require("./routes/profile")
const products = require("./routes/products")
const carts = require("./routes/carts")
const cors = require("cors")


const app = express();
const port = process.env.PORT || 5000;


mongoose.connect(process.env.DB, {useNewUrlParser: true})
.then(()=> console.log("MongoDB connected successfully!!!"))
.catch((err)=>console.log((err)))

app.use(express.json());
app.use(cors());
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/profile", profile);
app.use("/api/products", products);
app.use("/api/carts", carts);





app.listen(port, ()=> console.log(`Server started on port ${port}`))
