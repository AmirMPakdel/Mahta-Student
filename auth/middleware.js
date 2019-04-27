const jwt = require('jsonwebtoken');

const config = require('../config/config');
const consts = require('../utils/consts');

const withAuth = function (req, res, next) {

  const code = req.cookies.code;

  console.log("code=>"+code);
  

  if (!code) { // no code
    res.status(consts.UNAUTHORIZED_CODE).send('Unauthorized: No code provided');

  } else {

    next();
  }
};

module.exports = withAuth;