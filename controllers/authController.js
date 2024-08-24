const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Admin");
const dotenv = require('dotenv');

dotenv.config();

exports.register = async (req, res) => {
    const { id, name, email, password } = req.body;

    try {
        if (!id || !name || !email || !password) {
            return res.status(400).send("All fields (id, name, email, password) are required.");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ id, name, email, password: hashedPassword });
        await user.save();
        res.status(201).send("User registered successfully");
    } catch (err) {
        res.status(400).send(err.message);
    }
};


exports.login = async(req,res) =>{
    const {email , password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) return res.status(400).send("User not found");
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).send("Invalid cradentials");
        
        const accessToken = jwt.sign(
            {userId : user._id},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn : "10m"}
        );
        const refreshToken = jwt.sign(
            {userId: user._id},
            process.env.REFRESH_TOKEN_SECRET
        );
        res.json({accessToken, refreshToken});

    }catch (err){
        res.status(500).send(err.message);
    }
};

exports.refresh = async (req, res) => {
    const { token } = req.body;
    if (!token) return res.sendStatus(401);
    try {
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { userID: user.userId },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" }
            );
            res.json({ accessToken });
        });
    } catch (err) {
        res.sendStatus(500);
    }
};
