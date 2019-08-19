import express from 'express';
import userController from '../controller/userController';
import auth from '../authentification/auth';

const app = express();

app.post('/api/v1/auth/signup', userController.signUp);
app.post('/api/v1/auth/signin', userController.signIn);
app.get('/api/v1/auth/allUsers', auth, userController.allUsers);

export default app;
