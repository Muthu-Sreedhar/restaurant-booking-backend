
// import express from "express";
// import connectDB from "./library/db.js";
// import cors from 'cors';
// import userRoutes from "./routes/user.routes.js";
// import appUserRouter from "./routes/appuser.routes.js";

// const app = express();
// const PORT = 6002;

// // Understand for the given the data of Postman
//     app.use(express.json()); 
//     app.use(express.urlencoded({ extended: true}))
//     app.use(cors());

// app.get("/", (req, res) => {
//     res.json({ msg: "Hello Student"});
// });

// app.use("/users", userRoutes); 

// app.use("/appuser", appUserRouter)

// connectDB();

// app.listen(PORT, () => {
//     console.log(`The server is running on http://localhost:${PORT}`);
// });



import express from "express";
import connectDB from "./library/db.js";
import cors from 'cors';
import userRoutes from "./routes/user.routes.js";
import appUserRouter from "./routes/appuser.routes.js";

const app = express();
// Use the PORT from environment variables, fallback to 6002 if not defined
const PORT = process.env.PORT || 10000; // Fallback to 10000 if not set



// Understand for the given the data of Postman
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.json({ msg: "Hello Student" });
});

app.use("/users", userRoutes);
app.use("/appuser", appUserRouter);

// Connect to MongoDB
connectDB();

// Listen on the specified port
app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`);
});



