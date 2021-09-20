import User from '../schemas/User'
import jwt from 'jsonwebtoken'
import config from '../config'
require("dotenv").config();

export const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password),
            roles: ['611617c554255f1d10b793cf']
        })
        const savedUser = await newUser.save();

        const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
            expiresIn: 86400 // 24 hours
        })

        res.json({ token })
    } catch {
        res.status(401).json({ message: "something went wrong" })
    }
}

export const signIn = async (req, res) => {
    try {
        const userFound = await User.findOne({ email: req.body.email }).populate("roles");

        if (!userFound) return res.status(400).json({ message: "User not found" })

        const matchPassword = await User.comparePassword(req.body.password, userFound.password);

        if (!matchPassword) return res.status(401).json({ token: null, message: "invalid password" })

        const token = jwt.sign({ id: userFound._id }, config.SECRET, {
            expiresIn: 86400 // 24 hours
        });

        res.json({ token })
    } catch {
        res.status(401).json({ message: "something went wrong" })
    }
}