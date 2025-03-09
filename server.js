import http from "http";
import app from "./app.js";

const server = http.createServer(app);

server.listen(3000, () => {
    console.log("Server is running on port 3000");
}); // This is the same as app.listen(3000, () => console.log("Server is running on port 3000"))
