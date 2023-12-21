const express = require("express")
const Product = require("../models/productModules")

const getProducts =  async(req,res)=> {
  try {
    const products = await Product.find({})
    res.status(200).json(products)
    
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
  }
}

const getProduct = async (req,res) => {
  try {
    const {id} = req.params
    const product = await Product.findById(id)
    res.status(200).json(product)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
  }
}

const updatedProduct = async (req,res) => {
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
}

const addProduct = async(req,res)=> {
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:error.message})
  }
}

const deleteProduct = async (req,res) => {
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
}

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updatedProduct,
  deleteProduct
  
}