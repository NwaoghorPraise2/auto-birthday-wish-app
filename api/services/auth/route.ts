import { Router } from 'express'
import {register} from './controller';
import { User } from './validators';
import { validateRequest } from '../../middlewares/validator'


const router = Router();


router.post('/signup', validateRequest({
    body: User
}), register);


export default router;