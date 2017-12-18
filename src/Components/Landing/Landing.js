import React, { Component } from 'react';
import {Grid, Image, Button, Divider} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './Landing.css'

class Landing extends Component {
	render() {
		return (
			<div className="video-container">
				<video autoPlay muted loop>
					<source src={require("../../media/landing720.mp4")} type="video/mp4"/>
					Your browser does not support the video tag. I suggest you upgrade your browser.
				</video>
				<div className="overlay"> 
				</div>
				<div className="landing-content">
					<Grid centered>
						<Grid.Column width={16} textAlign='center'>
							<Image centered size='small' src={require('../../media/dragonfly-yellow.svg')}/>
							<h1>DISCOVER A NEW WAY TO EXPERIENCE THE WORLD AROUND YOU</h1>
						</Grid.Column>
						<Grid.Column width={3} textAlign='center'>
							<Grid columns={3}>
								<Grid.Column>
									<Button as={Link} to='/login' className='login-button' inverted color='yellow'>
										LOGIN
									</Button>
								</Grid.Column>
								<Grid.Column>
									<Divider inverted vertical>Or</Divider>
								</Grid.Column>
								<Grid.Column>
									<Button as={Link} to='/explore' className='explore-button' inverted color='yellow'>
										EXPLORE 
									</Button>
								</Grid.Column>
							</Grid>	
						</Grid.Column>
					</Grid>
				</div>
			</div>
		)
	}
}

export default Landing;