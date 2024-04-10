import express from 'express';
import {registerUser, loginUser} from '../controller/UserController';

const router = express.Router();

/* post user information. */
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
