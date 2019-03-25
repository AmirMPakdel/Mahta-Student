import React, { Component } from 'react';
import Button from '../components/Button';
import { Redirect } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Label from '../components/Label';
import StudentGPListHandler from '../handlers/StudentGPListHandler';
import InvitesModal from '../components/InvitesModal';
import ErrorModal from '../components/ErrorModal';
import PurchaseModal from '../components/PurchaseModal';
import GiftsModal from '../components/GiftsModal';

class StudentInfo extends Component {
    
    state = { errorModal:false, invitesModal:false, 
        giftsModal:false, purchasesModal:false, gifts:[], purchases:[], inviterCode:""}     


    constructor(props){
        super(props);
        this.state.student = Dashboard.selectedStudent;
    }

    inviter = {};

    componentDidMount(){

        if(this.state.student.code != undefined){

            let inv_id = Dashboard.selectedStudent.inviter;
            let inv_code = "";
            Dashboard.StudentInfoList.forEach(s=>{
                if(s._id == inv_id){
                    this.inviter = s;
                }
            })

            StudentGPListHandler({code:this.state.student.code}, 
                (res)=>{

                    let newState = Object.assign({}, this.state);
                    newState.gifts = res.gifts;
                    newState.purchases = res.purchases;
                    newState.inviterCode = this.inviter.code;
                    
                    this.setState(newState);

                },(err)=>{

                    this.errorMassage = err;
                })
        }
    }

    render() { 

        if(this.state.student.code === undefined){

            return(
                <Redirect to="/admin" />
            );
        }else{

        return ( 
            
            <div style={{opacity:0.85,
                display:'flex',
                height:'78vh',
                minHeight:440,
                width:'80vw',
                minWidth:900,
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'space-around',
                borderRadius:15,
                backgroundColor:'rgb(55, 110, 198)'}}>

                <div style={s.space}/>
                
                <div style={s.sec1}>
                    <div style={s.row}>
                        <div style={s.column2}>
                            <Label text={this.state.student.lastName} label="نام خانوادگی"/>
                        </div>
                        <div style={s.column2}>
                            <Label text={this.state.student.firstName} label="نام "/>
                        </div>
                        <div style={s.column2}>
                            {/*<Label cursor="pointer" text={"\uD83D\uDEC8  "+this.state.inviterCode} label="کد معرف"/>*/}
                            <Label text={this.state.inviterCode} label="کد معرف"/>
                        </div>
                        <div style={s.column2}>
                            <Label text={this.state.student.code} label="کد خانواده"/>
                        </div>
                    </div>
                    <div style={s.row}>
                        <div style={s.column}>
                            <Label text={this.state.student.school} label="مدرسه"/>
                        </div>
                        <div style={s.column}>
                            <Label text={this.state.student.phone} label="شماره تماس"/>
                        </div>
                        <div style={s.column}>
                            <Label text={this.state.student.phone} label="شماره منزل"/>
                        </div>
                    </div>
                    <div style={s.row}>
                        <div style={s.column2}>
                            <Label text={this.state.student.gift} label="هدیه"/>
                        </div>
                        <div style={s.column2}>
                            <Label text={this.state.student.credit} label="اعتبار"/>
                        </div>
                        <div style={s.column2}>
                            <Label text={this.state.student.grade} label="پایه"/>
                        </div>
                        <div style={s.column2}>
                            <Label text={this.state.student.field} label="رشته"/>
                        </div>
                    </div>  
                </div>
                <div style={s.sec2}>
                    <div style={s.btn_sec}>
                        <Button height="65%" width="70%" onClick={this.invitesModalOpen}>لیست دعوت ها</Button>
                    </div>
                    <div style={s.btn_sec}>
                        <Button height="65%" width="70%" onClick={this.giftsModalOpen} 
                        list={this.state.gifts}>لیست هدایا</Button>
                    </div>
                    <div style={s.btn_sec}>
                        <Button height="65%" width="70%" onClick={this.purchasesModalOpen} 
                        list={this.state.purchases}>لیست خریدها</Button>
                    </div>
                </div>

                <div style={s.space}/>

                <InvitesModal open={this.state.invitesModal} onClose={this.invitesModalClose} updateInfo={this.updateInfo} history={this.props.history}/>
                <GiftsModal open={this.state.giftsModal} onClose={this.giftsModalClose} list={this.state.gifts}/>
                <PurchaseModal open={this.state.purchasesModal} onClose={this.purchasesModalClose} list={this.state.purchases}/>

                <ErrorModal open={this.state.errorModal} onClose={this.errorModalClose}>
                    {this.errorMassage}
                </ErrorModal>

            </div>
        );}
    }

    updateInfo = ()=>{

        let newState = Object.assign({}, this.state);
        newState.student = Dashboard.selectedStudent;
        newState.invitesModal=false;

        StudentGPListHandler({code:newState.student.code}, 
            (res)=>{

                newState.gifts = res.gifts;
                newState.purchases = res.purchases;
                
                this.setState(newState);

            },(err)=>{

                alert(err)
            })
    }

    getInviterCode = ()=>{

        

        //return("bb")
    }

    invitesModalOpen = ()=>{

        let newState = Object.assign({}, this.state);
        newState.invitesModal = true;
        this.setState(newState);
    }

    invitesModalClose = ()=>{

        let newState = Object.assign({}, this.state);
        newState.invitesModal = false;
        this.setState(newState);
    }

    giftsModalOpen = ()=>{

        let newState = Object.assign({}, this.state);
        newState.giftsModal = true;
        this.setState(newState);
    }

    giftsModalClose = ()=>{

        let newState = Object.assign({}, this.state);
        newState.giftsModal = false;
        this.setState(newState);
    }

    purchasesModalOpen = ()=>{

        let newState = Object.assign({}, this.state);
        newState.purchasesModal = true;
        this.setState(newState);
    }

    purchasesModalClose = ()=>{

        let newState = Object.assign({}, this.state);
        newState.purchasesModal = false;
        this.setState(newState);
    }

    errorModalOpen = ()=>{

        let newState = Object.assign({}, this.state);
        newState.errorModal =true;
        this.setState(newState);
    }

    errorModalClose = ()=>{

        let newState = Object.assign({}, this.state);
        newState.errorModal =false;
        this.setState(newState);
    }
}

const s = {

    container:{
        opacity:0.88,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-around',
        height:480,
        width:1100,
        borderRadius:15,
        backgroundColor:'rgb(55, 110, 198)',
    },

    sec1:{
        height:'45%',
        width:'90%',
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'column'
    },

    sec2:{
        display:'flex',
        height:'20%',
        justifyContent:'space-between',
        width:'90%',
    },

    btn_sec:{

        height:'100%',
        width:'32.5%',
    },

    row:{
        display:'flex',
        justifyContent:'space-between',
        height:'31.5%',
        width:'100%',
    },

    column:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        height:'100%',
        width:'32.9%',
        borderRadius:8,
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'rgba(255,255,255,0.15)'
    },

    column2:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        height:'100%',
        width:'24.55%',
        borderRadius:8,
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'rgba(255,255,255,0.15)'
    },

    space:{
        height:'5%',
    }
}
 
export default StudentInfo;