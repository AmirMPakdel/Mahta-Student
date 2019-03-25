import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

class ErrorModal extends Component {
    state = {  }
    render() { 
        return ( 
            <Modal styles={{modal:s.con}} open={this.props.open} onClose={this.props.onClose} center>
                <h2 style={s.err}>{this.props.children}</h2>
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
        borderColor:'#db3b3b',
        borderWidth:2,
    },

    err:{
        fontFamily:'amp',
        textAlign:'right',
    }
}
 
export default ErrorModal;