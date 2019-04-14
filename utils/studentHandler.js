const mongoose = require('mongoose');
const consts = require('./consts');
const errHandler = require('./errHandler');
const giftHandler = require('./giftHandler');
const purchaseHandler = require('./purchaseHandler');
const config = require('../config/config');
const validator = require('../tools/validator');
const dateConverter = require('../tools/dateConverter');

// Requiring models
let Student = require('../models/student');
let Notify = require('../models/notify');


/*
* registering student
* */
async function signup(req, res, next) {

    let params = req.body;

    let issue = validator.validateSignUp(req, res);

    let studentToRegister;

    // if student has temp code
    if(params.code) {

        let query = {
            code: Number(params.code)
        };
    
        await Student.findOne(query, function(err, student) {
    
            if (err) {
                errHandler(err, res);
                issue = true;
    
            } else if (student) { // if a student was found
    
                if (!student.firstName && !student.lastName) { // if student wasn't registered before
    
                    config.log(`student wasn't registered`);
    
                    student.firstName = params.firstName;
                    student.lastName = params.lastName;
                    student.field = params.field;
                    student.grade = params.grade;
                    student.phone = params.phone;
                    student.home = params.home;
                    student.school = params.school;

                    studentToRegister = student;
    
                } else { // if student was registered before
                    issue = true;
                    res.status(consts.BAD_REQ_CODE)
                        .json({
                            error: consts.STUDENT_ALREADY_REGISTERED
                        });
                }
    
            } else {
                issue = true;
                res.status(consts.NOT_FOUND_CODE)
                    .json({
                        error: consts.INCORRECT_MAHTA_ID
                    });
            }
        });
    
        if (issue) return;
    
        // creating main code
        studentToRegister.code = await createCode(params.grade);
    
    } else { // else if student does not have temp code

        studentToRegister = new Student({});

        studentToRegister._id = new mongoose.Types.ObjectId();
        studentToRegister.code = await createCode(params.grade);
        studentToRegister.firstName = params.firstName;
        studentToRegister.lastName = params.lastName;
        studentToRegister.grade = params.grade;
        studentToRegister.field = params.field;
        studentToRegister.phone = params.phone;
        studentToRegister.home = params.home;
        studentToRegister.school = params.school;

        // check if inviterCode is valid and update inviter
        if (params.inviterCode) {

            // finding inviter
            await Student.findOne({ code: Number(params.inviterCode) }, function(err, inviter) {

                if (err) {
                    errHandler(err, res);
                    issue = true;

                } else if (!inviter) { // if found no inviter

                    res.status(consts.BAD_REQ_CODE).json({error: consts.INCORRECT_INVITER_ID});
                    issue = true;

                } else { // if inviterCode is valid

                    // defining inviter for newStudent
                    studentToRegister.inviter = inviter._id;

                    // adding ref to inviter
                    inviter.inviteds.push(studentToRegister);

                    // saving inviter
                    inviter.save((err => {

                        if (err) {
                            errHandler(err, res);
                            issue = true;
                        }
                    }));
                }
            });

            if (issue) return;
        }
    }

    // saving student
    studentToRegister.save((err => {
        config.log(`in save student & student.code is ${studentToRegister.code}`);
        if (err) {
            errHandler(err, res);

        } else {
            res.status(consts.SUCCESS_CODE).json(studentToRegister);
        }
    }));
}

