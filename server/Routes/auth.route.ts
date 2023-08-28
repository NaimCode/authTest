
import express from 'express';
import authController from '../Controllers/auth.controller';
import authMiddleware from '../Middlewares/auth.middleware';
const router = express.Router();

const { checkUniqueFields, validateEmail, validateName, validatePassword,authenticateJWT } = authMiddleware;

router.post('/register', validateName, validateEmail, validatePassword, checkUniqueFields, authController.register);

router.post('/login',validateName, validateEmail, validatePassword, authController.login);

router.post('/logout', authController.logout);

router.get('/me',authenticateJWT, authController.me);



export default router;