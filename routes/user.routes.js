import express from "express";
import { createUser, deleteUser, readUser, singleReadUser, updateUser } from "../controller/user.controller.js"
import { checkAppUser } from "../controller/AppUser/checkappuser.controller.js";
import { checkPassword } from "../controller/AppUser/checkpassword.controller.js";
import { createAppUser } from "../controller/AppUser/createappuser.controller.js";

const router = express.Router();

// CRUD Functionality

// C - For Creating subject
router.post("/createuser", createUser);

// R - For Reading
router.get("/readuser", readUser);

// Single Read
router.get("/readone/:id", singleReadUser);

// U - For Updating subject
router.put("/change/:id", updateUser);

// D - For Delete the subject
router.delete("/delete/:id", deleteUser);



router.post("/checkappuser", checkAppUser);

router.post("/checkpassword", checkPassword);

router.post("/createappuser", createAppUser)

export default router;
