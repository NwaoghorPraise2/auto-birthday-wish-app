import { Router } from 'express'
import {login, register} from './controller';
import { User } from './validators';
import { validateRequest } from '../../middlewares/validator'


const router = Router();


router.post('/signup', validateRequest({
    body: User
}), register);

router.post('/login', login);

export default router;