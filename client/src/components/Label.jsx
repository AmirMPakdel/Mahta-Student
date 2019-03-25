import React, { Component } from 'react';

class Label extends Component {
    state = {  }
    render() { 

        let cursor = this.props.cursor || "default";

        return ( 
            <div style={s.con}>
                <div style={{
                    cursor:cursor,
                    color:'white',
                    fontFamily:'amp',
                    fontSize:20,
                    textAlign:'right',
                    width:'60%',
                    paddingTop:2,
                    paddingBottom:2,
                }}>{this.props.text}</div>
                <div style={s.label}>{" : "+this.props.label}</div>

            </div>
        );
    }
}

const s={

    con:{
        display:'flex',
        alignItems:'center',
        height:50,
        width:'95%',
        
    },

    label:{

        color:'white',
        fontFamily:'amp',
        fontSize:16,
        textAlign:'right',
        width:'40%',
        paddingTop:2,
        paddingBottom:2
    }
}
 
export default Label;