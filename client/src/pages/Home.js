import React, { Component } from 'react';
import './Home.css';
import Button from '../components/Button';
import {showNumber} from '../utils/NumberUtils'
import gift from '../assets/svg/gift.svg';
import credit from '../assets/svg/credit.svg';
import user from '../assets/svg/user.svg';
import LogoutHandler from '../handlers/LogoutHandler';
import InfoHandler from '../handlers/InfoHandler';
import CreditListModal from '../components/CreditListModal';
import InviteListModal from '../components/InviteListModal';
import GiftListModal from '../components/GiftListModal';

class HomePage extends Component {

    state={gift:0, credit:0, invites:0, main_title:"", sub_title:"",creditList:false, inviteList:false, giftList:false}

    static Info = {};

    componentDidMount(){

        InfoHandler((res)=>{
            
            HomePage.Info = res;

            let newState = Object.assign({}, this.state);
            newState.main_title = res.mainTitle;
            newState.sub_title = res.subTitle;

            this.setState(newState, ()=>{

                    
                this.showCreditList(HomePage.Info.creditList);
                this.showGiftList(HomePage.Info.giftList);
                this.showInviteList(HomePage.Info.inviteList);

                setTimeout(this.numbersAnim,400);
            })


        }, err=>{

            alert(err);
        });

        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }


    }


    render() { 
        return ( 
            <div className="home_con">
                <div className="con1">
                    <div className="home_header">
                        
                        <div className="exit_btn">
                            <Button fontSize="0.8em" height="100%" width="100%" onClick={this.logout}>خروج</Button>
                        </div>
                        <div style={s.bigSpace}/>
                        <div className="home_ictxt">سامانه مهتا</div>
                        
                    </div>
                    <div className="home_main_con">
                        <div className="home_big_txt">{this.state.main_title}</div>
                        <div className="home_line2"/>
                        <div className="home_small_txt">{this.state.sub_title}</div>
                        <div style={{height:'32%'}}/>
                    </div>
                </div>

                <div className="con4">

                    <div className="home_sec2">
                        <img onClick={this.openCreditList} className="home_svg_icon" src={credit}/>
                    </div>
                    <div className="home_sec2">
                        <img onClick={this.openInviteList} className="home_svg_icon" src={user}/>
                    </div>
                    <div className="home_sec2">
                        <img onClick={this.openGiftList} className="home_svg_icon" src={gift}/>
                    </div>

                </div>

                <div className="con2">

                    <div className="home_sec1" onClick={this.openCreditList}>
                        <div className="home_num1">{showNumber(this.state.credit)}</div>
                        <div className="home_line1"/>
                        <div className="home_txt1">مقدار اعتبار</div>
                    </div>
                    <div className="home_sec1" onClick={this.openInviteList}>
                        <div className="home_num1">{showNumber(this.state.invites)}</div>
                        <div className="home_line1"/>
                        <div className="home_txt1">تعداد دعوت</div>
                    </div>
                    <div className="home_sec1" onClick={this.openGiftList}>
                        <div className="home_num1">{showNumber(this.state.gift)}</div>
                        <div className="home_line1"/>
                        <div className="home_txt1">مقدار هدیه</div>
                    </div>
                </div>
                <div className="con3">

                </div>
                
                <CreditListModal open={this.state.creditList} onClose={this.closeCreditList} getCreditList={this.getCreditList}/>
                <InviteListModal open={this.state.inviteList} onClose={this.closeInviteList} getInviteList={this.getInviteList}/>
                <GiftListModal open={this.state.giftList} onClose={this.closeGiftList} list={this.state.listOfGifts} getGiftList={this.getGiftList}/>

            </div>
         );
    }

    getCreditList = (showList)=>{
        this.showCreditList = showList;
    }

    getGiftList = (showList)=>{
        this.showGiftList = showList;
    }

    getInviteList = (showList)=>{
        this.showInviteList = showList;
    }

    logout = ()=>{

        LogoutHandler(()=>{

            this.props.history.push("/login");
        })
    }

    numbersAnim=()=>{
        
        let credit = HomePage.Info.credit || 0;
        let invites = HomePage.Info.inviteList.length || 0;
        let gift = HomePage.Info.gift || 0;
        
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

    openCreditList = ()=>{

        let newState = Object.assign({},this.state);
        newState.creditList = true;
        this.setState(newState);
    }

    closeCreditList = ()=>{

        let newState = Object.assign({},this.state);
        newState.creditList = false;
        this.setState(newState);
    }

    openInviteList = ()=>{

        let newState = Object.assign({},this.state);
        newState.inviteList = true;
        this.setState(newState);
    }

    closeInviteList = ()=>{

        let newState = Object.assign({},this.state);
        newState.inviteList = false;
        this.setState(newState);
    }

    openGiftList = ()=>{

        let newState = Object.assign({},this.state);
        newState.giftList = true;
        this.setState(newState);
    }

    closeGiftList = ()=>{

        let newState = Object.assign({},this.state);
        newState.giftList = false;
        this.setState(newState);
    }
    
}

const s = {
    space:{
        height:'1%'
    }
}
 
export default HomePage;