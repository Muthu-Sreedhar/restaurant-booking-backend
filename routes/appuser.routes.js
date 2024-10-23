import express from "express";
import { checkAppUser } from "../controller/AppUser/checkappuser.controller.js";
import { checkPassword } from "../controller/AppUser/checkpassword.controller.js";
import { createAppUser } from "../controller/AppUser/createappuser.controller.js";

const appUserRouter = express.Router();

appUserRouter.post("/checkappuser", checkAppUser);

appUserRouter.post("/checkpassword", checkPassword);

appUserRouter.post("/createappuser", createAppUser)

export default appUserRouter;