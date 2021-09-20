import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../schemas/User'
import Role from '../schemas/Role'

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.headers["authorization"];

        if (!token) return res.status(403).json({ message: "no token provided" });

        const decoded = jwt.verify(token, config.SECRET)
        req.userId = decoded.id

        const user = await User.findById(req.userId, { password: 0 })

        if (!user) return res.status(404).json({ message: "that user does not exist" })

        next()
    } catch {
        return res.status(401).json({ message: "unauthorized" })
    }
}

export const isModerator = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId, { password: 0 });
        const roles = await Role.find({ _id: { $in: user.roles } });

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator") {
                next();
                return;
            }
        }

        return res.status(403).json({ message: "you need moderator permission" })
    } catch {
        return res.status(403).json({ message: "you need moderator permission" })
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        const roles = await Role.find({ _id: { $in: user.roles } });

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
                next();
                return;
            }
        }

        return res.status(403).json({ message: "you need admin permission" })
    } catch {
        return res.status(403).json({ message: "you need admin permission" })
    }
}