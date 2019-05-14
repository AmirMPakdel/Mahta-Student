import React, {Component} from "react";
import './Login.css';

import Button from '../components/Button';
import Input from '../components/Input';
import urls from '../consts/urls';
import LoginHandler from '../handlers/LoginHandler';


class LoginPage extends Component{
    state={errorMassage:""}

    static code = 0;
    static registered = true;
    static invited = false;

    render(){

        return(
            
            <div style={s.con1}>

                <div className="con">
                    <div style={s.space}/>
                    <div unselectable style={s.title}>سامانه مهتا</div>
                    <div style={s.space}/>
                    <Input height={30} width="80%" placeholder="کد دانش آموزی یا کد کارت دعوت" onChange={(e)=>{LoginPage.code = Number(e.target.value)}}/>
                    <div style={s.space}/>
                    <Button height={50} width="60%" onClick={this.login} >ورود</Button>
                    <div style={s.error}>{this.state.errorMassage}</div>
                    <div style={s.miniSpace}/>
                    <div className="signup_link" onClick={this.signUp}>ثبت نام بدون کارت هدیه</div>
                    <div style={s.miniSpace}/>
                </div>

            </div>
        )
    }

    login = ()=>{

        LoginHandler({code:LoginPage.code}, (res)=>{

            if(res.registered){

                LoginPage.invited = false;
                LoginPage.registered = true;
                this.props.history.push("/");

            }else{

                LoginPage.invited = false;
                LoginPage.registered = false;
                this.props.history.push("/signup/step1");
            }

        }, (err)=>{

            let newState=Object.assign({}, this.state);
            newState.errorMassage = err;
            this.setState(newState);
        });
    }

    signUp = ()=>{

        LoginPage.invited = true;
        LoginPage.registered = false;
        this.props.history.push("/signup/step2");
    }
}

const s = {

    con1:{

        height:'95vh',
        width:'95vw',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },

    title:{

        textAlign:'center',
        fontSize:'2.2em',
        userSelect: 'none',
        fontFamily:'ebhar',
    },

    error:{

        height:20,
        fontFamily:'amp',
        fontSize:16,
        color:'#ff8935',
        textAlign:'center'
    },

    space:{
        height:20
    },

    miniSpace:{
        height:6,
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

export default LoginPage;