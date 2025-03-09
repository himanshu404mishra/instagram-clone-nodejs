import express from "express";
import userModel from "../models/user.model.js";

import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { hash, compare } from "bcryptjs";

const router = express.Router();

router.get("/login", (req, res) => {
    res.render("login");
});
router.get("/register", (req, res) => {
    res.render("register");
});

router.post(
    "/register",
    body("username").trim().isLength({ min: 3 }),
    body("password").trim().isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);


        if (!errors.isEmpty()) {
            return res.render("register", {
                errors: errors.array(),
                message: "Invalid Data",
            });
        }

        const { username, password } = req.body;

        const hashPassword = await hash(password, 10);

        const newUser = await userModel.create({
            username,
            password: hashPassword,
        });

        res.json(newUser);
    }
);

router.post(
    "/login",
    body("username").trim().isLength({ min: 3 }),
    body("password").trim().isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render("login",{
                errors: errors.array(),
                message: "Invalid User",
            });
        }
        const { username, password } = req.body;

        const user = await userModel.findOne({
            username,
        });
        if (!user)
            return res
                .status(400)
                .json({ message: "username or password is incorrect" });

        const isMatch = await compare(password, user.password);
        if (!isMatch)
            return res
                .status(400)
                .json({ message: "username or password is incorrect" });

        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
            },
            process.env.JWT_SECRET
        );
        res.cookie("token", token);
        res.redirect("/");
    }
);
export default router;
