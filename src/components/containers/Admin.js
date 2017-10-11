import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class Admin extends Component {

  constructor(){
  	super()
  	this.state = {
      firstName:'',
      lastName:'',
      email:''
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

  updateCurrentUser(attr, event){
    // console.log(attr + ' == ' + event.target.value)
    if (attr == 'firstName'){
      this.setState({
        firstName: event.target.value 
      })
    }

    if (attr == 'lastName'){
      this.setState({
        lastName: event.target.value 
      })
    }

    if (attr == 'email'){
      this.setState({
        email: event.target.value 
      })
    }
  }

  sendUpdates(){
    console.log('sendUpdates: ' + JSON.stringify(this.state))
    const currentUser = this.props.user.currentUser // CAN BE null
    if (currentUser == null)
      return 

    this.props.updateCurrentUser(currentUser, this.state)
    .then(data => {
      console.log('User Updated: ' + JSON.stringify(data))
    })
    .catch(err => {
      console.log('ERROR:' + err.message)
    })
  }

  render(){
    const currentUser = this.props.user.currentUser // CAN BE null

    return (
      <div className="container">
       {(this.props.user.currentUser == null) ? null :(
         <div>
           <h2>{currentUser.username}</h2>
           <hr />
           <p>Add more details to your profile:</p>
           <input onChange={this.updateCurrentUser.bind(this, "firstName")} style={{marginBottom:12}} type="First Name" placeholder="First Name" /><br />
           <input onChange={this.updateCurrentUser.bind(this, "lastName")} style={{marginBottom:12}} type="Last Name" placeholder="Last Name" /><br />
           <input onChange={this.updateCurrentUser.bind(this, "email")} style={{marginBottom:12}} type="Email" placeholder="Email" /><br />
           <button onClick={this.sendUpdates.bind(this)}>Update Profile</button>
         </div>
         )
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
  	currentUser: () => dispatch(actions.currentUser()),
    updateCurrentUser: (currentUser, params) => dispatch(actions.updateCurrentUser(currentUser, params))
  }
}

export default connect(stateToProps, dispatchToProps)(Admin)