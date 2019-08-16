import express from 'express';
import userController from '../controller/userController';

const app = express();

app.post('/api/v1/auth/signup', userController.signUp);
app.post('/api/v1/auth/signin', userController.signIn);

export default app;
