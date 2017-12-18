import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Grid, Segment, Image, Button, Form, List} from 'semantic-ui-react';

import './UploadPage.css';
import {firebaseAuth} from '../../fire.js';
import {readVideosListener, readPublisher, writeVideo} from '../../dbHandler.js';

const extractYoutubeId = (link) => {
	let splitting = link.split('embed/');
	return splitting[1];
}

class VideoUpload extends Component {
	state = {
		uid: '',
		videoName: '',
		videoLink: '',
		videoDescription: '',
		videos: []
	}

	componentWillMount() {
		this.auth = firebaseAuth().onAuthStateChanged(
			function(user) {
				if (user) {
					this.setState({uid: user.uid});
					readPublisher(this.state.uid).once('value', (snapshot) => {
			      this.loadPublisher(snapshot.key, snapshot.val());
			    })
			    readVideosListener(this.state.uid).on('value', (snapshot) => {
			    	this.updateVideosSection(snapshot.val());
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
	  this.setState({videos: data.videos ? data.videos : []})
  }

	handleChange = (e, { name, value }) => this.setState({ [name]: value })

	handleSubmit = () => {
		const {uid, videoName, videoLink, videoDescription} = this.state;
		const youtubeId = extractYoutubeId(videoLink);
		writeVideo(uid, videoName, videoDescription, videoLink, youtubeId);
	}

	// Use listener to update the videos 
  updateVideosSection = (data) => {
    this.setState({videos: ((data == null) ? {} : data) });
  }

	render() {
		const videos = Object.entries(this.state.videos);
		return (
			<Grid className="video-upload-container" centered>
				<Grid.Column width={5}>
					<Segment.Group>
						<Segment color='green'>
							Video Content Guidelines
						</Segment>
						<Segment>
							<List bulleted>
								<List.Item> <strong> Minimum 4k resolution </strong> 
									<List.List>
										<List.Item>4096x2160 for monoscopic content </List.Item>
										<List.Item>4096x4096 for stereoscopic content </List.Item>
										<List.Item>Resolution applies to entire 360 visual, so perceived resolution is ~1/5 of that. 4k looks like 720p. </List.Item>
									</List.List>
								</List.Item>
								<List.Item> <strong> No egregious chromatic aberration, flicker, or visible stitching </strong> 
									<List.List>
										<List.Item>Stereoscopic content should be stationary with controlled subjects </List.Item>
										<List.Item>To prevent flicker, avoid especially bright scenes.</List.Item>
										<List.Item>To prevent chromatic aberration, avoid high-contrast scenes and defective lenses. It is also acceptable to correct during post-processing.</List.Item>
										<List.Item>To prevent visible stitching, avoid excessive motion by subjects in scene and use a high-quality camera. It is also acceptable to correct during post-processing.</List.Item>
									</List.List>
								</List.Item>
								<List.Item> <strong> Minimise motion sickness </strong> 
									<List.List>
										<List.Item>Content should be stationary. Use teleportation to move between views. If motion is necessary, it should be controlled by the user. Travel at a constant speed; avoid acceleration/deceleration and rapid turns. </List.Item>
										<List.Item>The camera should be placed at realistic height. The ground should not be visible in initial field of view. </List.Item>
										<List.Item>Current research suggests that resolution does not influence motion sickness, but low-quality cameras introduce other issues that do influence motion sickness. </List.Item>
									</List.List>
								</List.Item>
								<List.Item> <strong> Content should be accessible without audio </strong>
									<List.List>
										<List.Item>Visible cues or subtitles should effectively communicate any information delivered in audio. These should not violate VR best practices (e.g. utilising a HUD instead of integrating objects into environment, particularly in stereoscopic content). </List.Item>
									</List.List> 
								</List.Item>
							</List>
						</Segment>
					</Segment.Group>
				</Grid.Column>
				<Grid.Column width={8}>
					<Segment attached='top'>
			     	<Form onSubmit={this.handleSubmit}>
							<Form.Input name='videoName' value={this.state.videoName} onChange={this.handleChange} label='Video Title' placeholder='Video Title'/>
							<Form.Input name='videoLink' value={this.state.videoLink} onChange={this.handleChange} label='Video Youtube Embed Link' placeholder=''/>
							<Form.TextArea name='videoDescription' value={this.state.videoDescription} onChange={this.handleChange} label='Video Description' placeholder='Describe your 360 video!' />
				  		<Button content='Add Video' color='green' icon='plus' labelPosition='left'/>
				  	</Form>
				  </Segment>
				  <Segment attached='bottom'>
				  	{videos.map((i, index) => 
				  		<VideoListing
				  			key={index}
				  			name={i[1].name}
				  			link={i[1].link}
				  			description={i[1].description}
				  			youtubeId={i[1].youtubeId}
			  			/>
				  	)}
				  	<Button><Link to={`/video/${this.state.uid}`}>View Your Page!</Link></Button>
				  </Segment>
				</Grid.Column>
			</Grid>
		)
	}
}

const VideoListing = ({name, link, description, youtubeId}) => (
	<div className='video-listing'>
		<Grid columns={2}>
			<Grid.Column>
				<h3> {name} </h3>
				<Image size='medium' centered src={'https://img.youtube.com/vi/' + youtubeId + '/0.jpg'} />
			</Grid.Column>
			<Grid.Column>
				<p> {description} </p>
			</Grid.Column>
		</Grid>
		<hr/>
	</div>
)

export default VideoUpload;