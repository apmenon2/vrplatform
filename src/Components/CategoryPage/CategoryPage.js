import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Segment, Grid, Image, Header} from 'semantic-ui-react';

import {readPublishersByCategory} from '../../dbHandler.js';
import './CategoryPage.css';

function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

class CategoryPage extends Component {
	state = {
		categoryType: '',
		data: {}
	}

	componentWillMount() {
		const categoryType = this.props.match.params.type;
		let data = {}
		readPublishersByCategory(categoryType).on("value", (snapshot) => {
			snapshot.forEach((child) => {
				data[child.key] = child.val();
			})
			this.setState({data: data});
		});
		this.setState({categoryType: categoryType});
	}

	render() {
		const {categoryType, data} = this.state;
		const results = Object.entries(data);
		return (
			<Grid className='results-container' centered>
				<Grid.Column textAlign='center' width={10}>
					<Header as='h1'> {toTitleCase(categoryType)} </Header>
					{ results.map((item, i) => {
						const videos = Object.entries(item[1].videos);
						return (
							<Segment.Group className='result' key={i}>
								<Segment textAlign='left' inverted> 
			            <Image inline className='avatar-image' size='tiny' src={item[1].avatar.avatar} />
									<span className='result-name'>
										<Link className='result-link' to={`/video/${item[0]}`}> {item[1].info.name} </Link>
									</span>
								</Segment>
								<Segment>
									<Grid columns={2}>
										<Grid.Column>
											<Image src={`https://img.youtube.com/vi/${videos[0][1].youtubeId}/0.jpg`} />
										</Grid.Column>
										<Grid.Column>
											<p>{item[1].info.description}</p>
										</Grid.Column>
									</Grid>
								</Segment>
							</Segment.Group>
						)
					})}
				</Grid.Column>
			</Grid>
		)
	}
}

export default CategoryPage;