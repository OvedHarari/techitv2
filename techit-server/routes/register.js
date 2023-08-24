const express = require("express");
const router = express.Router();
const joi = require("joi");
const User = require("../models/User");
const Cart = require("../models/Cart")
const _ = require("lodash")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")



const registerSchema = joi.object({
    name: joi.string().required().min(2),
    email: joi.string().required().email(),
    password: joi.string().min(8).required(),
    isAdmin: joi.boolean().required(),
});

router.post("/", async (req, res) => {
    try {
        //1. joi validation
        const { error } = registerSchema.validate(req.body);
        if (error) return res.status(400).send(error);

        //2. check if the user already exist
        let user = await User.findOne({email: req.body.email});
        if (user) return res.status(400).send("User already exist")

        //3. create the user 
        user = new User(req.body)
       
        //4. encrypt the password
        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt)

        //5 save user after password encryption
         await user.save()

        //6. create user cart
        let cart = new Cart({userId: user._id, products: [], active: true})
        await cart.save()

        //7. create token with jwt and return response with token
        const token = jwt.sign({_id: user._id, isAdmin: user.isAdmin, email: user.email}, process.env.jwtKey)
        res.status(201).send(token);
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;