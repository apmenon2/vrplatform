import React, { Component } from 'react';
import { Menu, Header, Input, Icon, Grid, Label, Segment, Form, TextArea, Button} from 'semantic-ui-react';
import './SidePanel.css';

import {writeComment} from '../../dbHandler.js';

// const comments = [
// 	{
// 		user: 'Jane',
// 		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue tempus mollis. Aliquam sodales tortor non lobortis tincidunt. Donec dictum.'
// 	},
// 	{
// 		user: 'Jack',
// 		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit.'
// 	},
// 	{
// 		user: 'Mark',
// 		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dictum laoreet ligula, interdum molestie leo.'
// 	},
// 	{
// 		user: 'Ivy',
// 		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada suscipit neque vel malesuada. Ut ut faucibus nisi, vel ullamcorper turpis. Nullam laoreet nibh vel ex consequat mattis in mattis.'
// 	},
// 	{
// 		user: 'John',
// 		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada suscipit neque vel malesuada. Ut ut faucibus nisi, vel ullamcorper turpis. Nullam laoreet nibh vel ex consequat mattis in mattis.'
// 	},
// 	{
// 		user: 'Rachel',
// 		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada suscipit neque vel malesuada. Ut ut faucibus nisi, vel ullamcorper turpis. Nullam laoreet nibh vel ex consequat mattis in mattis.'
// 	},
// 	{
// 		user: 'Sarah',
// 		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada suscipit neque vel malesuada. Ut ut faucibus nisi, vel ullamcorper turpis. Nullam laoreet nibh vel ex consequat mattis in mattis.'
// 	},
// 	{
// 		user: 'Natalie',
// 		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada suscipit neque vel malesuada. Ut ut faucibus nisi, vel ullamcorper turpis. Nullam laoreet nibh vel ex consequat mattis in mattis.'
// 	},
// 	{
// 		user: 'Caroline',
// 		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada suscipit neque vel malesuada. Ut ut faucibus nisi, vel ullamcorper turpis. Nullam laoreet nibh vel ex consequat mattis in mattis.'
// 	},
// 	{
// 		user: 'Jessie',
// 		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada suscipit neque vel malesuada. Ut ut faucibus nisi, vel ullamcorper turpis. Nullam laoreet nibh vel ex consequat mattis in mattis.'
// 	},
// 	{
// 		user: 'Emma',
// 		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada suscipit neque vel malesuada. Ut ut faucibus nisi, vel ullamcorper turpis. Nullam laoreet nibh vel ex consequat mattis in mattis.'
// 	},
// 	{
// 		user: 'Emily',
// 		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada suscipit neque vel malesuada. Ut ut faucibus nisi, vel ullamcorper turpis. Nullam laoreet nibh vel ex consequat mattis in mattis.'
// 	},
// ]

class CommentPanel extends Component {
	state = {
		newComment: ''
	}

	handleChange = (e, { name, value }) => this.setState({ [name]: value })

	handleSubmit = () => {
		const {newComment} = this.state;
		writeComment('-KzPrfNnnR9OWIp57JE3', '-KzPrfNnnR9OWIp57JE3', 'Arjun', newComment);
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