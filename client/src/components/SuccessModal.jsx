import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

class SuccessModal extends Component {
    state = {  }
    render() { 
        return ( 
            <Modal styles={{modal:s.con, closeButton:{...{cursor:"pointer"}}}} open={this.props.open} onClose={this.props.onClose} center>
                <h2 style={s.text}>{this.props.children}</h2>
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
        borderStyle:'solid',
        borderColor:'#129e00',
        borderWidth:2,
    },

    text:{
        color:'rgb(80,80,80)',
        fontFamily:'amp',
        textAlign:'right',
    }
}
 
export default SuccessModal;