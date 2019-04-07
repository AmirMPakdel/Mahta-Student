const jwt = require('jsonwebtoken');

const config = require('../config/config');
const consts = require('../utils/consts');

const withAuth = function (req, res, next) {

  const code = req.cookies.code;

  if (!code) { // no token
    
    res.status(consts.UNAUTHORIZED_CODE).send('Unauthorized: No token provided');

  } else {

    next();
  }
};

module.exports = withAuth;