let isDevelopment = (process.env.NODE_ENV === 'development');
let hostAddress = (isDevelopment)? '0.0.0.0' : '127.0.0.1';
let database = 'mongodb://localhost:27017/mahta';

function log (message) {
    if (isDevelopment)
        console.log(message);
}

module.exports = {
    isDevelopment,
    hostAddress,
    database,
    log
};