import React, { Component } from 'react';
import './Home.css';
import Button from '../components/Button';
import {showNumber} from '../utils/NumberUtils'
import gift from '../assets/svg/gift.svg';
import credit from '../assets/svg/credit.svg';
import user from '../assets/svg/user.svg';

class HomePage extends Component {

    state={gift:0, credit:0, invites:0}
    componentDidMount(){

        setTimeout(this.numbersAnim,1);
    }

    render() { 
        return ( 
            <div className="home_con">
                <div className="con1">
                    <div className="home_header">
                        
                        <div className="exit_btn">
                            <Button fontSize="0.8em" height="100%" width="100%">خروج</Button>
                        </div>
                        <div style={s.bigSpace}/>
                        <div className="home_ictxt">سامانه مهتا</div>
                        
                    </div>
                    <div className="home_main_con">
                        <div className="home_big_txt">{"سال نو مبارک"}</div>
                        <div className="home_line2"/>
                        <div className="home_small_txt">{"میتونی برای دیدن لیست کسایی که دعوت کردی ، هدایای که از مهتا گرفتی و اعتباری که بدست آوردی روی آیکون مخصوص خودشون کلیک کنی"}</div>
                        <div style={{height:'32%'}}/>
                    </div>
                </div>

                <div className="con4">

                    <div className="home_sec2">
                        <img className="home_svg_icon" src={credit}/>
                    </div>
                    <div className="home_sec2">
                        <img className="home_svg_icon" src={user}/>
                    </div>
                    <div className="home_sec2">
                        <img className="home_svg_icon" src={gift}/>
                    </div>

                </div>

                <div className="con2">

                    <div className="home_sec1">
                        <div className="home_num1">{showNumber(this.state.credit)}</div>
                        <div className="home_line1"/>
                        <div className="home_txt1">مقدار اعتبار</div>
                    </div>
                    <div className="home_sec1">
                        <div className="home_num1">{showNumber(this.state.invites)}</div>
                        <div className="home_line1"/>
                        <div className="home_txt1">تعداد دعوت</div>
                    </div>
                    <div className="home_sec1">
                        <div className="home_num1">{showNumber(this.state.gift)}</div>
                        <div className="home_line1"/>
                        <div className="home_txt1">مقدار هدیه</div>
                    </div>
                </div>
                <div className="con3">

                </div>
            </div>
         );
    }

    numbersAnim=()=>{
        let credit = 50;
        let invites = 20;
        let gift = 2;

        
        let credit_int = Number.parseInt(credit/803);
        let gift_int = Number.parseInt(gift/803);

        if(credit_int == 0){

            credit_int = credit;
        }

        if(gift_int == 0){

            gift_int = gift;
        }

        let gift_mod = gift%gift_int;
        let credit_mod = credit%credit_int;

        let creditIntv = setInterval(()=>{
            if(this.state.credit < credit){
                let newState = Object.assign({}, this.state);
                newState.credit+=credit_int;
                if(newState.credit + credit_mod == credit){
                    newState.credit+= credit_mod;
                }
                this.setState(newState)
            }else{

                clearInterval(creditIntv);

                let invitesIntv = setInterval(()=>{

                    if(this.state.invites < invites){
                        let newState = Object.assign({}, this.state);
                        newState.invites+=1;
                        this.setState(newState)
                    
                    }else{

                        clearInterval(invitesIntv);

                        let giftIntv = setInterval(()=>{

                            if(this.state.gift < gift){

                                let newState = Object.assign({}, this.state);
                                newState.gift+=gift_int;
                                if(newState.gift + gift_mod == gift){
                                    newState.gift+= gift_mod;
                                }
                                this.setState(newState)
                            }else{
                                clearInterval(giftIntv);
                            }
                        }, 2)
                    }

                },50)
            }
        },2)
    }
}

const s = {
    space:{
        height:'1%'
    }
}
 
export default HomePage;