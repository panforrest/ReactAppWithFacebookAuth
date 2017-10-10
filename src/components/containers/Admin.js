import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class Admin extends Component {

  constructor(){
  	super()
  	this.state = {
      
  	}
  }

  componentDidMount(){
  	console.log('componentDidMount: ')
  	this.props.currentUser()
  	.then(data => {
  	  console.log('Current user: ' + JSON.stringify(data))
  	})
  	.catch(err => {
  	  console.log('No current user')
  	})
  }

  render(){
    const currentUser = this.props.user.currentUser // CAN BE null

    return (
      <div className="container">
       {(this.props.user.currentUser == null) ? null :
         <h2>{currentUser.username}</h2>
       } 
      </div>
    )
  }
}

const stateToProps = (state) => {
  return{
    user: state.user
  }
}

const dispatchToProps = (dispatch) => {
  return{
  	currentUser: () => dispatch(actions.currentUser())
  }
}

export default connect(stateToProps, dispatchToProps)(Admin)