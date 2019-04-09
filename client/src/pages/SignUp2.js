import React, {Component} from "react";
import './SignUp.css';
import Button from '../components/Button';
import Input from '../components/Input';
import lock from '../assets/svg/lock.svg';
import {SignUpLastStep} from '../handlers/SignUpHandler';
import SuccessModal from '../components/SuccessModal';
import ErrorModal from '../components/ErrorModal';


class SignUpPage2 extends Component{

    state={errorModal:false, successModal:false, inviter:'', errorMassage:''}

    inviterCode = 0;

    render(){

        return(

            <div className="signup_con">

                <div style={{height:1}}/>
                    <div className="signup_title_con">ثبت معرف دانش آموز</div>
                <div style={s.miniSpace}/>
                

                <div style={s.con1}>
                    <div className="signup_form_con">
                        <Input height={30} width={200} placeholder="کد معرف" 
                        onChange={e=>this.inviterCode=Number(e.target.value)}/>
                    </div>
                    <div style={s.space}/>

                    <div style={s.link_text} onClick={this.continue}>ثبت نام بدون معرف</div>
                </div>

                <div className="signup_space1"/>

                <div className="signup_accept">
                    <Button margin="0%" height="100%" width="100%" onClick={this.commit}>ثبت</Button>
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
                    <div style={{fontSize:'1.6em', color:'#ff2'}}>امیرمحمد پاکدل</div>
                    <br/>
                    به عنوان کسی که تورو معرفی کرده ثبت شد
                    <br/>
                </SuccessModal>

            </div>
        )
    }

    commit=()=>{

        SignUpLastStep({inviterCode:this.inviterCode}, (res)=>{

            this.openSuccessModal(res);

        }, (err)=>{

            this.openErrorModal(err);
        })
        
    }

    continue = ()=>{

        this.props.history.push('/');
    }

    openSuccessModal = (res)=>{

        let newState = Object.assign({}, this.state);
        newState.successModal = true;
        newState.inviter = res.lastName+" "+res.firstName;
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

        this.props.history.push('/')
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

    con1:{

        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        //backgroundColor:'red',
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

    link_text:{

        cursor:'pointer',
        fontFamily:'amp',
        textAlign:'center',
        fontSize:16,
        borderStyle:'solid',
        borderTopWidth:0,
        borderRightWidth:0,
        borderLeftWidth:0,
        borderBottomWidth:1,
        paddingBottom:2,
        marginTop:5,
        color:'white'
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

export default SignUpPage2;