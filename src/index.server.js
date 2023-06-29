

const express = require('express');
const app=express();
const env=require("dotenv");
const port = process.env.PORT || 2345;
// const bodyParser=require("body-parser");
const path=require("path");
const mongoose=require("mongoose");
const cors = require("cors");




const userRoutes=require("./routes/auth")
const adminRoutes=require("./routes/admin/auth")
const categoryRoutes=require("./routes/category");
const productRoutes=require("./routes/product");
const cartRoutes=require("./routes/cart"); 
const initialData=require("./routes/admin/initialData.js");

app.use(cors());
app.use(express.json());
app.use("/public",express.static(path.join(__dirname,"uploads")));
// app.use(express.static(path.join(__dirname,'uploadsd')));
// app.use(bodyParser.json());
env.config();

// connection with database
// mongoose.set('strictQuery', true);
mongoose.connect(`mongodb+srv://riderAtlas:${process.env.DB_PASSWORD}@fc.qxxvaj2.mongodb.net/?retryWrites=true&w=majority`, {
    // userNewUrlParser: true, 
    useUnifiedTopology: true,
    // useCreateIndex: true,   
  })
  .then(() => {
    console.log("Database connected");
  }).catch((err)=>console.log(err));

//  mongoose.set("strictQuery",true);
app.use("/api",userRoutes);
app.use("/api",adminRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",cartRoutes);
app.use("/api",initialData);

app.listen(port,()=>{
  console.log(`server is running ${port}`);
})

  


