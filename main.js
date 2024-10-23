
import express from "express";
import connectDB from "./library/db.js";
import cors from 'cors';
import userRoutes from "./routes/user.routes.js";
import appUserRouter from "./routes/appuser.routes.js";

const app = express();
const PORT = 6002;

// Understand for the given the data of Postman
    app.use(express.json()); 
    app.use(express.urlencoded({ extended: true}))
    app.use(cors());

app.get("/", (req, res) => {
    res.json({ msg: "Hello Student"});
});

app.use("/users", userRoutes); 

app.use("/appuser", appUserRouter)

connectDB();

app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`);
});