async function getInfo(req, res) {

    let code = req.cookies.code;

    let issue = false;

    let response = {
        gift: 0,
        credit: 0,
        giftList: [],
        creditList: [],
        inviteList: [],
    };

    let studentId;

    await Student.findOne({code}, (err, student) => {

        if(err){
            errHandler(err, res);
            issue = true;

        } else if (student){

            response.gift = student.gift;
            response.credit = student.credit;

            studentId = student._id;

        } else {
            issue = true;
            res.status(consts.NOT_FOUND_CODE)
                .json({
                    error: consts.INCORRECT_MAHTA_ID
                });
        }
    });

    if (issue) return;

    await Notify.find({owner: studentId}, {_id: 0, __v: 0 }, (err, notifies) => {

        if(err){
            errHandler(err, res);
            issue = true;

        } else if (notifies){

            notifies.forEach(notify => {

                switch (notify.for) {

                    case 'invite':
                        response.inviteList.push({date: notify.created, message: notify.message});
                        break;

                    case 'credit':
                        response.creditList.push({date: notify.created, message: notify.message});
                        break;

                    case 'gift':
                        response.giftList.push({date: notify.created, message: notify.message});
                        break;
                }

            });
        }
    });

    res.status(consts.SUCCESS_CODE)
        .json(response);

}

async function createCode(grade) {
    config.log(`in create code`);
    let date = dateConverter.getLiveDate();

    let konkurYear = Number(date.substring(0, 4));

    let isFirst3Month = date.substring(5, 7) <= 3;

    switch (grade) {

        case 'دوازدهم' || 'فارغ التحصیل':
            if (isFirst3Month) {}
            else konkurYear += 1;
            break;

        case 'یازدهم':
            if (isFirst3Month) konkurYear += 1;
            else konkurYear += 2;
            break;

        case 'دهم':
            if (isFirst3Month) konkurYear += 2;
            else konkurYear += 3;
            break;

        case 'نهم':
            if (isFirst3Month) konkurYear += 3;
            else konkurYear += 4;
            break;

        case 'هشتم':
            if (isFirst3Month) konkurYear += 4;
            else konkurYear += 5;
            break;

        case 'هفتم':
            if (isFirst3Month) konkurYear += 5;
            else konkurYear += 6;
            break;

        case 'ششم':
            if (isFirst3Month) konkurYear += 6;
            else konkurYear += 7;
            break;
    }

    config.log(`konkurYear : ${konkurYear}`);

    let latestCode = 0;

    let issue = false;

    // latest added student that its code contains konkurYear
    // await Student.findOne({ "code": { "$regex": konkurYear, "$options": "i" } }, { code:1, _id:0 }, { sort: { 'created' : -1 } },
    //     function(err, student) {
    //
    //     config.log(`finding latest added student`);
    //
    //     if (err) {
    //         issue = true;
    //         errHandler(err);
    //
    //     } else if (student) { // if found student
    //         latestCode = Number(student.code);
    //
    //     } else { // if found no student was found -> handling first student with chosen grade
    //         latestCode = konkurYear + 1000;
    //     }
    // });


    konkurYear = konkurYear * 10000;

    let temp = konkurYear;

    console.log(`temp : ${temp}`);

    await Student.findOne({ code: { $gt: temp, $lt: temp + 10000 }}, { code:1, _id:0 }, { sort: { 'created' : -1 } },
        function(err, student) {

            config.log(`finding latest added student`);

            if (err) {
                issue = true;
                errHandler(err);

            } else if (student) { // if found student
                latestCode = Number(student.code);

                config.log('query result:');
                config.log(student);

            } else { // if found no student was found -> handling first student with chosen grade
                latestCode = temp;
            }
        });


    if (issue) return;

    return (latestCode + 1);
}



async function setInviter(req, res){

    let code = req.cookie.code;
    let inviterCode = req.inviterCode;

    await Student.findOne({code}, (err, student)=>{

        if(err){
            errHandler(err, res);
            issue = true;

        } else if (student){

            Student.findOne({code: inviterCode}, (err, inviter) => {

                if(err){
                    errHandler(err, res);
                    issue = true;

                } else if (inviter){

                    // set the inviter
                    student.inviterCode = inviter;
                    student.save();

                    // send the name of the Inviter
                    res.status(consts.SUCCESS_CODE).json({firstName:inviter.firstName, lastName:inviter.lastName});

                }
            });

        } else {
            issue = true;
            res.status(consts.NOT_FOUND_CODE)
                .json({
                    error: consts.INCORRECT_MAHTA_ID
                });
        }
    });
}



module.exports = {signup, setInviter, getInfo};
