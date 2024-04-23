import express from "express";
import * as authController from "../controllers/authController";

const authRouter = express.Router();

// Auth routes
authRouter.post("/user-register", authController.authRegister);
authRouter.post("/user-login", authController.authLogin);

export default authRouter;
