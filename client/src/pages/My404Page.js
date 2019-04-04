import React, { Component } from 'react';

class My404Page extends Component {
    state = {  }
    render() { 
        return ( 
        
            <div>
                <div style={{
                display:'flex',
                justifyContent:'center',
                margin:0,
                width:'80vw',
                maxWidth:800,
                height:85,
                borderTopLeftRadius:15,
                borderTopRightRadius:15,
                width:this.state.width,
                backgroundColor:'rgb(63,74,80)'}}>

                <div style={s.logo_con}>

                <div style={s.icon}>
                    <div unselectable style={{fontFamily:'ebhar', color:'white', 
                    fontSize:'2.2em', userSelect: 'none' }}>مهتا&thinsp;</div>
                    <div unselectable style={{fontFamily:'ebhar', color:'rgb(255, 22, 96)', 
                    fontSize:'2.2em', userSelect: 'none' }}>سامانه</div>
                </div>
                </div>
                
            </div>

            <div style={{opacity:0.85,
                display:'flex',
                height:'78vh',
                maxHeight:440,
                width:'80vw',
                maxWidth:800,
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'center',
                borderBottomLeftRadius:15,
                borderBottomRightRadius:15,
                backgroundImage:'linear-gradient(to bottom right, rgb(255, 70, 38), rgb(255, 22, 96))'}}>

                    <div style={s.text}>خطای 404</div>
                    <br/>
                    <div style={s.text}>!صفحه مورد نظر یافت نشد</div>

                </div>
            </div>);
    }
}

const s ={
    logo_con:{

        flexDirection:'row',
        display:'flex',
        justifyContent:'space-around',
        height:'100%',
        width:'20%',
    },

    text:{
        color:'white',
        fontFamily:'amp',
        fontSize:'1.5em'
    },

    icon:{

        flexDirection:'row',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
}
 
export default My404Page;