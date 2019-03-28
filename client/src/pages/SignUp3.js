import React, {Component} from "react";
import './SignUp.css';
import Button from '../components/Button';
import Input from '../components/Input';
import urls from '../consts/urls';
import lock from '../assets/svg/lock.svg'
import SignUpPage1 from "./SignUp1";


class SignUpPage3 extends Component{
    state={errorMassage:""}

    password = "";
    re_enter = "";

    render(){

        return(

            <div className="signup_con">

                <div className="signup_title_con">ثبت رمزعبور</div>

                <div className="signup_step3_form_con">

                    <Input height={30} width={200} placeholder="رمزعبور"/>

                    <Input height={30} width={200} placeholder="تکرار رمزعبور"/>
                    
                </div>

                <Button onClick={this.signup}>ثبت</Button>
                

            </div>
        )
    }

    signup = ()=>{

        alert(JSON.stringify(SignUpPage1.studentInfo));
    }

    authenticate = ()=>{

        fetch(urls.authenticate, 
        {method:"POST", 
        body: JSON.stringify({username:this.username, password:this.password}),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'})
        .then(res => {

            if(res.status === 200 ){

                this.props.history.push("/admin")

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
    }
}

export default SignUpPage3;