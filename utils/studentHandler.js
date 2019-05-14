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
let Gift = require('../models/gift');
let Purchase  = require('../models/purchase');


/*
* registering student
* */

async function signUp1(req, res){

    let params = req.body;

    let issue = validator.validateSignUp(req, res);

    let tempCode = params.code;


    if(issue){
        
        return;

    }else{

        Student.findOne({code:tempCode}, (err, student)=>{
            
            if(err || !student){

                res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_MAHTA_ID});
            
            }else{

                student.firstName = params.firstName;
                student.lastName = params.lastName;
                student.field = params.field;
                student.grade = params.grade;
                student.phone = params.phone;
                createCode(student.grade).then(code=>{
                    student.code = code;
                    student.save();

                    res.cookie('code', code, {expires: new Date(Date.now()+ 259200000)}).
                    status(consts.SUCCESS_CODE).json({code});
                });
            }
        });
    }
}//done


async function signUp2(req, res){

    let params = req.body;

    let issue = validator.validateSignUp(req, res);

    let inviterCode = params.inviterCode;

    if(issue){

        return;

    }else{

        Student.findOne({code:inviterCode}, (err, inviter)=>{
            
            if(err || !inviter){

                res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_INVITER_ID});
            
            }else{

                let newStudent = new Student();
                newStudent.firstName = params.firstName;
                newStudent.lastName = params.lastName;
                newStudent.field = params.field;
                newStudent.grade = params.grade;
                newStudent.phone = params.phone;
                newStudent.inviter = inviter;
                createCode(newStudent.grade).then(code=>{
                    newStudent.code = code;
                    newStudent.save();

                    inviter.inviteds.push(newStudent._id);
                    inviter.save();

                    res.cookie('code', code, {expires: new Date(Date.now()+ 259200000)}).
                    status(consts.SUCCESS_CODE).json({code});
                });
            }
        });
    }
}//done


async function getInfo2(req, res) {

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
    let inviteds = [];

    await Student.findOne({code}, (err, student) => {

        if(err) {
            errHandler(err, res);
            issue = true;

        } else if (student){

            response.gift = student.gift;
            response.credit = student.credit;

            studentId = student._id;
            inviteds = student.inviteds;

        } else {
            issue = true;
            res.status(consts.NOT_FOUND_CODE)
                .json({
                    error: consts.INCORRECT_MAHTA_ID
                });
        }
    });

    if (issue) return;

    let purchasesList = [];


    // DO NOT EVER USE FOR EACH LOOP FOR THIS KINDA SHIT
    for (let i = 0; i < inviteds.length; i++) {

        let invited = inviteds[i];

        if (issue) return;

        let invitedName = '';

        await Student.findOne({_id: invited}, (err, student) => {

            if(err){
                errHandler(err, res);
                issue = true;

            } else if (student){

                response.inviteList.push({date: student.created, firstName: student.firstName,
                    lastName: student.lastName});

                invitedName = student.firstName + ' ' + student.lastName;

                if (student.purchases) {
                    purchasesList = student.purchases;
                }
            }
        });

        if (issue) return;

        for (let j = 0; j < purchasesList.length; j++) {

            let purchase = purchasesList[j];

            // if use find function it would return an array with only 1 index for fuck sake
            await Purchase.findOne({_id: purchase}, (err, fPurchase) => {

                if(err){
                    errHandler(err, res);
                    issue = true;

                } else if (fPurchase){

                    response.creditList.push({date: fPurchase.created,
                        credit: fPurchase.payed * fPurchase.percent / 100,
                        name: invitedName});
                }
            });
        }

    }


    if (issue) return;

    await Gift.find({owner: studentId}, (err, gifts) => {

        if(err){
            errHandler(err, res);
            issue = true;

        } else if (gifts){
            
            gifts.forEach(gift => {
                response.giftList.push({date: gift.created, gift: gift.price, info: gift.info});
            });
        }
    });

    if(issue) return;

    res.status(consts.SUCCESS_CODE)
        .json(response);

}//done

