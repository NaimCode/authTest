/* eslint-disable @typescript-eslint/no-var-requires */
const session = require('express-session')
import { RequestHandler } from 'express';

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60*24, 
        secure: false,
        
    },
};

export const sessionMiddleware: RequestHandler = session(sessionConfig);
