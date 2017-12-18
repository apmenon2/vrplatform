import React, { Component } from 'react';
import {Header, Segment, Form, TextArea, Button} from 'semantic-ui-react';
import './SidePanel.css';

import {writeComment} from '../../dbHandler.js';

class CommentPanel extends Component {
	state = {
		newComment: ''
	}

	handleChange = (e, { name, value }) => this.setState({ [name]: value })

	handleSubmit = () => {
		const {newComment} = this.state;
		const {pubId, commenterId, commenterName} = this.props;
		writeComment(pubId, commenterId, commenterName, newComment);
		this.setState({ newComment: ''})
	}

	render() {
		const {newComment} = this.state;
		const comments = Object.entries(this.props.comments);

		return (
			<div className='side-container'>
				<div className='side-panel'>
						<Header as='h4' className='comment-title'> Comments </Header>
						{comments.map((i) => 
							<Comment key={i[0]} user={i[1].commenterName} text={i[1].text} />
						)}
				</div>
				<div className="new-comment">
		    	<Form onSubmit={this.handleSubmit} inverted>
		      	<Form.Field 
		      	className='new-comment-field' 
		      	control={TextArea} 
		      	placeholder='Submit a comment of your own...' 
		      	style={{ minHeight: 100 }}
		      	name='newComment'
		      	value={newComment}
		      	onChange={this.handleChange}/>
		      </Form>
		      <Button onClick={this.handleSubmit} className='new-comment-submit' fluid content='Submit' icon='right arrow' labelPosition='right' />
				</div>
			</div>
		)
	}
}

// const PanelItem = ({image, title, viewCount}) => (
// 	<div className="panel-item">
// 		<Image className='item-thumbnail' src={require(`../../media/thumbnails/${image}`)} size='medium' centered/>
// 		<div className="info">
// 			{title} <span className="break"> | </span> <Icon name='unhide'></Icon> {viewCount} 
// 		</div>
// 	</div>
// )

const Comment = ({user, text}) => (
	<Segment.Group className='comment'>
		<Segment className='comment-heading' inverted secondary textAlign='left'>
      {user}
    </Segment>
    <Segment className='comment-body' inverted tertiary textAlign='left'>
      <span>{text}</span>
    </Segment>
  </Segment.Group>
)

export default CommentPanel;