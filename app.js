import express from "express"
import morgan from "morgan"
import { configDotenv } from "dotenv"
import cookieParser from "cookie-parser"

import connectMongoDB from "./config/db.connection.js"

import userRoutes from "./routes/user.routes.js"
import authMiddleware from "./middlewares/auth.middleware.js"

const app = express()

app.use(morgan("dev"))
app.use(cookieParser())
configDotenv()
connectMongoDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"))
app.set("view engine","ejs")

app.get("/",authMiddleware, (req, res) => {
    const user = req.user
    
    res.render("home", {user})
})
app.use("/user",authMiddleware, userRoutes)

export default app