import { Router } from 'express'
import {login, register, getUser} from './controller';
import { Login, User } from './validators';
import { validateRequest } from '../../middlewares/validator'
import {grantAccess} from '../../middlewares/authMiddleware';


const router = Router();


router.post('/signup', validateRequest({
    body: User
}), register);

router.post('/login', validateRequest({
    body: Login
}),login);

router.get('/user', grantAccess, getUser);

export default router;