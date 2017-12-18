import React, { Component } from 'react';
import { Grid, Icon, Header, Menu, Image } from 'semantic-ui-react';
import './VideoPage.css';

import CommentPanel from '../SidePanel/CommentPanel.js'; 
import {firebaseAuth} from '../../fire.js';
import {readPublisher, readCommentsListener} from '../../dbHandler.js';

class VideoPage extends Component {
  state = {
    currUID: '',
    currName: '',

    publisher: {},
    publisherId: '',
    publisherName: '',
    publisherVideos: [],
    comments: [],

    activeVideo: {},
  }

  componentWillMount() {
    this.auth = firebaseAuth().onAuthStateChanged(
      function(user) {
        if (user) {
          this.setState({currUID: user.uid});
          readPublisher(this.state.currUID).once('value', (snapshot) => {
            this.loadUser(snapshot.key, snapshot.val());
          })
        } else {
          this.setState({
            currUID: 'ANON',
            currName: 'Anonymous'
          })
        }
      }.bind(this)
    );

    const pubId = this.props.match.params.id;

    readPublisher(pubId).once('value', (snapshot) => {
      this.loadPublisher(snapshot.key, snapshot.val());
    })

    readCommentsListener(pubId).on('value', (snapshot) => {
      this.updateCommentSection(snapshot.val());
    })
  }

  componentWillUnmount() {
    // Unsubscribe.
    this.auth();
  }

  // Load initial publisher data
  loadPublisher = (id, data) => {
    console.log(data);
    this.setState((prevState) => ({
      publisher: data,
      publisherId: data.info.uid,
      publisherName: data.info.name,
      publisherVideos: Object.entries(data.videos),
      comments: data.comments ? data.comments : {},
      activeVideo: Object.entries(data.videos)[0]
    }))
  }

    // Load initial user data
  loadUser = (id, data) => {
    this.setState({currName: data.info.name ? data.info.name : 'Anonymous'})
  }

  // Use listener to update the comment section for a video 
  updateCommentSection = (data) => {
    this.setState({comments: data ? data : {} });
  }

  changeVideo = (video) => {
    this.setState({
      activeVideo: video
    });
  }

  render() {
    const {currUID, currName, publisher, publisherId, publisherName, comments, activeVideo} = this.state;
    let videos = [];
    if (publisher.videos) {
      videos = Object.entries(publisher.videos).map((i, index) => {
        return (
          <div key={index} className="video-thumbnail" onClick={() => this.changeVideo(i)}>
            <Image centered className='thumbnail-image' size='medium' src={`https://img.youtube.com/vi/${i[1].youtubeId}/0.jpg`} />
            <span className="thumbnail-title">{i[1].name}</span>
          </div>
        )
      })
    } else {
      videos = <p>Loading</p>;
    }
    console.log(activeVideo);
    return (
      <div className="video-page-container">
      	<Grid>
          <Grid.Column className='videos-panel' width={3}>
              {videos}
          </Grid.Column>
      		<Grid.Column width={10} className='video-page-main-outer'>
			      <Menu className='user-info'>
				      <Menu.Item className='user-image'>
				        <Image src={publisher.avatar ? publisher.avatar.avatar : ""} 
				          size="mini"/>
				      </Menu.Item>
				      <Menu.Item className='user-name'>
				      	{publisherName}
				      </Menu.Item>
				      <Menu.Menu position='right'>
				      	<Menu.Item>
				      		<a href={publisher.facebook ? publisher.facebook.link : ''}>
                    <Icon className='facebook-icon' size='big' name='facebook' />
                  </a>
				      	</Menu.Item>
				      	<Menu.Item>
                  <a href={publisher.instagram ? publisher.instagram.link : ''}>
                   <Icon className='instagram-icon' size='big' name='instagram' />
                  </a>
				      	</Menu.Item>
				      	<Menu.Item>
                  <a href={publisher.youtube ? publisher.youtube.link : ''}>
                    <Icon className='youtube-icon' size='big' name='youtube' />
                  </a>
				      	</Menu.Item>
				      </Menu.Menu>
				    </Menu>
  					<iframe title='active-video-frame' className='video' src={activeVideo[1] ? activeVideo[1].link : ''} frameBorder="0" allowFullScreen></iframe>
  					<div className="video-info-container">
  						<Header as='h1'> {activeVideo[1] ? activeVideo[1].name : ''}</Header>
  						<div className="video-metrics">
  							<Icon name='unhide'></Icon> 4108 
  							<Icon name='thumbs up'></Icon> 2341 
  							<Icon name='thumbs down'></Icon> 43 
  						</div>
  						<p>
                {activeVideo[1] ? activeVideo[1].description : ''}
  						</p>
  					</div>

            {publisher.facebook &&
              <Grid stackable centered>
                <Grid.Column width={5} textAlign='center'>
                  <Image src={publisher.facebook.image} centered/>
                  <p>{publisher.facebook.description}</p>
                </Grid.Column>
                <Grid.Column width={5} textAlign='center'>
                  <Image src={publisher.youtube.image} centered/>
                  <p>{publisher.youtube.description}</p>
                </Grid.Column>
                <Grid.Column width={5} textAlign='center'>
                  <Image src={publisher.instagram.image} centered/>
                  <p>{publisher.instagram.description}</p>
                </Grid.Column>
              </Grid> 
            }
      		</Grid.Column>
          <Grid.Column width={3} className='video-page-sidebar'>
            <CommentPanel 
              comments={comments} 
              pubId={publisherId}
              commenterId={currUID}
              commenterName={currName}/>
          </Grid.Column>
      	</Grid>
      </div>
    );
  }
}

export default VideoPage;