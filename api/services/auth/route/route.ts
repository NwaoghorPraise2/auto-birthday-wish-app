import { Router } from 'express';
import { login, register, getUser } from '../controller/controller';
import { Login, User } from '../types/validators';
import { validateRequest } from '../../../middlewares/validator';
import { grantAccess } from '../../../middlewares/authMiddleware';

const router = Router();

/**
 * @route POST /signup
 * @desc Register a new user
 * @access Public
 */
router.post('/signup', validateRequest({
    body: User
}), register);

/**
 * @route POST /login
 * @desc Log in a user
 * @access Public
 */
router.post('/login', validateRequest({
    body: Login
}), login);

/**
 * @route GET /user
 * @desc Get details of the authenticated user
 * @access Private
 */
router.get('/user', grantAccess, getUser);

export default router;
