import React, {Component} from "react";
import './SignUp.css';
import Button from '../components/Button';
import Input from '../components/Input';
import urls from '../consts/urls';
import lock from '../assets/svg/lock.svg'
import SuccessModal from '../components/SuccessModal';
import ErrorModal from '../components/ErrorModal';


class SignUpPage2 extends Component{

    state={errorModal:false, successModal:false}

    render(){

        return(

            <div className="signup_con">

                <div style={{height:1}}/>
                    <div className="signup_title_con">ثبت معرف دانش آموز</div>
                <div style={s.miniSpace}/>
                

                <div style={s.con1}>
                    <div className="signup_form_con">
                        <Input height={30} width={200} placeholder="کد معرف"/>
                    </div>
                    <div style={s.space}/>

                    <div style={s.link_text} onClick={this.signUp}>ثبت نام بدون معرف</div>
                </div>

                <div className="signup_space1"/>

                <div className="signup_accept">
                    <Button margin="0%" height="100%" width="100%" onClick={this.continue}>ثبت</Button>
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

        this.props.history.push('/');
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