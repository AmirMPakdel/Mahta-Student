import React, {Component} from "react";
import './SignUp.css';

import Button from '../components/Button';
import Input from '../components/Input';
import lock from '../assets/svg/lock.svg';
import YesNoModal from '../components/YesNoModal';
import SuccessModal from '../components/SuccessModal';
import ErrorModal from '../components/ErrorModal';

class SignUpPage1 extends Component{
    state={askModal:false, errorModal:false, successModal:false,
        data:{firstName:"av"}, shouldValidateInputs:true}

    static studentInfo = {

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

    render(){

        return(

            <div className="signup_con">

                <div className="signup_title_con">ثبت نام دانش آموز</div>

                <div className="signup_form_con">

                    <Input height={30} width={200} placeholder="نام"
                    onChange={(e)=>{SignUpPage1.studentInfo.firstName = e.target.value}}/>

                    <Input height={30} width={200} placeholder="نام خانوادگی"
                    onChange={(e)=>{SignUpPage1.studentInfo.lastName = e.target.value}}/>

                    <Input height={30} width={200} placeholder="کد هدیه" type="number"
                    onChange={(e)=>{SignUpPage1.studentInfo.code = e.target.value}}/>
                    
                    <Input height={30} width={200} placeholder="کد دعوت کننده" type="number"
                    onChange={(e)=>{SignUpPage1.studentInfo.inviterCode = e.target.value}}/>
                    
                </div>

                <Button onClick={this.continue}>ادامه</Button>

                <YesNoModal open={this.state.askModal} commit={this.askModalCommit} cancel={this.askModalClose}>
                        {this.yesNoDialog}
                    </YesNoModal>
                    
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
        height:30
    },

    create:{

        position:'absolute',
        bottom:5,
        fontSize:10,
        fontFamily:'amp',
        color:'white',
    }
}
const create=<div style={s.create}>&emsp;&emsp;&emsp;&emsp;برنامه نویسی و طراحی سایت : امیرمحمد پاکدل  &emsp; | &emsp; برنامه نویس سرور : محمد نوری</div>

export default SignUpPage1;