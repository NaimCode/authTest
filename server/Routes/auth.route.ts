
import express from 'express';
import authController from '../Controllers/auth.controller';
import authMiddleware from '../Middlewares/auth.middleware';
const router = express.Router();

const { checkUniqueFields, validateEmail, validateName, validatePassword, authenticateJWT, userExists,validateTokenResetPassword } = authMiddleware;

router.post('/register', validateName, validateEmail, validatePassword, checkUniqueFields, authController.register);

router.post('/login', validateEmail, validatePassword, authController.login);

router.post('/logout', authController.logout);

router.get('/me', authenticateJWT, authController.me);

router.post("/forget-password", validateEmail, userExists, authController.forgetPassword)

router.post("/reset-password",validateTokenResetPassword,validatePassword, authController.resetPassword)



export default router;