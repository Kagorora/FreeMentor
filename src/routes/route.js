import express from 'express';
import userController from '../controller/userController';

const app = express();

app.post('/api/v1/auth/signup', userController.signUp);

export default app;
