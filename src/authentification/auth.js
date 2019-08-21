/* eslint-disable comma-dangle */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const auth = (req, res, next) => {
  const { token } = req.headers;
  // eslint-disable-next-line consistent-return
  jwt.verify(token, process.env.SECRET_KEY, (error, data) => {
    if (error) {
      return res.status(400).json({
        status: 400,
        error: 'Authentication failed'
      });
    }
    req.user = data;
    next();
  });
};

export default auth;