async function getInfo(req, res) {

    const home_main_title ='سامانه مهتا';
    const home_sub_title = "میتونی برای دیدن لیست کسایی که دعوت کردی ، هدایای که از مهتا گرفتی و اعتباری که بدست آوردی روی آیکون مخصوص خودشون کلیک کنی";

    let code = req.cookies.code;
    let subscription = req.body.subscription;

    config.log(subscription);

    let issue = false;

    let response = {
        gift: 0,
        credit: 0,
        mainTitle:home_main_title,
        subTitle:home_sub_title,
        giftList: [],
        creditList: [],
        inviteList: [],
    };

    await Student.findOne({code}).populate(["inviteds", "gifts"]).exec( async function(err, student){

        response.gift = student.gift;
        response.credit = student.credit;
        
        let gifts = student.gifts;

        let inviteds = student.inviteds;

        gifts.forEach(gift => {
            response.giftList.push({date:gift.created, gift: gift.price, info: gift.info});
        });

        inviteds.forEach(invited=>{
            response.inviteList.push({date:invited.created, firstName:invited.firstName, lastName:invited.lastName})
        });
        

        for(const inv of inviteds){

            let result = await Student.findOne({_id:inv._id}).populate("purchases").exec();

            console.log(result);

            for(const fPurchase of result.purchases){
                

                response.creditList.push({date: fPurchase.created,
                    credit: (fPurchase.payed * (fPurchase.percent / 100)),
                    name: result.lastName+' '+result.firstName});
            }
        }

        // updating student subscription
        student.subscription = subscription;
        await student.save();

        console.log(response);
        res.status(consts.SUCCESS_CODE).json(response);
        
    });    

}//done


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

    await Student.findOne({ code: { $gt: temp, $lt: temp + 10000 }}, { code:1, _id:0 },
        { sort: { 'code' : -1 } },
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
}//done


async function signUp(req, res, next) {

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
    
    } else { // else if student does not have temp code

        studentToRegister = new Student({});

        studentToRegister._id = new mongoose.Types.ObjectId();
        studentToRegister.firstName = params.firstName;
        studentToRegister.lastName = params.lastName;
        studentToRegister.grade = params.grade;
        studentToRegister.field = params.field;
        studentToRegister.phone = params.phone;
        studentToRegister.home = params.home;
        studentToRegister.school = params.school;
    }

    // creating main code
    studentToRegister.code = await createCode(params.grade);

    if (issue) return;

    // saving student
    studentToRegister.save((err => {
        config.log(`in save student & student.code is ${studentToRegister.code}`);
        if (err) {
            errHandler(err, res);

        } else {
            res.status(consts.SUCCESS_CODE).json(studentToRegister.code);
        }
    }));
}

async function signUp3(req, res){

    let issue = validator.validateSignUp(req, res);

    let code =  req.body.code; // for debugging purposes
    let inviterCode = req.body.inviterCode;

    let studentToSave;
    let inviterToSave;

    // check if student exists
    await Student.findOne({code: code}, (err, student)=>{

        if(err){
            errHandler(err, res);
            issue = true;

        } else if (student){

            // if already had inviter
            if (student.inviter) {

                issue = true;
                res.status(consts.BAD_REQ_CODE)
                    .json({
                        error: consts.INVITER_ALREADY_REGISTERED
                    });
                return;
            }

            studentToSave = student;

        } else if (!student){
            issue = true;
            res.status(consts.NOT_FOUND_CODE)
                .json({
                    error: consts.INCORRECT_MAHTA_ID
                });
        }
    });

    if (issue) return;

    // finding inviter
    await Student.findOne({code: inviterCode}, (err, inviter) => {

        if(err){
            errHandler(err, res);
            issue = true;

        } else if (inviter){ // if inviter was found

            // set the inviter
            studentToSave.inviter = inviter._id;

            inviterToSave = inviter;

        } else if (!inviter) { // if inviter was not found
            issue = true;
            res.status(consts.NOT).json(studentToRegister);
        }
    });

    if (issue) return;

    // saving student
    await studentToSave.save(err => {

        if (err) {
            issue = true;
            errHandler(err, res);
        }
    });

    // saving inviter
    await inviterToSave.save(err => {

        if (err) {
            errHandler(err, res);

        } else {
            res.status(consts.SUCCESS_CODE).json({
                firstName: inviterToSave.firstName,
                lastname: inviterToSave.lastName,
            });
        }
    });
}



module.exports = {signUp1, signUp2, getInfo};
