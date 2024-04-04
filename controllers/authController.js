import JWT from "jsonwebtoken";

import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import User from "../models/userModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, dob, email, password } = req.body;

    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!dob) {
      return res.send({ message: "Date of birth is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }

    //checking if there is existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "Already registered please login",
      });
    }

    const hashedPassword = await hashPassword(password);

    //register new user
    const user = await new User({
      name,
      dob,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user: {
        name: user.name,
        dob: user.dob,
        email: user.email,
        id: user._id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    //cheking if user exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User does not exist",
      });
    }

    //comparing password
    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });
    }
    console.log(match);

    //creating token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

export const testController = (req, res) => {
  res.send("Protected routes");
};
