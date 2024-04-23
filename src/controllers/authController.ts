import { Request, Response } from "express";
import * as authService from "../services/authServices";

export const authRegister = async (req: Request, res: Response) => {
  try {
    const result = await authService.authRegister(req.body);
    return res.status(result.status).json(result);
  } catch (error) {
    console.error("Error in user register", error);
    return res
      .status(500)
      .json({ message: "Error in user register", success: false });
  }
};

export const authLogin = async (req: Request, res: Response) => {
  try {
    const result = await authService.authLogin(req.body);
    return res.status(result.status).json(result);
  } catch (error) {
    console.error("Error in user login", error);
    return res
      .status(500)
      .json({ message: "Error in user login", success: false });
  }
};
