import React, { Component } from 'react';
import {Button, Grid, Segment, Form} from 'semantic-ui-react';
import { Redirect } from 'react-router'
import './LoginSignup.css';

import {firebaseAuth} from '../../fire.js';
import {auth, login} from '../../auth.js';
import {initializePublisher} from '../../dbHandler.js';

class LoginSignup extends Component {
	state = {
		uid: '',

		loginEmail: '',
		loginPassword: '',

		signUpName: '',
		signUpEmail: '',
		signUpPassword: '',
		signUpPasswordConfirm: '',
		userType: '',

		redirect: false,
	}

	componentWillMount() {
		this.auth = firebaseAuth().onAuthStateChanged(
			function(user) {
				if (user) {
					this.setState({uid: user.uid});
				}
			}.bind(this)
		);
	}

	componentWillUnmount() {
	  // Unsubscribe.
	  this.auth();
	}
	
	handleChange = (e, { name, value }) => this.setState({ [name]: value })
	
	handleLogin = () => {
		login(this.state.loginEmail, this.state.loginPassword)
	}

	handleSignUp = (userType) => {
		const {signUpEmail, signUpPassword, signUpPasswordConfirm} = this.state;
		if (signUpPassword === signUpPasswordConfirm) {
			auth(signUpEmail, signUpPassword).then((user) => {
				initializePublisher(user.uid, this.state.signUpName, userType);
			});
			this.setState({redirect: true});
		}
	}

	render() {
		const {uid, loginEmail, loginPassword, signUpName, signUpEmail, signUpPassword, signUpPasswordConfirm, redirect} = this.state;
		if (uid !== '' && !redirect) {
			return (
				<Redirect to={{
          pathname: '/video/' + uid,
        }} />
			)
		}
		if (redirect) {
			return (
				<Redirect to={{
          pathname: '/pricing',
        }} />
      )
		} else {
			return (
				<Grid className="login-signup-container" centered>
					<Grid.Column width={6}>
						<Segment className='login-container' raised textAlign='center'>
					    <h1>Login</h1>
					    <Form onSubmit={this.handleLogin}>
					    	<Form.Input name='loginEmail' value={loginEmail} onChange={this.handleChange} label='Email' />
					    	<Form.Input name='loginPassword' value={loginPassword} onChange={this.handleChange} label='Password' type='password' />
					    	<Button className='login-button' color='blue' content='Login' icon='unlock' labelPosition='left' />
					    </Form>
					  </Segment>
					</Grid.Column>
					<Grid.Column width={6}>
						<Segment className='signup-container' raised textAlign='center'>
							<h1>Sign Up</h1>
					    <Form>
					    	<Form.Input name='signUpName' value={signUpName} onChange={this.handleChange} label='Name' />
					    	<Form.Input name='signUpEmail' value={signUpEmail} onChange={this.handleChange} label='Email' />
					    	<Form.Input name='signUpPassword' value={signUpPassword} onChange={this.handleChange} label='Password' type='password' />
					    	<Form.Input name='signUpPasswordConfirm' value={signUpPasswordConfirm} onChange={this.handleChange} label='Confirm Password' type='password' />
					    </Form>
					    <Button.Group className='signup-buttons'>
				        <Button onClick={() => this.handleSignUp('explorer')} color='green'>Explorer</Button>
				        <Button.Or />
				        <Button onClick={() => this.handleSignUp('publisher')} color='teal'>Publisher</Button>
				      </Button.Group>
					  </Segment>
					</Grid.Column>
				</Grid>
			)
		}
	}
}

export default LoginSignup;