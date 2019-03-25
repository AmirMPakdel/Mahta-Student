import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Input from '../components/Input';
import Button from '../components/Button';
import StudentEditHandler from '../handlers/StudentEditHandler';
import DeleteStudentHandler from '../handlers/DeleteStudentHandler';
import Select from 'react-select';
import YesNoModal from '../components/YesNoModal';
import ErrorModal from '../components/ErrorModal';
import SuccessModal from '../components/SuccessModal';

const gradeOptions=[
    {value:"هفتم", label:"هفتم"},
    {value:"هشتم", label:"هشتم"},
    {value:"نهم", label:"نهم"},
    {value:"دهم", label:"دهم"},
    {value:"یازدهم", label:"یازدهم"},
    {value:"دوازدهم", label:"دوازدهم"},
    {value:"فارغ التحصیل", label:"فارغ التحصیل"}
]

const fieldOptions=[
    {value:"ریاضی", label:"ریاضی"},
    {value:"تجربی", label:"تجربی"},
    {value:"هنر", label:"هنر"},
    {value:"انسانی", label:"انسانی"},
]

  

class StudentEdit extends Component {
    state = { askModal:false, errorModal:false, successModal:false }

    constructor(props){

        super(props);
        this.StudentEditData = Object.assign({},Dashboard.selectedStudent);
        this.defaultGrade = "";
        this.defaultField = "";
        this.yesNoDialog = "";
        this.successDialog = "";
    }

    render() {

        if(this.StudentEditData.code === undefined){

            return(<Redirect to="/admin" />);

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
                        
                        <Input height={35} width={200} placeholder="نام خانوادگی" type="text"
                        defaultValue={this.StudentEditData.lastName}
                        ref={(ref=>this.lastNameInput = ref)}
                        onChange={(event)=>{this.StudentEditData.lastName = event.target.value}}/>

                        <Input height={35} width={200} placeholder="نام"type="text"
                        defaultValue={this.StudentEditData.firstName}
                        ref={(ref=>this.firstNameInput = ref)}
                        onChange={(event)=>{this.StudentEditData.firstName = event.target.value}}/>

                    </div>
                    
                    <div style={s.sec1}>

                        <Select options={fieldOptions} styles={customStyles} 
                        defaultValue={{value:this.StudentEditData.field, label:this.StudentEditData.field}} 
                        placeholder="رشته" onChange={(e)=>{this.StudentEditData.field = e.value}}/>

                        
                        <Input height={35} width={200} placeholder="مدرسه"type="text"
                        defaultValue={this.StudentEditData.school}
                        ref={(ref=>this.schoolInput = ref)}
                        onChange={(event)=>{this.StudentEditData.school = event.target.value}}/>
                        
                        <Select options={gradeOptions} styles={customStyles} 
                        defaultValue={{value:this.StudentEditData.grade, label:this.StudentEditData.grade}} 
                        placeholder="پایه" onChange={(e)=>{this.StudentEditData.grade = e.value}}/>
                        
                    </div>
                    
                    
                    <div style={s.sec1}>

                        <Input height={35} width={200} placeholder="شماره همراه"type="tel"
                        defaultValue={this.StudentEditData.phone}
                        ref={(ref=>this.phoneInput = ref)}
                        onChange={(event)=>{this.StudentEditData.phone = event.target.value}}/>

                        <Input height={35} width={200} placeholder="شماره منزل"type="tel"
                        defaultValue={this.StudentEditData.home}
                        ref={(ref=>this.homeInput = ref)}
                        onChange={(event)=>{this.StudentEditData.home = event.target.value}}/>

                    </div>

                    <div style={s.sec2}>

                        <Button height={50} type="red" width={200} onClick={this.OpenDeleteModal}>حذف</Button>

                        <Button height={50}  width={200} fontColor={"rgba(55, 110, 198,0.9)"} onClick={this.OpenEditModal}>ثبت</Button>

                    </div>
                    

                    <YesNoModal open={this.state.askModal} commit={this.askModalCommit} cancel={this.askModalClose}>
                        {this.yesNoDialog}
                    </YesNoModal>
                    
                    <ErrorModal open={this.state.errorModal} onClose={this.errorModalClose}>
                        {this.modalError}
                    </ErrorModal>
                    
                    <SuccessModal open={this.state.successModal} onClose={this.successModalClose}>
                        {this.successDialog}
                    </SuccessModal>

                </div>
            );
        }
    }

    OpenDeleteModal = ()=>{

        this.yesNoDialog="دانش آموز حذف گردد؟";
        this.successDialog="حذف دانش آموز با موفقیت انجام شد";
        this.modalType="delete";
        this.askModalOpen();
    }

    OpenEditModal = ()=>{
        this.yesNoDialog = "ثبت تغییرات با مشخصات زیر؟";
        this.successDialog = "عملیات ثبت تغییرات با موفقیت انجام شد";
        this.modalType="edit";
        this.askModalOpen();
    }

    deleteStudent = ()=>{

        DeleteStudentHandler({code:this.StudentEditData.code},
            (res)=>{
                
                Dashboard.StudentInfoList = [];

                this.successModalOpen();
            },
            (err)=>{
                
                this.modalError = err;
                this.errorModalOpen();
            });
    }

    commit = ()=>{

        StudentEditHandler(this.StudentEditData,
            (res)=>{

                Dashboard.StudentInfoList = [];

                Dashboard.selectedStudent = this.StudentEditData;
                
                this.successModalOpen();

            },(err)=>{

                this.errorModalOpen();
            }
        );
    }

    askModalCommit = ()=>{

        this.askModalClose();

        if(this.modalType == "edit"){
            this.commit();
        }else if(this.modalType == "delete"){
            this.deleteStudent();
        }
    }

    askModalOpen = ()=>{

        let newState = Object.assign({}, this.state);
        newState.askModal =true;
        this.setState(newState);
    }

    askModalClose = ()=>{

        let newState = Object.assign({}, this.state);
        newState.askModal =false;
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

    successModalOpen = ()=>{

        let newState = Object.assign({}, this.state);
        newState.successModal =true;
        this.setState(newState);
    }

    successModalClose = ()=>{

        let newState = Object.assign({}, this.state);
        newState.successModal =false;
        this.setState(newState);

        this.props.history.push("/admin");
    }
}

const s = {

    con:{
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

    delete_btn:{

        position:'absolute',
        top:120,
        right:150
    },

    sec1:{
        height:'15%',
        width:'60%',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-around',
        borderWidth:"1px",
        borderStyle:"solid",
        borderRadius:8,
        borderColor:'rgba(255,255,255,0.1)'
    },

    sec2:{
        height:'15%',
        width:'50%',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-around',
        borderWidth:"0px",
        borderStyle:"solid",
        borderRadius:8,
        borderColor:'rgba(255,255,255,0.1)'
    },

    space:{
        height:'5%',
    },
}

const customStyles = {

    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        color: state.isSelected ? 'red' : 'blue',
        padding: 20,
        fontFamily:"amp",
      }),
      control: () => ({
        // none of react-select's styles are passed to <Control />
        width: 100,
        display:'flex',
        flexDirection:'row',
        borderStyle:"solid",
        borderRadius:5,
        borderWidth:2,
        paddingLeft:20,
        paddingRight:10,
        fontFamily:"amp",
        borderColor:'white',
        backgroundColor:'white'
      }),
      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
    
        return { ...provided, opacity, transition };
      }
}

const setDefaultGrade = (grade)=>{
    
    
}
export default StudentEdit;