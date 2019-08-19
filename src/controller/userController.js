/* eslint-disable no-trailing-spaces */
/* eslint-disable lines-between-class-members */
/* eslint-disable max-len */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt-nodejs';
import userModal from '../model/users';
import userValidation from '../helper/userValidation';

dotenv.config();
class userController {
  static signUp(req, res) {
    const {
      firstName, lastName, email, password, address, bio, occupation, expertise, userType,
    } = req.body;
    const foundUser = userModal.find(usr => usr.email === email);
    if (foundUser) {
      return res.status(401).json({
        status: 401,
        error: 'Email already exist',
      });
    }
    const idUsers = userModal.length + 1;
    const jsToken = jwt.sign({ id: idUsers, email, userType }, process.env.SECRET_KEY);
    const hashedPsw = bcrypt.hashSync(password);
    const newUser = userValidation.validate({
      // eslint-disable-next-line max-len
      token: jsToken, id: idUsers, firstName, lastName, email, password: hashedPsw, address, bio, occupation, expertise, userType,
    });
    if (!newUser.error) {
      userModal.push(newUser.value);
      return res.status(201).json({
        status: 201,
        message: 'User created successfully',
        token: jsToken,
        data: {
          // eslint-disable-next-line max-len
          id: idUsers, firstName, lastName, email, password: hashedPsw, address, bio, occupation, expertise, userType,
        },
      });
    }
    const validationError = newUser.error.details[0].message.replace('"', ' ').replace('"', '');
    return res.status(400).json({
      status: 400,
      error: validationError,
    });
  }
  static signIn(req, res) {
    const {
      email, password,
    } = req.body;
    const foundUser = userModal.find(usr => usr.email === email);
    if (!foundUser) {
      return res.status(404).json({
        status: 404,
        error: 'user not found',
      });
    }
    const jsToken = jwt.sign({ id: foundUser.id, email: foundUser.email, userType: foundUser.userType }, process.env.SECRET_KEY);
    const comparePassword = bcrypt.compareSync(password, foundUser.password);
    if (!comparePassword) {
      return res.status(401).json({
        status: 401,
        error: 'password not matching',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'User is successfully logged in',
      token: jsToken,
      data: {
        id: foundUser.id, email: foundUser.email, userType: foundUser.userType,
      },
    });
  }
  static viewAllMentors(req, res) {
    if (req.user.userType === 'user' || req.user.userType === 'admin') {
      const foundMentors = userModal.filter(user => user.userType === 'mentor');
  
      return res.status(200).json({
        status: 200,
        data: {
          foundMentors,
        },
      });
    }
    return res.status(403).json({
      status: 403,
      error: 'unauthorised route',
    });
  }

  static specificMentor(req, res) {
    if (req.user.userType === 'user' || req.user.userType === 'user') {
      const { mentorId } = req.params;
      // eslint-disable-next-line radix
      const foundMentors = userModal.find(mentor => mentor.id === parseInt(mentorId));
      if (foundMentors) {
        return res.status(200).json({
          status: 200,
          data: foundMentors,
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'mentor not found',
      });
    }
    return res.status(403).json({
      status: 403,
      error: 'only admin and user have access',
    });
  }
}

export default userController;
