import http from "http";
import app from "./app.js";

const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); // This is the same as app.listen(3000, () => console.log("Server is running on port 3000"))
