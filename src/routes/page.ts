import express, { Request, Response } from 'express';
import { registerUser, loginUser } from '../controller/UserController';

const router = express.Router();

// Route for rendering the registration form
router.get('/register', (req: Request, res: Response) => {
    res.render("register");
});

// Route for handling user registration
router.post('/register', registerUser);

// Route for rendering the login form
router.get('/login', (req: Request, res: Response) => {
    res.render("login");
});

// Route for handling user login
router.post('/login', loginUser);

export default router;
