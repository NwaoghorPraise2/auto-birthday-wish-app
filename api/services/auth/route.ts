import { Router } from 'express'
import { login, register, changePassword} from './controller';
import { User } from './interfaces/Auth';
import { validateRequest } from '../../middlewares/validator'


const router = Router();


router.post('/signup', validateRequest({
    body: User
}), register);
router.post('/login', login);
router.post('/change-password', changePassword);



export default router;