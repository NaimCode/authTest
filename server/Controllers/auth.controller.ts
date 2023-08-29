/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../Utils/prisma";
import jwt from "jsonwebtoken";
import { RequestHandler } from "express-serve-static-core";
import { sendEmail } from "../Utils/nodeMailer";


const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
      },
    });
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET as string
    );

    res.status(200).json({

      token,
    });
  } catch (error) {
    res.status(500).send("Error while creating user");
  }
};

const logout = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Logout successful' });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send("Invalid password");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET as string
    );

    res.status(200).json({
      token,
    });

  } catch (error) {
    res.status(500).send("Login error");
  }
};

const me: RequestHandler = async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).send("Error while fetching user");
  }

};


const forgetPassword = async (req: Request, res: Response) => {
  try {

    const token = await (prisma as any).token.create({
      data: {
        type: "RESET_PASSWORD",
        user: {
          connect: {
            email: req.body.email,
          }
        },
        expiresAt: new Date(Date.now() + 1000 * 60 * 60),
      }
    })

    await sendEmail(req.body.email, "Forget Password", {
      html: `<a href="${process.env.CLIENT_URL}/reset-password/${token.id}">Reset Password</a>`
    })

    res.status(200).json({ message: 'Email sent' });

  } catch (error) {
    console.log('error', error)
    res.status(500).send("Error on forget password");
  }
}


const resetPassword: RequestHandler = async (req, res) => {
  try {
    const { password, token } = req.body;
    const userId = (req as any).user.id;
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });
    await (prisma as any).token.delete({
      where: {
        id: token,
      },
    });

    res.status(200).json({ message: 'Password updated' });
  } catch (error) {
    res.status(500).send("Error while resetting password");
  }
}


export default { register, logout, login, me, forgetPassword, resetPassword };
