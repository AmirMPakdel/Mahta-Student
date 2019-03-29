import React, {Component} from "react";
import './Login.css';

import Button from '../components/Button';
import Input from '../components/Input';
import urls from '../consts/urls';
import lock from '../assets/svg/lock.svg';


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
                    <div style={s.signup_txt} onClick={this.signUp}>ورود به بخش ثبت نام</div>
                </div>

            </div>
        )
    }

    authenticate = ()=>{

        fetch(urls.authenticate, 
        {method:"POST", 
        body: JSON.stringify({code:this.code, password:this.password}),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'})
        .then(res => {

            if(res.status === 200 ){

                this.props.history.push("/")

            }else if(res.status === 500){

                let newState=Object.assign({}, this.state);
                    newState.errorMassage="خطای اختلال در سرور";
                    this.setState(newState);

            }else{

                res.json().then(res=>{

                    let newState=Object.assign({}, this.state);
                    newState.errorMassage=res.error;
                    this.setState(newState);
                });
            }
        })
        .catch(err => {
            
            let newState=Object.assign({}, this.state);
            newState.errorMassage="خطای اتصال به سرور";
            this.setState(newState);
        });
    }


    signUp = ()=>{

        this.props.history.push('/signup/step1');
    }
}

const s = {

    con1:{

        height:'95vh',
        width:'95vw',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        //backgroundImage: `url(${lock})`,
        //backgroundSize:'auto',
        //backgroundRepeat: 'no-repeat',
        //backgroundPosition: '50% 50%', 
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

    signup_txt:{

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

export default LoginPage;