let mongoose = require('mongoose');

let moment = require('moment-timezone');

let notifySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    for: {
      type: String,
      enum: ['invite', 'gift', 'credit'],
      required: true
    },
    title:{
        type: String,
    },
    message:{
        type: String,
    },
    // seen:{
    //     type: Boolean,
    //     default: false
    // },
    created: {
        type: Date,
        default: () => {
            return moment().tz("Asia/Tehran").format('YYYY-MM-DD HH:mm:ss.SSS')+'Z'
        }
    }
});

let Notify = module.exports = mongoose.model('Notify', notifySchema);
