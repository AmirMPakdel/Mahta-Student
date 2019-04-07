const consts = require('./consts');
const errHandler = require('./errHandler');
const giftHandler = require('./giftHandler');
const purchaseHandler = require('./purchaseHandler');
const config = require('../config/config');
const validator = require('../tools/validator');
const dateConverter = require('../tools/dateConverter');

// Requiring models
let Student = require('../models/student');


/*
* check temporary code
* */
async function checkCode(req, res, next) {

    let params = req.body;

    let issue = validator.hasCode(req, res, params);
    if (issue) return;

    let query = {
        code: params.code
    };

    await Student.findOne(query, function(err, student) {

        if (err) {
            errHandler(err, res);

        } else if (student) { // if a student was found

            if (!student.firstName && !student.lastName) { // if student wasn't registered before

                res.sendStatus(consts.SUCCESS_CODE);

            } else { // if student was registered before
                res.status(consts.BAD_REQ_CODE)
                    .json({
                        error: consts.STUDENT_ALREADY_REGISTERED
                    });
            }
        } else { // if found no student

            res.status(consts.NOT_FOUND_CODE)
                .json({
                    error: consts.INCORRECT_MAHTA_ID
                });

        }
    });

}

/*
* registering student
* */
async function signup(req, res, next) {

    let params = req.body;

    let issue = false;

    // the student has temp code
    if(params.code){

        let query = {
            code: Number(params.code)
        };
    
        let studentToRegister;
    
        await Student.findOne(query, function(err, student) {
    
            config.log(`finding student...`);
    
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

                    // TODO:: generate a code for student
                    // student.code = createCode(params.grade)
    
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
    
        studentToRegister.save((err => {
            config.log(`in save student & student.code is ${studentToRegister.code}`);
            if (err) {
                errHandler(err, res);
    
            } else {
                res.status(consts.SUCCESS_CODE).json(studentToRegister);
            }
        }));

    }else{ // else if student dont have temp code


        //TODO:: create a new student and generate a code
    }
}

async function setInviter(req, res){

    let code = req.cookie.code;
    let inviterCode = req.inviterCode;

    await Student.findOne({code}, (err, student)=>{

        if(err){

            // no student with this code
            console.log("no student with this code");

        }else{

            Student.findOne({code:inviterCode}, (err, inviter)=>{

                if(err){
        
                    // no inviter with this code
                    console.log("no student with this code");
        
                }else{

                    // set the inviter
                    student.inviterCode = inviter;
                    student.save();

                    // send the name of the Inviter
                    res.status(consts.SUCCESS_CODE).json({firstName:inviter.firstName, lastName:inviter.lastName});
        
                }
            });

        }
    });

}

async function getInfo(req, res){

    let params = req.body;
    let code = req.cookie.code;

    //TODO:: send {gift, credit, giftList, creditList, inviteList}
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

// NOT READY
async function getGPList(req, res, next) {

    let params = req.body;
    let issue = false;
    let gifts;
    let purchases;

    let studentId;

    let response = {
        gifts : [],
        purchases : []
    };

    query = {
        code: params.code
    };

    await Student.findOne(query, function(err, student) {

        if (err) {
            issue = true;
            errHandler(err, res);

        } else if (!student) { // if found no student

            issue = true;
            res.status(consts.NOT_FOUND_CODE)
                .json({
                    error: consts.INCORRECT_MAHTA_ID
                });
        } else { // if found student

            gifts = student.gifts;
            purchases = student.purchases;
            studentId = student._id;
        }
    });

    if (issue) return;


    // if student had gifts
    if (gifts) {
        await giftHandler.getGifts(studentId, response);
    }

    // if student had purchases
    if (purchases) {
        await purchaseHandler.getPurchases(studentId, response);
    }

    res.status(consts.SUCCESS_CODE)
        .json(response);

}

module.exports = {checkCode,  signup, setInviter, getInfo};
