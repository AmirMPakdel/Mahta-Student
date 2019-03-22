let mongoose = require('mongoose');

let moment = require('moment-timezone');

let puchaseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    price:{
        type: Number,
        required: true
    },
    percent:{
        type: Number,
        max: 100,
    },
    info:{
        type: String
    },
    created: {
        type: Date,
        default: () => {
            return moment().tz("Asia/Tehran").format('YYYY-MM-DD HH:mm:ss.SSS')+'Z'
        }
    }
});

let Purchase = module.exports = mongoose.model('Purchase', puchaseSchema);

