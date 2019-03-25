import React, { Component } from 'react';

class PlainText extends Component {

    state = {  }
    
    clear(){
        this.textarea.value="";
    }

    render() { 
        return ( 
            <textarea placeholder={this.props.placeholder} type="text" onChange={this.props.onChange}
            maxLength={2000} ref={ref=>this.textarea=ref}
            
            style={{
                
                height:this.props.height,
                width:this.props.width,
                verticalAlign:'top',
                textAlign:'right',
                borderColor:'white',
                borderRadius:8,
                padding:'6px 8px',
                backgroundColor:'white',
                margin:15,
                fontFamily:'amp',
                fontSize:15,
                
            }}>
              
            </textarea>
         );
    }
}
 
export default PlainText;