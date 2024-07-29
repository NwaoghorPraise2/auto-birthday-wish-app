import { Router } from 'express'
import {login, register} from './controller';
import { Login, User } from './validators';
import { validateRequest } from '../../middlewares/validator'


const router = Router();


router.post('/signup', validateRequest({
    body: User
}), register);

router.post('/login', validateRequest({
    body: Login
}),login);

export default router;