import React, { Component } from 'react';

class Button extends Component {
    state = {  }

    render() { 

        if(this.props.type === undefined){

            return(
                <button style={{height:this.props.height, 
                    width:this.props.width, 
                    margin:15,
                    fontFamily:'amp',
                    fontWeight:'bold', 
                    fontSize:24, 
                    padding:'5px 15px',
                    borderRadius:4, 
                    borderWidth:0,
                    boxShadow:'4px 4px 4px rgba(0,0,0,0.5)', 
                    backgroundColor:'rgba(255,255,255,0.9)',
                    borderColor:'rgba(255,255,255,0.9)', 
                    cursor:'pointer',
                    color:this.props.fontColor || 'rgb(65,76,82)'}} 
                onClick={this.props.onClick}>
                    {this.props.children}
                </button>
            );

        }else if(this.props.type == "red"){

            return(
                <button style={{height:this.props.height, 
                    width:this.props.width, 
                    cursor:'pointer',
                    margin:15,
                    fontFamily:'amp',
                    fontWeight:'bold', 
                    fontSize:24, 
                    padding:'5px 15px',
                    borderRadius:4, 
                    borderWidth:0,
                    boxShadow:'4px 4px 4px rgba(0,0,0,0.5)', 
                    backgroundColor:'rgb(221, 28, 61)',
                    borderColor:'rgba(255,255,255,0.9)', 
                    color:'white'}} 
                onClick={this.props.onClick}>
                    {this.props.children}
                </button>
            );

        }else if(this.props.type == "green"){

            return(
                <button style={{height:this.props.height, 
                    width:this.props.width, 
                    cursor:'pointer',
                    margin:15,
                    fontFamily:'amp',
                    fontWeight:'bold', 
                    fontSize:24, 
                    padding:'5px 15px',
                    borderRadius:4, 
                    borderWidth:0,
                    boxShadow:'4px 4px 4px rgba(0,0,0,0.5)', 
                    backgroundColor:'rgb(33, 175, 71)',
                    borderColor:'rgba(255,255,255,0.9)', 
                    color:'white'}} 
                onClick={this.props.onClick}>
                    {this.props.children}
                </button>
            );
        }
    }
}
 
export default Button;