import React, {Component} from "react";
import './SignUp.css';

import Button from '../components/Button';
import Input from '../components/Input';
import lock from '../assets/svg/lock.svg';
import Select from 'react-select';
import SuccessModal from '../components/SuccessModal';
import ErrorModal from '../components/ErrorModal';

const emptyStudentInfo = {

    code:0,
    inviterCode:0,
    password:"",
    firstName:"",
    lastName:"",
    field:"",
    grade:"",
    phone:"",
    school:""
}

class SignUpPage1 extends Component{
    state={askModal:false, errorModal:false, successModal:false,
        data:{firstName:"av"}, shouldValidateInputs:true}

    static studentInfo = emptyStudentInfo;

    render(){

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
                
                <ErrorModal open={this.state.errorModal} onClose={this.errorModalClose}>
                    {this.modalError}
                </ErrorModal>
                
                <SuccessModal open={this.state.successModal} onClose={this.successModalClose}>
                    {this.successDialog}
                </SuccessModal>

            </div>
        )
    }

    continue=()=>{

        this.props.history.push('/signup/step2');
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