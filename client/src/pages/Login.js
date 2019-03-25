import React, {Component} from "react";
import './Login.css';


import Button from '../components/Button';
import Input from '../components/Input';
import urls from '../consts/urls';
import lock from '../assets/svg/lock.svg'


class LoginPage extends Component{
    state={errorMassage:""}

    username = "";
    password = "";

    render(){

        return(

            <div style={s.con1}>

                <div className="con">
                    <div style={s.space}/>
                    <Input height={30} width="80%" placeholder="نام کاربری" onChange={(e)=>{this.username = e.target.value}}/>
                    <Input height={30} width="80%" placeholder="رمز عبور" type={"password"}onChange={(e)=>{this.password = e.target.value}}/>
                    <Button height={50} width="60%" onClick={this.authenticate} >ورود</Button>
                    <div style={s.error}>{this.state.errorMassage}</div>
                </div>

            </div>
        )
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

    con1:{

        height:'95vh',
        width:'95vw',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundImage: `url(${lock})`,
        backgroundSize:'auto',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%', 
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

export default LoginPage;