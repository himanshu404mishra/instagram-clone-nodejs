import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.redirect("/user/login");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        console.log(req.url)

        if(req.url =="/register" || req.url =="/login"){
            return res.redirect("/")
        }
        return next();
    } catch (error) {
        return res.redirect("/user/login");
    }
};

export default authMiddleware;
