import React, { Component } from 'react';
import { Grid, Icon, Segment, Header, Menu, Image } from 'semantic-ui-react';
import './VideoPage.css';

import CommentPanel from '../SidePanel/CommentPanel.js'; 
import {writePublisher, writeVideo, readPublisher, readCommentsListener} from '../../dbHandler.js';

class VideoPage extends Component {
  state = {
    publisherId: '',
    publisherName: '',
    publisherVideos: [],
    comments: []
  }

  componentWillMount() {
    const pubId = this.props.match.params.id;

    readPublisher(pubId).once('value', (snapshot) => {
      this.loadPublisher(snapshot.key, snapshot.val());
    })

    readCommentsListener(pubId).on('value', (snapshot) => {
      this.updateCommentSection(snapshot.val());
    })
  }

  // Load initial publisher data
  loadPublisher = (id, data) => {
    this.setState((prevState) => ({
      publisherId: id,
      publisherName: data.name,
      publisherVideos: Object.entries(data.videos),
      comments: data.comments
    }))
  }

  // Use listener to update the comment section for a video 
  updateCommentSection = (data) => {
    this.setState({comments: ((data == null) ? {} : data) });
  }

  render() {
    const {publisherId, publisherName, publisherVideos, comments} = this.state;
    return (
      <div className="video-page-container">
      	<Grid>
      		<Grid.Column width={12} className='video-page-main-outer'>
			      <Menu className='user-info'>
				      <Menu.Item className='user-image'>
				        <Image src={require('../../media/uiuc.jpg')} 
				          size="mini"/>
				      </Menu.Item>
				      <Menu.Item className='user-name'>
				      	{publisherName}
				      </Menu.Item>
				      <Menu.Menu position='right'>
				      	<Menu.Item>
				      		<Icon className='facebook-icon' size='big' name='facebook' />
				      	</Menu.Item>
				      	<Menu.Item>
				      		<Icon className='instagram-icon' size='big' name='instagram' />
				      	</Menu.Item>
				      	<Menu.Item>
				      		<Icon className='youtube-icon' size='big' name='youtube' />
				      	</Menu.Item>
				      </Menu.Menu>
				    </Menu>
  					<iframe className='video' src="https://www.youtube.com/embed/AuRKcFCFP_o" frameBorder="0" allowFullScreen></iframe>
  					<div className="video-info-container">
  						<Header as='h1'> UIUC Alma Mater </Header>
  						<div className="video-metrics">
  							<Icon name='unhide'></Icon> 4108 
  							<Icon name='thumbs up'></Icon> 2341 
  							<Icon name='thumbs down'></Icon> 43 
  						</div>
  						<p>
  							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec nisl id lacus volutpat sollicitudin eu eget erat. Fusce mollis accumsan est eget euismod. Sed quis faucibus felis. Maecenas sagittis orci sit amet urna tempus, a laoreet magna varius. Aliquam luctus varius dapibus. Proin lobortis leo sed turpis vestibulum laoreet. Praesent posuere enim mi, dignissim ultrices metus maximus id. Mauris blandit iaculis neque vitae interdum. Sed magna ligula, dignissim vitae dui ac, sodales pharetra enim. Mauris at lacus viverra, convallis metus sed, lacinia nisi. Pellentesque sagittis blandit massa vel euismod.
  						</p>
  					</div>
      		</Grid.Column>
          <Grid.Column width={4} className='video-page-sidebar'>
            <CommentPanel comments={comments} videoId='-KzQ4fH_d72m6pdGV3OK'/>
          </Grid.Column>
      	</Grid>
      </div>
    );
  }
}

export default VideoPage;