import { hashPassword } from './../utils/bcrypt';
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../models/User";
import generateToken from "../utils/generateToken";
import UserModel from "../models/UserModel";

// @Desc Get all users
// @Route /api/auth
// @Method GET
export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find({}).select("-password");
  res.status(201).json({ success: true, count: users.length, users });
});

export const signUp= asyncHandler(async(req:Request,res:Response):Promise<void>=>{
  try {
      const {name,email ,phone  , password} =req.body



      let existingUser ;
      if(email){ 
          existingUser = await UserModel.findOne({email})
      } else {
          existingUser = await UserModel.findOne({phone})
      
      }
      if(existingUser){
          res.status(400).json({message:"User already exist"})
      }

      const hashedPassword = await hashPassword(password)

      const user = await UserModel.create({
          name,
          email,
          phone,
          password:hashedPassword
      })
      res.status(201).json({
          success:true,
          message:"User created successfully",
          data: user
      })

  } catch (error) {
      console.error(error)
      res.status(500).json({message:error})
  }
})

// @Desc Login
// @Route /api/auth/
// @Method POST
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (await user.comparePassword(password)) {
    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(401);
    throw new Error("Email or password incorrect");
  }
});

// @Desc Register
// @Route /api/auth/register
// @Method POST
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
       res.status(400).json({ error: "User already exists" });
       return
    }

    const user = new User({
      email,
      password,
    });

    await user.save();

    res.status(201).json({
      success: true,
      user: {
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
