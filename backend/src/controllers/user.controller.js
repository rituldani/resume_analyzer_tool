import { User } from "../models/user.models.js"
import bcrypt from "bcryptjs"
import createTokenAndSaveCookie from "../jwt/generateToken.js"

export const Signup = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    // console.log({ username, email })
    try {
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password do not match" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            username,
            email,
            password: hashPassword,
        });
        await newUser.save();

        if (newUser) {
            const token = createTokenAndSaveCookie(newUser._id, res);
            return res.status(200).json({
                message: "Registered Successfully", newUser: {
                    _id: newUser._id,
                    fullname: newUser.fullname,
                    email: newUser.email
                },
                token: token,
            });
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const Login = async (req, res) => {
    const { email, password } = req.body;

    // console.log({ email });

    if (!email || !password) {
        return res.status(400).json({ error: "Email and Password are required." });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Invalid User Credential" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Password is Incorrect" })
        }

        const token = createTokenAndSaveCookie(user._id, res);
        res.status(200).json({
            message: "User logged in sucessfully", user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email
            },
            token: token,
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const Logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(201).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal server error" });
    }
}