const express = require("express")
const mongoose = require("mongoose")
const Product = require("./models/productModules")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get("/",(req,res)=>{
  res.send("Hello Node Api")
})

app.post("/products",async(req,res)=> {
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
  }
})

app.get("/products", async(req,res)=> {
  try {
    const products = await Product.find({})
    res.status(200).json(products)
    
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
  }
})

app.get("/products/:id", async (req,res) => {
  try {
    const {id} = req.params
    const product = await Product.findById(id)
    res.status(200).json(product)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
  }
})

app.put("/products/:id", async (req,res) => {
  try {
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id,req.body)
    if(!product){
      return res.status(404).json({message: `Cannot Find Any Product With ID ${id}`})
    }
    const updatedProduct = await Product.findById(id)
    res.status(200).json(updatedProduct)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
  }
})

app.delete("/products/:id", async (req,res) => {
  try {
    const {id} = req.params
    const product = await Product.findByIdAndDelete(id)
    if(!product){
      return res.status(404).json({message: `Cannot Find Any Product With ID ${id}`})
    }
    res.status(200).json({message: `The ${product.name} Product was Deleted From Database`})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
  }
})

mongoose.
connect("mongodb+srv://majaveedwork:Javeed786@cluster0.edzgmpw.mongodb.net/")
.then(() => {
  console.log("Connected to MongoDB")
  app.listen(3005, ()=> {
    console.log("Server Running at Port: 3005")
  })
})
.catch((error)=> {
  console.log(error)
})


