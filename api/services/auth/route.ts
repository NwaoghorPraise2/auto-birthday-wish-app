import { Router } from 'express'
import { login, register, changePassword} from './controller';


const router = Router();


router.get('/signup', register);
router.post('/login', login);
router.post('/change-password', changePassword);

// router.post('/login', (req, res) => {
//   res.json({
//     code: 200,
//     message: 'success'
//   })
// })

export default router;