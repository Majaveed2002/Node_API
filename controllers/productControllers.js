const express = require("express")
const Product = require("../models/productModules")
const asyncHandler = require('express-async-handler')

const getProducts =  asyncHandler(async(req,res)=> {
  try {
    const products = await Product.find({})
    res.status(200).json(products)
    
  } catch (error) {
    res.status(500)
    throw new Error(error.message)
  }
})

const getProduct = asyncHandler( async (req,res) => {
  try {
    const {id} = req.params
    const product = await Product.findById(id)
    res.status(200).json(product)
  } catch (error) {
    res.status(500)
    throw new Error(error.message)
  }
})

const updatedProduct = asyncHandler(async (req,res) => {
  try {
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id,req.body)
    if(!product){
      res.status(404)
    throw new Error(`Cannot Find Any Product With ID ${id}`)
    }
    const updatedProduct = await Product.findById(id)
    res.status(200).json(updatedProduct)
  }
  catch (error) {
    res.status(500)
    throw new Error(error.message)
  }
})

const addProduct = asyncHandler(async(req,res)=> {
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product)
  } catch (error) {
    res.status(500)
    throw new Error(error.message)
  }
})

const deleteProduct = asyncHandler(async (req,res) => {
  try {
    const {id} = req.params
    const product = await Product.findByIdAndDelete(id)
    if(!product){
      res.status(404)
    throw new Error(`Cannot Find Any Product With ID ${id}`)
    }
    res.status(200).json({message: `The ${product.name} Product was Deleted From Database`})
  } catch (error) {
    res.status(500)
    throw new Error(error.message)
  }
})

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updatedProduct,
  deleteProduct
  
}