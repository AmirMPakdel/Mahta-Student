let mongoose = require('mongoose');

let moment = require('moment-timezone');

let giftSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    price:{
        type: Number,
        required: true
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

let Gift = module.exports = mongoose.model('Gift', giftSchema);

