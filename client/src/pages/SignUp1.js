import React, {Component} from "react";
import './SignUp.css';
import {Redirect} from 'react-router-dom';
import LoginPage from './Login'; 

import Button from '../components/Button';
import Input from '../components/Input';
import lock from '../assets/svg/lock.svg';
import Select from 'react-select';
import {SignUpFirstStep} from '../handlers/SignUpHandler';
import SuccessModal from '../components/SuccessModal';
import ErrorModal from '../components/ErrorModal';

const emptyStudentInfo = {

    inviterCode:0,
    firstName:"",
    lastName:"",
    field:"",
    grade:"",
    phone:"",
}

class SignUpPage1 extends Component{
    state={askModal:false, errorModal:false, successModal:false,
        data:{firstName:"av"}, shouldValidateInputs:true, errorMassage:"", code:0}

    static studentInfo = emptyStudentInfo;

    render(){

        if(LoginPage.registered){

            return(<Redirect to="/"/>)
        }

        return(

            <div className="signup_con">
                <div style={s.space}/>
                <div className="signup_title_con">ثبت نام دانش آموز</div>

                <div style={s.miniSpace}/>
                <div className="signup_form_con">

                    <Input height={30} width={200} placeholder="نام"
                    onChange={(e)=>{SignUpPage1.studentInfo.firstName = e.target.value}}/>

                    <Input height={30} width={200} placeholder="نام خانوادگی"
                    onChange={(e)=>{SignUpPage1.studentInfo.lastName = e.target.value}}/>

                    <Select options={fieldOptions} styles={customStyles} 
                    placeholder="رشته" onChange={(e)=>{SignUpPage1.studentInfo.field = e.value}}/>
                    
                    <Select options={gradeOptions} styles={customStyles} 
                    placeholder="پایه" onChange={(e)=>{SignUpPage1.studentInfo.grade = e.value}}/>

                    <Input height={30} width={200} placeholder="شماره همراه" type="number"
                    onChange={(e)=>{SignUpPage1.studentInfo.code = e.target.value}}/>
                    
                </div>

                <div className="signup_space1"/>

                <div className="signup_accept">
                    <Button margin="0%" height="100%" width="100%" onClick={this.continue}>ادامه</Button>
                </div>

                <div className="signup_space1"/>
                
                <ErrorModal open={this.state.errorModal} onClose={this.closeErrorModal}>
                    خطا
                    <br/>
                    <br/>
                    {this.state.errorMassage}
                    <br/>
                </ErrorModal>
                
                <SuccessModal open={this.state.successModal} onClose={this.closeSuccessModal}>
                    <div style={{fontSize:'1.6em', color:'#ff2'}}>{126224}</div>
                    <br/>
                   این کد دانش آموزیته. باهاش میتونی از هدایا و اعتبارت استفاده کنی و وارد سامانه بشی
                    <br/>
                    <br/>
                    {"; ) یاداشتش کن حتما"}    
                    <br/>
                </SuccessModal>

            </div>
        )
    }

    continue=()=>{

        SignUpFirstStep(SignUpPage1.studentInfo, (res)=>{

            this.openSuccessModal(res.code);

        }, (err)=>{

            this.openErrorModal(err);
        })
        
    }

    openSuccessModal = (code)=>{

        let newState = Object.assign({}, this.state);
        newState.successModal = true;
        newState.code = code;
        this.setState(newState);
    }

    openErrorModal = (err)=>{

        let newState = Object.assign({}, this.state);
        newState.errorModal = true;
        newState.errorMassage = err;
        this.setState(newState);
    }

    closeSuccessModal = ()=>{

        let newState = Object.assign({}, this.state);
        newState.successModal = false;
        this.setState(newState);

        this.props.history.push('/signup/step2')
    }

    closeErrorModal = ()=>{

        let newState = Object.assign({}, this.state);
        newState.errorModal = false;
        this.setState(newState);
    }
}

const s = {

    con:{

        height:'100%',
        width:'100%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundImage: `url(${lock})`,
        backgroundSize:'auto',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 60%', 
    },

    con2:{
        
        display:'flex',
        opacity:0.85,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        height:440,
        width:380,
        borderRadius:12,
        boxShadow:'4px 4px 4px rgba(0,0,0,0.5)',
        backgroundColor:'rgb(220,96,36)',
    },

    error:{

        height:20,
        fontFamily:'amp',
        fontSize:16,
        color:'rgb(198, 15, 34)',
        textAlign:'center'
    },

    space:{
        height:20
    },

    miniSpace:{
        height:10
    },

    create:{

        position:'absolute',
        bottom:5,
        fontSize:10,
        fontFamily:'amp',
        color:'white',
    }
}

const customStyles = {

    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        color: state.isSelected ? 'red' : 'blue',
        padding: 20,
        fontFamily:"amp",
        fontSize:'0.9em',
      }),
      control: () => ({
        // none of react-select's styles are passed to <Control />
        width: 182,
        marginTop:15,
        marginBottom:15,
        marginRight:28,
        marginLeft:28, 
        height:40,
        display:'flex',
        flexDirection:'row',
        borderStyle:"solid",
        borderRadius:5,
        borderWidth:2,
        paddingLeft:20,
        paddingRight:10,
        fontFamily:"amp",
        fontSize:'0.9em',
        borderColor:'white',
        backgroundColor:'white'
      }),
      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
    
        return { ...provided, opacity, transition };
      }
}

const gradeOptions=[
    {value:"هفتم", label:"هفتم"},
    {value:"هشتم", label:"هشتم"},
    {value:"نهم", label:"نهم"},
    {value:"دهم", label:"دهم"},
    {value:"یازدهم", label:"یازدهم"},
    {value:"دوازدهم", label:"دوازدهم"},
    {value:"فارغ التحصیل", label:"فارغ التحصیل"}
]

const fieldOptions=[
    {value:"ریاضی", label:"ریاضی"},
    {value:"تجربی", label:"تجربی"},
    {value:"هنر", label:"هنر"},
    {value:"انسانی", label:"انسانی"},
]

const create=<div style={s.create}>&emsp;&emsp;&emsp;&emsp;برنامه نویسی و طراحی سایت : امیرمحمد پاکدل  &emsp; | &emsp; برنامه نویس سرور : محمد نوری</div>

export default SignUpPage1;