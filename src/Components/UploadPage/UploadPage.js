import React, { Component } from 'react';
import {Grid, Segment, Button, Form} from 'semantic-ui-react';
import { Redirect } from 'react-router'
import './UploadPage.css';

import {fire, firebaseAuth} from '../../fire.js';
import {updateProfileInfo, readPublisher} from '../../dbHandler.js';
import FileUploader from 'react-firebase-file-uploader';

const options = [
  { key: '1', text: 'University', value: 'institutions' },
  { key: '2', text: 'City and Urban Life', value: 'cities' },
  { key: '3', text: 'Arts and Culture', value: 'media' },
  { key: '4', text: 'Nature and Wildlife', value: 'nature' },
  { key: '5', text: 'Tourism and Photography', value: 'tourism' },
  { key: '6', text: 'Bussiness and Offices', value: 'bussiness' },
];

class UploadPage extends Component {
	state = {
		name: '',
		uid: '',

		pubDescription: '',
		pubCategory: '',

		avatar: '',
		avatarUploading: false,
		avatarProgress: 0,
		avatarURL: '',
		avatarDescription: '',


		facebook: '',
		facebookUploading: false,
		facebookProgress: 0,
		facebookURL: '',
		facebookDescription: '',
		facebookLink: '',

		youtube: '',
		youtubeUploading: false,
		youtubeProgress: 0,
		youtubeURL: '',
		youtubeDescription: '',
		youtubeLink: '',

		instagram: '',
		instagramUploading: false,
		instagramProgress: 0,
		instagramURL: '',
		instagramDescription: '',
		instagramLink: '',

		pubId: '',
		redirect: false,
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

	handleChange = (e, { name, value }) => this.setState({ [name]: value })

	// Avatar Handlers
	handleUploadStartAvatar = () => this.setState({avatarUploading: true, avatarProgress: 0});
  handleProgressAvatar = (avatarProgress) => this.setState({avatarProgress});
  handleUploadErrorAvatar = (error) => {
    this.setState({avatarUploading: false});
    console.error(error);
  }
  handleUploadSuccessAvatar = (filename) => {
    this.setState({avatar: filename, avatarProgress: 100, avatarUploading: false});
    fire.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({avatarURL: url}));
  };

