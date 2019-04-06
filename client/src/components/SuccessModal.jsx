import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

const exit_btn_style= {cursor:"pointer", backgroundColor:'white', borderRadius:100, borderStyle:'solid',borderWidth:2, borderColor:'rgba(100,100,100,0.8)'};

class SuccessModal extends Component {
    state = {  }
    render() { 
        return ( 
            <Modal styles={{modal:s.con, closeButton:{...exit_btn_style}}} open={this.props.open} onClose={this.props.onClose} center>
                <div style={s.sec1}>
                    <div style={s.text}>{this.props.children}</div>
                </div>
            </Modal>
         );

    }
}

const s = {

    con:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'auto',
        minWidth:200,
        borderRadius:5,
        borderStyle:'solid',
        borderColor:'green',
        borderWidth:3,
    },

    sec1:{

        opacity:0.8,
        margin:'3vh 3vw',
        borderRadius:5,
        padding:'2.5vh 3vw',
        backgroundImage:'linear-gradient(to bottom right, rgb(255, 70, 40), rgb(212, 20, 100))'
    },

    text:{
        color:'rgb(80,80,80)',
        fontFamily:'amp',
        fontSize:'1.2em',
        textAlign:'center',
        padding:10,
        color:'white'
    }
}
 
export default SuccessModal;