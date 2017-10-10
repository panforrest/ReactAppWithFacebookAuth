import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class Home extends Component {
  constructor(){
  	super()
  	this.state = {
  	  username: '',
  	  password: ''
  	}
  }

  updateVisitor(attr, event){
    console.log('updateVisitor: '+ attr + ' == ' + event.target.value)
    if (attr == 'username'){
      this.setState({
        username: event.target.value
      })
    }

    if (attr == 'password'){
      this.setState({
        password: event.target.value
      })
    }    
  }

  registerVisitor(event){
    console.log('registerVisitor: ' + JSON.stringify(this.state))
    this.props.register(this.state)
    .then(data => {
      console.log('USER CREATED: ' + JSON.stringify(data))
    })
    .catch(err => {
      alert('Error: ' + err.message)
    })
  }

  render(){
  	return(
      <div className="container">
        <h1>Welcome to FB-App</h1>
        <input onChange={this.updateVisitor.bind(this, "username")} type="text" placeholder="username" /><br />
        <input onChange={this.updateVisitor.bind(this, "password")} type="password" placeholder="password" /><br />
        <button onClick={this.registerVisitor.bind(this)}>Join</button>
      </div>
  	)
  }
} 

const stateToProps = (state) => {
  return{

  }
}

const dispatchToProps = (dispatch) => {
  return{
  	register: (visitor) => dispatch(actions.register(visitor))
  }
}

export default connect(stateToProps, dispatchToProps)(Home)