import React, {Component} from "react";
import './Login.css';

import Button from '../components/Button';
import Input from '../components/Input';
import urls from '../consts/urls';
import LoginHandler from '../handlers/LoginHandler';


class LoginPage extends Component{
    state={errorMassage:""}

    code = "";

    render(){

        return(
            
            <div style={s.con1}>

                <div className="con">
                    <div style={s.space}/>
                    <div unselectable style={s.title}>سامانه مهتا</div>
                    <div style={s.space}/>
                    <Input height={30} width="80%" placeholder="کد دانش آموزی" onChange={(e)=>{this.code = e.target.value}}/>
                    <div style={s.space}/>
                    <Button height={50} width="60%" onClick={this.authenticate} >ورود</Button>
                    <div style={s.error}>{this.state.errorMassage}</div>
                    <div style={s.miniSpace}/>
                    <div className="signup_link" onClick={this.signUp}>ورود به بخش ثبت نام</div>
                    <div style={s.miniSpace}/>
                </div>

            </div>
        )
    }

    signUp = ()=>{

        LoginHandler({code:this.code}, (res)=>{

            if(res.registered){

                this.props.history.push("/");
            
            }else{

                this.props.history.push("/signup/step1");
            }

        }, (err)=>{

            let newState=Object.assign({}, this.state);
            newState.errorMassage = err;
            this.setState(newState);

        });
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