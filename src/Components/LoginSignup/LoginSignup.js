import React, { Component } from 'react';
import {Button, Grid, Icon, Image, Label, Segment, Form} from 'semantic-ui-react';
import { Redirect } from 'react-router'
import './LoginSignup.css';

import {writePublisher, writeVideo, readPublisher, readCommentsListener} from '../../dbHandler.js';


class LoginSignup extends Component {
	state = {
		loginUsername: '',
		loginPassword: '',

		signUpName: '',
		signUpUserName: '',
		signUpPassword: '',
		signUpPasswordConfirm: '',
		userType: '',

		redirect: false,
	}
	
	handleChange = (e, { name, value }) => this.setState({ [name]: value })
	
	handleLogin = () => {
		return;
	}

	handleSignUp = (userType) => {
		const {loginUsername, loginPassword, signUpName, signUpUserName, signUpPassword, signUpPasswordConfirm} = this.state;
		if (userType === 'publisher') {
			this.setState({redirect: true});
		}
	}

	render() {
		const {loginUsername, loginPassword, signUpName, signUpUserName, signUpPassword, signUpPasswordConfirm, userType, redirect} = this.state;

		if (redirect) {
			return (
				<Redirect to={{
          pathname: '/pricing',
          state: {
          	name: signUpName,
          	userName: signUpUserName,
          	password: signUpPassword,
          }
        }} />
      )
		} else {
			return (
				<Grid className="login-signup-container" centered>
					<Grid.Column width={6}>
						<Segment className='login-container' raised textAlign='center'>
					    <h1>Login</h1>
					    <Form>
					    	<Form.Input name='loginUsername' value={loginUsername} onChange={this.handleChange} label='Username' />
					    	<Form.Input name='loginPassword' value={loginPassword} onChange={this.handleChange} label='Password' type='password' />
					    </Form>
					    <Button className='login-button' color='blue' content='Login' icon='unlock' labelPosition='left' />
					  </Segment>
					</Grid.Column>
					<Grid.Column width={6}>
						<Segment className='signup-container' raised textAlign='center'>
							<h1>Sign Up</h1>
					    <Form>
					    	<Form.Input name='signUpName' value={signUpName} onChange={this.handleChange} label='Name' />
					    	<Form.Input name='signUpUserName' value={signUpUserName} onChange={this.handleChange} label='Username' />
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