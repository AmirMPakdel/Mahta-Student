const jwt = require('jsonwebtoken');
const secret = 'JesusChrist';

const consts = require('../utils/consts');

const withAuth = function (req, res, next) {

  const token = req.cookies.token;

  if (!token) { // no token
    res.status(consts.UNAUTHORIZED_CODE).send('Unauthorized: No token provided');

  } else {

    jwt.verify(token, secret, function(err, decoded) {
      if (err) { // invalid token

        res.status(consts.UNAUTHORIZED_CODE).send('Unauthorized: Invalid token');

      } else { // valid token

        req.username = decoded.username;
        next();

      }
    });
  }
};

module.exports = withAuth;