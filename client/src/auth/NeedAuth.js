import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

function NeedAuth(Comp,prop) {
  return class extends Component {

    constructor(props){
      super(props);

      this.prop = prop;
    }

    state = {component:null, height:0, width:0};

    componentDidMount() {
      // TODO: change this to POST
      fetch('/api/student/checkToken',{
        method:"POST",
        body: "",
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
        })
      .then(res => {
        if (res.status === 200) {
            
          this.setState({component:<Comp history={this.props.history}/>});
        
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({component:<Redirect to="/login" />});
      });
    }


    render() {
      
        return(<div>{this.state.component}</div>);
    }
  }
}

export default NeedAuth;