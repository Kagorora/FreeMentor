import express from 'express';
import userController from '../controller/userController';
import auth from '../authentification/auth';
import adminController from '../controller/adminController';

const app = express();

app.post('/api/v1/auth/signup', userController.signUp);
app.post('/api/v1/auth/signin', userController.signIn);
app.get('/api/v1/auth/allUsers', auth, adminController.allUsers);
app.patch('/api/v1/auth/user/:userId', auth, adminController.changeUserType);
app.get('/api/v1/auth/mentors', auth, userController.viewAllMentors);
app.get('/api/v1/auth/mentors/:mentorId', auth, userController.specificMentor);

export default app;
