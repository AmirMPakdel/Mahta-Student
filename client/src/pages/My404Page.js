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
                minWidth:800,
                height:85,
                borderTopLeftRadius:15,
                borderTopRightRadius:15,
                width:this.state.width,
                backgroundColor:'rgb(63,74,80)'}}>

                <div style={s.logo_con}>

                <div style={s.icon}>
                    <div unselectable style={{fontFamily:'ebhar', color:'white', 
                    fontSize:55, userSelect: 'none' }}>ادمین&thinsp;</div>
                    <div unselectable style={{fontFamily:'ebhar', color:'rgb(220,96,36)', 
                    fontSize:55, userSelect: 'none' }}>مهتا</div>
                </div>
                </div>
                
            </div>

            <div style={{opacity:0.85,
                display:'flex',
                height:'78vh',
                minHeight:440,
                width:'80vw',
                minWidth:800,
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'space-around',
                borderBottomLeftRadius:15,
                borderBottomRightRadius:15,
                backgroundColor:'rgb(216,92,32)'}}>

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
        fontSize:30
    },

    icon:{

        flexDirection:'row',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
}
 
export default My404Page;