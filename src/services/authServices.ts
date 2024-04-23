import Auth from "../models/authModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { emailValidate, passwordRegex } from "../helpers/helper";
import { envConfig } from "../config/envConfig";

export const authRegister = async (userData: any) => {
  const { fullName, email, password } = userData;
  try {
    if (!emailValidate(email)) {
      return { message: "Invalid email format", success: false, status: 400 };
    }
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return {
        message: `User with email ${email} already exists`,
        success: false,
        status: 400,
      };
    }
    if (!passwordRegex.test(password)) {
      return {
        message:
          "Password must have at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character (#?!@$%^&*-)",
        success: false,
        status: 400,
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      fullName,
      email,
      password: hashedPassword,
    };

    const userSaved = await Auth.create(newUser);
    if (userSaved.id) {
      return {
        message: "User Register successful",
        status: 201,
        success: true,
      };
    } else {
      return { message: "Something went wrong", success: false, status: 500 };
    }
  } catch (error) {
    console.error("Error in user register", error);
    return { message: "Error in user register", success: false, status: 500 };
  }
};

export const authLogin = async (userData: any) => {
  const { email, password } = userData;
  try {
    const auth = await Auth.findOne({ email });
    if (!auth) {
      return { message: "User not found", success: false, status: 404 };
    }
    const isPasswordValid = await bcrypt.compare(password, auth.password || "");
    if (!isPasswordValid) {
      return {
        message: "Incorrect email or password",
        success: false,
        status: 400,
      };
    }
    const token = jwt.sign(
      {
        id: auth._id,
        fullName: auth.fullName,
        email: auth.email,
      },
      envConfig.Jwt_Secret,
      { expiresIn: envConfig.Jwt_Expiry_Hours }
    );
    return { message: "User Signed In", status: 200, success: true, token };
  } catch (error) {
    console.error("Error in user login", error);
    return { message: "Error in user login", success: false, status: 500 };
  }
};
