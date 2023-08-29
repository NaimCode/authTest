/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt  from 'jsonwebtoken';

import { NextFunction, Request, RequestHandler, Response } from "express";
import prisma from "../Utils/prisma";


const validateName: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const name = req.body.name;
    const field = "name"
    if (!/^[a-zA-Z ]+$/.test(name)) {
        return res.status(400).json({
            field,
            message: 'Name can only contain letters and spaces',
        });
    }
    next();
};

const validateEmail: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const field = "email"
    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({
            field,
            message: 'Email is invalid',
        });
    }
    next();
};

const validatePassword: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const password = req.body.password;
    const field = "password"

    if (!/[A-Z]/.test(password)) {
        return res.status(400).json({
            field,
            message: 'Password must include at least one uppercase letter',
        })
    }

    if (!/[a-z]/.test(password)) {
        return res.status(400).json({
            field,
            message: 'Password must include at least one lowercase letter',
        })
    }

    if (password.length < 8) {
        return res.status(400).json({
            field,
            message: 'Password must be at least 8 characters long',
        })
    }

    next();
};

const checkUniqueFields: RequestHandler = async (req, res, next) => {
    const { email, name } = req.body;

    try {
        const existingEmail = await prisma.user.count({
            where: { email },
        });

        if (existingEmail !== 0) {
            return res.status(400).json({
                field: "email",
                message: "Email is already in use",
            });
        }

        const existingName = await prisma.user.count({
            where: { name },
        });

        if (existingName) {
            return res.status(400).json({
                field: "name",
                message: "Name is already taken",
            });
        }

        next();
    } catch (error) {
        res.status(500).send("Error while checking uniqueness");
    }
};


const authenticateJWT: RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        (req as any).user = user;
        next();
    });
};

export default  {
    validateName,
    validateEmail,
    validatePassword,
    checkUniqueFields,
    authenticateJWT
};