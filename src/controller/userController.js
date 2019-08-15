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
}

export default userController;
