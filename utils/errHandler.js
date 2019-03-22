const consts = require('./consts');
const config = require('../config/config');

module.exports = function (err, res) {

    config.log(`errHandler: \n ${err}`);

    res.status(consts.INT_ERR_CODE)
        .json({
            error: consts.ERR
        });

};