import React, { Component } from 'react';

class HomePage extends Component {


    componentDidMount(){

        
    }

    render() { 
        return ( 
            <div style={s.bg}>
                <div style={{opacity:0.85,
                            display:'flex',
                            height:'78vh',
                            minHeight:440,
                            width:'86vw',
                            minWidth:900,
                            flexDirection:'column',
                            alignItems:'center',
                            justifyContent:'space-around',
                            borderRadius:15,
                            backgroundColor:'rgb(216,92,32)'}}>

                    <div style={s.space}/>

                </div>
            </div>
         );
    }
}

const s = {

    bg:{

        height:'100%',
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
    },

    container:{
        
        opacity:0.85,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-around',
        height:'70%',
        width:'80%',
        borderRadius:15,
        backgroundColor:'rgb(216,92,32)',
    },

    list_con:{
        
        height:'80%',
        width:'95%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:12,
        backgroundColor:'white'
    },

    space:{
        height:'1%'
    }
}
 
export default HomePage;