import React, {Component} from "react";
import Button from '../components/Button';
import Input from '../components/Input';
import urls from '../consts/urls';
import lock from '../assets/svg/lock.svg'


class SignUpPage extends Component{
    state={errorMassage:""}

    username = "";
    password = "";

    render(){

        return(

            <div style={s.con}>

                <div style={s.con2}>
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

export default SignUpPage;