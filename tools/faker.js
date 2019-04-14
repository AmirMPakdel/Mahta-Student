const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Bring in Models
let Student = require('../models/student');
let Notify = require('../models/notify');


module.exports = {

    insertFakeStudents: () => {

        Student.count({}, function(err, count) {

            if (count <= 50) { // check students count

                for (let i = 0; i < 100; i++) {

                    new Student({
                        _id: new mongoose.Types.ObjectId(),
                        code: 1400000 + i,
                        firstName: getFirstName(),
                        lastName: getLastName(),
                        grade: getGrade(),
                        field: getField(),
                        phone: getPhoneNumber()
                    })
                        .save((err) => {
                            if (err) console.log(err);
                            else console.log(`student added`)
                        });

                }

            }

        });
    },

    insertFakeNotifies: () => {

        Student.count({}, function(err, count) {

            if (count <= 50) { // check students count

                for (let i = 0; i < 100; i++) {

                    new Student({
                        _id: new mongoose.Types.ObjectId(),
                        code: 1400000 + i,
                        firstName: getFirstName(),
                        lastName: getLastName(),
                        grade: getGrade(),
                        field: getField(),
                        phone: getPhoneNumber()
                    })
                        .save((err) => {
                            if (err) console.log(err);
                            else console.log(`student added`)
                        });

                }

            }

        });
    }

};

function getFirstName() {
    let text = "";

    let array = ["امیر", "حسن", "غلام", "زهرا", "پریا", "محمد", "علی", "فاطمه", "زیبا", "سید بیژن",
        "صبا" , "بابک", "شیرین", "سوگند", "فریبا", "حمید", "عطابک", "رویا"];

    text = array[(Math.floor(Math.random() * array.length))];

    return text;
}

function getLastName () {
    let text = "";

    let array = ["حمزه", "اعتدادی", "مجتهدی", "زیبا کناری", "پورباقری", "نجفی", "کاسپور", "محمدی",
        "غلام زاده", "منتظری", "آزاده" , "قریبی", "جوینده", "حیدری", "یزدانی", "پاینده", "قنبری", "قربانی",
        "نوازنده"];

    text = array[(Math.floor(Math.random() * array.length))];

    return text;
}

function getPhoneNumber () {

    let phone = "093";
    let numbers = "0123456789";

    for (let i = 0; i < 8; i++)
        phone += numbers.charAt(Math.floor(Math.random() * numbers.length));

    return phone;
}

function getField() {
    let text = "";

    let array = ["تجربی", "ریاضی", "انسانی", "هنر"];

    text = array[(Math.floor(Math.random() * array.length))];

    return text;
}

function getGrade() {
    let text = "";

    let array = ["دهم", "یازدهم", "دوازدهم", "فارغ التحصیل"];

    text = array[(Math.floor(Math.random() * array.length))];

    return text;
}