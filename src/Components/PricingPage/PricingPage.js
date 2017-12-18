import React, { Component } from 'react';
import {Table, Grid, Icon, Image, Label} from 'semantic-ui-react';
import { Redirect } from 'react-router'
import './PricingPage.css'

import {firebaseAuth} from '../../fire.js';
import {readPublisher, updatePubPackage} from '../../dbHandler.js';

class PricingPage extends Component {
	state = {
		name: '',
		redirect: false,
		packageType: '',
		uid: '',
	}

	componentWillMount() {
		this.auth = firebaseAuth().onAuthStateChanged(
			function(user) {
				if (user) {
					this.setState({uid: user.uid});
					readPublisher(this.state.uid).once('value', (snapshot) => {
			      this.loadPublisher(snapshot.key, snapshot.val());
			    })
				}
			}.bind(this)
		);
	}

	componentWillUnmount() {
	  // Unsubscribe.
	  this.auth();
	}

  loadPublisher = (id, data) => {
	  this.setState({name: data.info.name})
  }

	handleSubmit = (packageType) => {
		updatePubPackage(this.state.uid, packageType);
		this.setState({
			packageType: packageType,
			redirect: true,
		})
	}

	render() {
		const {redirect} = this.state;
		if (redirect) {
			return (
				<Redirect to={{
          pathname: '/upload'
        }} />
			)
		}
		return (
			<Grid centered className='pricing-table-container'>
				<Grid.Column width={8} textAlign='center'>
					<h1>Pricing</h1>
					<h3>Welcome {this.state.name}!! Our packages have been designed with your content and marekting needs in mind. Choose the plan that best fits your business or project needs.</h3>
				</Grid.Column>
				<Grid.Column width={14}>
					<Table definition className='pricing-table'>
				    <Table.Header className='table-header'>
				      <Table.Row>
				        <Table.HeaderCell className='empty-cell' width={4}/>
				        <Table.HeaderCell width={4} className='table-header header-1'>
				        	<h3>FREE</h3>
				        	<Image centered size='tiny' src={require('../../media/svgs/pricing/free.svg')}/>
				        	<Label onClick={() => this.handleSubmit('free')} color='teal' tag as='a'>$0.00/month</Label>
				        </Table.HeaderCell>
				        <Table.HeaderCell width={4} className='table-header header-2'>
				        	<h3>BASIC</h3>
				        	<Image centered size='tiny' src={require('../../media/svgs/pricing/basic.svg')}/>
			        		<Label onClick={() => this.handleSubmit('basic')} color='green' tag as='a'>$9.99/month</Label>
			        	</Table.HeaderCell>
				        <Table.HeaderCell width={4} className='table-header header-3'>
				        	<h3>PROFESSIONAL</h3>
				        	<Image centered size='tiny' src={require('../../media/svgs/pricing/professional.svg')}/>
			        		<Label onClick={() => this.handleSubmit('professional')} color='red' tag as='a'>$24.99/month</Label>
			        	</Table.HeaderCell>
				      </Table.Row>
				    </Table.Header>

				    <Table.Body>
				      <Table.Row active>
				        <Table.Cell>Hosting</Table.Cell>
				        <Table.Cell></Table.Cell>
				        <Table.Cell></Table.Cell>
				        <Table.Cell></Table.Cell>
				      </Table.Row>
				      <Table.Row>
				        <Table.Cell>Embeded Video</Table.Cell>
				        <Table.Cell><Icon color='green' name='checkmark' size='large' /></Table.Cell>
				        <Table.Cell><Icon color='green' name='checkmark' size='large' /></Table.Cell>
				        <Table.Cell><Icon color='green' name='checkmark' size='large' /></Table.Cell>
				      </Table.Row>
				      <Table.Row>
				        <Table.Cell>360 Video Hosting</Table.Cell>
				        <Table.Cell></Table.Cell>
				        <Table.Cell><Icon color='green' name='checkmark' size='large' /></Table.Cell>
				        <Table.Cell><Icon color='green' name='checkmark' size='large' /></Table.Cell>
				      </Table.Row>
				      <Table.Row>
				        <Table.Cell>VR Video Hosting</Table.Cell>
				        <Table.Cell></Table.Cell>
				        <Table.Cell></Table.Cell>
				        <Table.Cell><Icon color='green' name='checkmark' size='large' /></Table.Cell>
				      </Table.Row>
				      <Table.Row active>
				        <Table.Cell>Videography/Content</Table.Cell>
				        <Table.Cell></Table.Cell>
				        <Table.Cell></Table.Cell>
				        <Table.Cell></Table.Cell>
				      </Table.Row>
				      <Table.Row>
				        <Table.Cell>Expert Customer Service</Table.Cell>
				        <Table.Cell><Icon color='green' name='checkmark' size='large' /></Table.Cell>
				        <Table.Cell><Icon color='green' name='checkmark' size='large' /></Table.Cell>
				        <Table.Cell><Icon color='green' name='checkmark' size='large' /></Table.Cell>
				      </Table.Row>
				      <Table.Row>
				        <Table.Cell>VR/360 Camera Rentals</Table.Cell>
				        <Table.Cell><Icon color='green' name='checkmark' size='large' /></Table.Cell>
				        <Table.Cell><Icon color='green' name='checkmark' size='large' /></Table.Cell>
				        <Table.Cell><Icon color='green' name='checkmark' size='large' /></Table.Cell>
				      </Table.Row>
				      <Table.Row>
				        <Table.Cell>On-site Professional Photography</Table.Cell>
				        <Table.Cell></Table.Cell>
				        <Table.Cell></Table.Cell>
				        <Table.Cell><Icon color='green' name='checkmark' size='large' /></Table.Cell>
				      </Table.Row>
				      <Table.Row active>
				        <Table.Cell>Marketing</Table.Cell>
				        <Table.Cell></Table.Cell>
				        <Table.Cell></Table.Cell>
				        <Table.Cell></Table.Cell>
				      </Table.Row>
				      <Table.Row>
				        <Table.Cell>Custom Social Media linking</Table.Cell>
				        <Table.Cell><Icon color='green' name='checkmark' size='large' /></Table.Cell>
				        <Table.Cell><Icon color='green' name='checkmark' size='large' /></Table.Cell>
				        <Table.Cell><Icon color='green' name='checkmark' size='large' /></Table.Cell>
				      </Table.Row>
				      <Table.Row>
				        <Table.Cell>Curated Marketing Content</Table.Cell>
				        <Table.Cell></Table.Cell>
				        <Table.Cell><Icon color='green' name='checkmark' size='large' /></Table.Cell>
				        <Table.Cell><Icon color='green' name='checkmark' size='large' /></Table.Cell>
				      </Table.Row>
				      <Table.Row>
				        <Table.Cell>Custom Ad Placement</Table.Cell>
				        <Table.Cell></Table.Cell>
				        <Table.Cell><Icon color='green' name='checkmark' size='large' /></Table.Cell>
				        <Table.Cell><Icon color='green' name='checkmark' size='large' /></Table.Cell>
				      </Table.Row>
				      <Table.Row>
				        <Table.Cell>Ad Support and Management</Table.Cell>
				        <Table.Cell></Table.Cell>
				        <Table.Cell></Table.Cell>
				        <Table.Cell><Icon color='green' name='checkmark' size='large' /></Table.Cell>
				      </Table.Row>
				    </Table.Body>
				  </Table>
				</Grid.Column>
			</Grid>
		)
	}
}

export default PricingPage;