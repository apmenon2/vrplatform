import React, { Component } from 'react';
import {Grid, Segment, Image, Button, Form} from 'semantic-ui-react';

import './UploadPage.css';
import {readVideosListener, writeVideo} from '../../dbHandler.js';

class VideoUpload extends Component {
	state = {
		pubId : '',
		videoName: '',
		videoLink: '',
		videoDescription: '',
		videos: []
	}

	componentWillMount (){
		this.setState({
			pubId: this.props.location.state && this.props.location.state.pubId 
		})
		readVideosListener(this.state.pubId).on('value', (snapshot) => {
	      this.updateVideosSection(snapshot.val());
    })
	}

	handleChange = (e, { name, value }) => this.setState({ [name]: value })

	handleSubmit = () => {
		const {pubId, videoName, videoLink, videoDescritpion} = this.state;
		writeVideo(pubId, videoName, videoDescritpion, videoLink);
	}

	// Use listener to update the comment section for a video 
  updateVideosSection = (data) => {
    this.setState({videos: ((data == null) ? {} : data) });
  }

	render() {
		return (
			<Grid className="video-upload-container" centered>
				<Grid.Column width={10}>
					<Segment attached='top'>
			     	<Form onSubmit={this.handleSubmit}>
							<Form.Input name='videoName' value={this.state.videoName} onChange={this.handleChange} label='Video Title' placeholder='Video Title'/>
							<Form.Input name='videoLink' value={this.state.videoLink} onChange={this.handleChange} label='Video Youtube Embed Link' placeholder=''/>
							<Form.TextArea name='videoDescritpion' value={this.state.videoDescritpion} onChange={this.handleChange} label='Video Description' placeholder='Describe your 360 video!' />
				  		<Button onClick={this.handleSubmit} content='Add Video' color='green' icon='plus' labelPosition='left'/>
				  	</Form>
				  </Segment>
				  <Segment attached='bottom'>
				     
				  </Segment>
				</Grid.Column>
			</Grid>
		)
	}
}

export default VideoUpload;