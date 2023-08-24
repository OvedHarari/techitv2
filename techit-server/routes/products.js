const express = require("express");
const router = express.Router();
const joi = require("joi");
const Product = require("../models/Product");
const auth = require("../middlewares/auth");


const productSchema = joi.object({
name: joi.string().required().min(2),
price: joi.number().required(),
category: joi.string().required().min(2),
description: joi.string().required().min(2),
image: joi.string().required().min(2),
});



//GET all products
router.get("/", auth, async (req,res)=>{
    try {
        const products = await Product.find();
        res.status(200).send(products)
    } catch (error) {
        res.status(400).send(error);
    }
});

//GET product by _id
router.get("/:_id", auth, async (req,res)=>{
    try {
        const product = await Product.findById({_id: req.params._id});
        res.status(200).send(product)
    } catch (error) {
        res.status(400).send(error);
    }
});

//Add product by admin only
router.post("/",auth, async (req,res)=>{

        try {
            if(!req.payload.isAdmin) 
            return  res.status(400).send("Only Admin is alloud to add products")
                        
            //joi validation
            const {error} = productSchema.validate(req.body);
            if(error) return res.status(400).send(error);

            //check if product exist by name price and category
            let product = await Product.findOne({name: req.body.name, price: req.body.price, category: req.body.category});
            if(product) return res.status(400).send("Product already exist");

            //Add the new product and save
            product = new Product(req.body);
            product.save();
            //return response
            res.status(201).send(`Product "${product.name}" was added successfully.`);
        
        } catch (error) {
            res.status(400).send(error)
        }
})

//Update product by _id if admin only
router.put("/:_id",auth, async (req,res)=>{

        try {
            if(!req.payload.isAdmin) 
            return  res.status(400).send("Only Admin is alloud to add products")
            //joi validation
            const {error} = productSchema.validate(req.body);
            if(error) return res.status(400).send(error);

            //check if product exist by name price and category
            let product = await Product.findOneAndUpdate({_id:req.params._id}, req.body, {new: true});
            if(!product) return res.status(400).send(`Product: "${product.name}" does not exist !!`);

            //return response
            res.status(200).send(`Product "${product.name}" was updated successfully.`);
        } catch (error) {
            res.status(400).send(error)
        }
})

//Delete product by _id only if admin only
router.delete("/:_id",auth, async (req,res)=>{

        try {
            if(!req.payload.isAdmin) 
            return  res.status(400).send("Only Admin is alloud to add products")

            //check if product exist by name price and category
            let product = await Product.findOneAndDelete({_id: req.params._id});
            if(!product) return res.status(400).send("Product does not exist");

            //return response
            res.status(200).send(`Product "${product.name}" was delete successfully.`);
        } catch (error) {
            res.status(400).send(error)
        }
})

//Add number of products by admin only
router.post("/add-multiple", auth, async (req, res) => {
  try {
            if(!req.payload.isAdmin) 
            return  res.status(400).send("Only Admin is alloud to add products")
      const productsToAdd = req.body.products; // need to send an array of product objects to add

      if (!Array.isArray(productsToAdd)) {
        return res.status(400).send(`Invalid input format. send an array of product objects to add:
         {
  "products": [
    {
      "name": "",
      "price": ,
      "category": "",
      "description": "",
      "image": ""
    },
          "name": "",
      "price": ,
      "category": "",
      "description": "",
      "image": ""
    }
  ]
    }`);
      }

      const validationResults = productsToAdd.map(product =>
        productSchema.validate(product)
      );

      const validationErrors = validationResults
        .filter(result => result.error)
        .map(result => result.error.details[0].message);

      if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
      }

      const addedProducts = await Product.insertMany(productsToAdd);

      res.status(201).send(`${addedProducts.length} products added successfully.`);

  } catch (error) {
    res.status(400).send(error);
  }
});


module.exports = router;