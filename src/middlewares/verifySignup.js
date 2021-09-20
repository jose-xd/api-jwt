import User from '../schemas/User'

export const checkDuplicatedUsernameOrEmail = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (user) return res.status(400).json({ message: "The username is already taken" });

        const email = await User.findOne({ email: req.body.email });

        if (email) return res.status(400).json({ message: "The email is already taken" });

        next();
    } catch {
        res.status(500).json({ message: "something went wrong" });
    }
}