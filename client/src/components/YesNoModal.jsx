import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import Button from './Button';

class YesNoModal extends Component {
    state = {  }
    render() { 
        return ( 
            <Modal styles={{modal:s.con, closeButton:{...{cursor:"pointer"}}}} open={this.props.open} onClose={this.props.onClose} showCloseIcon={false} center>
                <h2 style={s.text}>{this.props.children}</h2>
                <div style={s.sec}>
                    <Button type="green" onClick={this.props.commit}>ثبت</Button>
                    <Button type="red" onClick={this.props.cancel}>لغو</Button>
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
        width:'30%',
        minWidth:200,
        borderRadius:5,
        //backgroundColor:'rgb(216,92,32)'
    },

    sec:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },

    text:{
        color:'rgb(80,80,80)',
        fontFamily:'amp',
        textAlign:'right',
    }
}
 
export default YesNoModal;