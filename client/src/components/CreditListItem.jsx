import React, { Component } from 'react';
let jalaali = require('jalaali-js');

class CreditListItem extends Component {
    state = {  }
    render() { 

        let JDate = "";

        let date = this.props.element.created;
        let year = Number(date.slice(0,4));
        let month = Number(date.slice(5,7));
        let day = Number(date.slice(8,10));

        let temp = jalaali.toJalaali(year,month,day);

        JDate = temp.jy+"/"+temp.jm+"/"+temp.jd;
        

        return ( 
            <div style={s.con}>
                <div style={{width:'2vw'}}/>
                <div style={s.sec}>{JDate}&emsp;</div>
                <div style={s.sec}>{this.props.element.credit}&emsp;</div>
                <div style={s.sec2}>{this.props.element.name}&emsp;</div>
                <div className="lm_space1"/>
            </div>
         );
    }
}

const s = {

    con:{
        display:'flex',
        height: 25,
        width:'99.8%',
        marginBottom:4,
        borderStyle:"solid",
        borderWidth:0,
        borderRadius:5,
        borderColor:'rgb(216,92,32)',
        backgroundColor:'white'
    },

    sec:{
        height:'100%',
        width:'23vw',
        marginRight:'1vw',
        textAlign:'center',
        borderRadius:2,
        fontFamily:'amp',
        backgroundColor:'rgb(210,210,210)'
    },

    sec2:{
        height:'100%',
        width:'36vw',
        marginRight:'1vw',
        textAlign:'right',
        borderRadius:2,
        fontFamily:'amp',
        backgroundColor:'rgb(210,210,210)'
    }
}
 
export default CreditListItem;