  // Facebook Handlers
	handleUploadStartFacebook= () => this.setState({facebookUploading: true, facebookProgress: 0});
  handleProgressFacebook = (facebookProgress) => this.setState({facebookProgress});
  handleUploadErrorFacebook = (error) => {
    this.setState({facebookUploading: false});
    console.error(error);
  }
  handleUploadSuccessFacebook = (filename) => {
    this.setState({facebook: filename, facebookProgress: 100, facebookUploading: false});
    fire.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({facebookURL: url}));
  };

  // Youtube Handlers
	handleUploadStartYoutube = () => this.setState({youtubeUploading: true, youtubeProgress: 0});
  handleProgressYoutube = (youtubeProgress) => this.setState({youtubeProgress});
  handleUploadErrorYoutube = (error) => {
    this.setState({youtubeUploading: false});
    console.error(error);
  }
  handleUploadSuccessYoutube = (filename) => {
    this.setState({youtube: filename, youtubeProgress: 100, youtubeUploading: false});
    fire.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({youtubeURL: url}));
  };

  // Instagram Handlers
	handleUploadStartInstagram = () => this.setState({instagramUploading: true, instagramProgress: 0});
  handleProgressInstagram = (instagramProgress) => this.setState({instagramProgress});
  handleUploadErrorInstagram = (error) => {
    this.setState({instagramUploading: false});
    console.error(error);
  }
  handleUploadSuccessInstagram = (filename) => {
    this.setState({instagram: filename, instagramProgress: 100, instagramUploading: false});
    fire.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({instagramURL: url}));
  };

  updateDataAndRedirect = () => {
  	updateProfileInfo(this.state.uid, this.state);
  	this.setState({
  		redirect: true
  	})
  }

	render() {
		if (this.state.redirect) {
			return (
				<Redirect to={{
          pathname: '/upload/video',
        }} />
      )
		}
		return (
			<Grid centered>
				<Grid.Column width={7}>
					<Segment textAlign='left'>	
						<Form>
							<Form.Input name='name' value={this.state.name} label='Publisher Name' placeholder='Publisher Name' onChange={this.handleChange}/>
							<Form.TextArea label='Description' name='pubDescription' value={this.state.pubDescription} placeholder='Describe your organization...' onChange={this.handleChange}/>
							<Form.Select name='pubCategory' label='Category' options={options} placeholder='Category' onChange={this.handleChange}/>
							<Grid stackable>
							{/* Facebook Graphic Upload*/}
								<Grid.Column width={4}>
										{this.state.avatarURL &&
					            <img alt='avatar' src={this.state.avatarURL} />
					          }
					          {!this.state.avatarURL &&
					            	<label className='upload-container avatar'>
					                UPLOAD
					                <FileUploader
					                  hidden
					                  accept="image/*"
					                  storageRef={fire.storage().ref('images')}
					                  onUploadStart={this.handleUploadStartAvatar}
					                  onUploadError={this.handleUploadErrorAvatar}
					                  onUploadSuccess={this.handleUploadSuccessAvatar}
					                  onProgress={this.handleProgressAvatar}
					                />
					              </label>
					          }
								</Grid.Column>
								<Grid.Column width={12}>
										<Form.TextArea name='avatarDescription' value={this.state.avatarDescription} onChange={this.handleChange} label='Avatar Description' placeholder='' />
								</Grid.Column>
							</Grid>
						</Form>
					</Segment>
				</Grid.Column>
				<Grid.Column width={7}>
					<Segment textAlign='center'>
						<Grid stackable>
						{/* Facebook Graphic Upload*/}
							<Grid.Column width={4}>
									{this.state.facebookURL &&
				            <img alt='facebook graphic' src={this.state.facebookURL} />
				          }
				          {!this.state.facebookURL &&
				            	<label className='upload-container facebook'>
				                UPLOAD
				                <FileUploader
				                  hidden
				                  accept="image/*"
				                  storageRef={fire.storage().ref('images')}
				                  onUploadStart={this.handleUploadStartFacebook}
				                  onUploadError={this.handleUploadErrorFacebook}
				                  onUploadSuccess={this.handleUploadSuccessFacebook}
				                  onProgress={this.handleProgressFacebook}
				                />
				              </label>
				          }
							</Grid.Column>
							<Grid.Column width={12}>
								<Form>
									<Form.Input name='facebookLink' value={this.state.facebookLink} onChange={this.handleChange} label='Facebook Profile Link' placeholder='Faebook Page'/>
									<Form.TextArea name='facebookDescription' value={this.state.facebookDescription} onChange={this.handleChange}label='Facebook Graphic' placeholder='Facebook text content' />
								</Form>
							</Grid.Column>
							{/* Youtube Graphic Upload*/}
							<Grid.Column width={4}>
								{this.state.youtubeURL &&
			            <img alt='youtube graphic' src={this.state.youtubeURL} />
			          }
			          {!this.state.youtubeURL &&
									<div className="upload-container youtube">
										<label className='upload-icon'>
									    UPLOAD
									    <FileUploader
									      hidden
									      accept="image/*"
									      storageRef={fire.storage().ref('images')}
									      onUploadStart={this.handleUploadStartYoutube}
									      onUploadError={this.handleUploadErrorYoutube}
									      onUploadSuccess={this.handleUploadSuccessYoutube}
									      onProgress={this.handleProgressYoutube}
									    />
									  </label>
									</div>
								}
							</Grid.Column>
							<Grid.Column width={12}>
								<Form>
									<Form.Input name='youtubeLink' value={this.state.youtubeLink} onChange={this.handleChange} label='Youtube Page Link' placeholder='Youtube Page'/>
									<Form.TextArea name='youtubeDescription' value={this.state.youtubeDescription} onChange={this.handleChange} label='Youtube Graphic' placeholder='Youtube text content' />
								</Form>
							</Grid.Column>
							<Grid.Column width={4}>
								{this.state.facebookURL &&
			            <img alt='instagram graphic' src={this.state.instagramURL} />
			          }
			          {!this.state.instagramURL &&
									<div className="upload-container instagram">
										<label className='upload-icon'>
									    UPLOAD
									    <FileUploader
									      hidden
									      accept="image/*"
									      storageRef={fire.storage().ref('images')}
									      onUploadStart={this.handleUploadStartInstagram}
									      onUploadError={this.handleUploadErrorInstagram}
									      onUploadSuccess={this.handleUploadSuccessInstagram}
									      onProgress={this.handleProgressInstagram}
									    />
									  </label>
									</div>
								}
							</Grid.Column>
							<Grid.Column width={12}>
								<Form>
									<Form.Input name='instagramLink' value={this.state.instagramLink} onChange={this.handleChange} label='Instagram Profile Link' placeholder='Instagram Page'/>
									<Form.TextArea name='instagramDescription' value={this.state.instagramDescription} onChange={this.handleChange} label='Instagram Graphic' placeholder='Instagram text content' />
								</Form>
							</Grid.Column>
						</Grid>
						<Button onClick={this.updateDataAndRedirect} className='submit-info-button'>Upload Some Videos</Button>
					</Segment>
				</Grid.Column>
			</Grid>
		)
	}
}

export default UploadPage;