import React, { Component } from 'react';
import { Grid, Icon, Segment, Header, Menu, Image, Divider } from 'semantic-ui-react';
import './ExplorePage.css';

import ExploreCarousel from './ExploreCarousel.js';
import CommentPanel from '../SidePanel/CommentPanel.js';

class ExplorePage extends Component {
  render() {
    return (
      <div className="explore-page-container">
      	<Grid>
      		<Grid.Column width={3} className='explore-page-sidebar'>
      		</Grid.Column>
      		<Grid.Column width={13} className='explore-page-main-outer' text-align='left'>
            {/*Carousel Portion*/}
            <Header className='headline' as='h3'>FEATURED</Header>
            <Divider />
    				<ExploreCarousel />

            {/*Categories*/}
            <Header className='headline' as='h3'>CATEGORIES</Header>
            <Divider />
            <Grid stackable columns={3} className='category-cards'>
              <Grid.Column>
                <CategoryCard
                icon='institutions'
                heading='UNIVERSITIES AND INSTITUTIONS'/>
              </Grid.Column>
              <Grid.Column>
                <CategoryCard
                icon='cities'
                heading='CITIES AND SKYLINES'/>
              </Grid.Column>
              <Grid.Column>
                <CategoryCard
                icon='media'
                heading='ARTS AND CULTURE'/>
              </Grid.Column>
              <Grid.Column>
                <CategoryCard
                icon='nature'
                heading='NATURE AND WILDLIFE'/>
              </Grid.Column>
              <Grid.Column>
                <CategoryCard
                icon='tourism'
                heading='TOURISM AND PHOTOGRAPHY'/>
              </Grid.Column>
              <Grid.Column>
                <CategoryCard
                icon='business'
                heading='BUSSINESS AND OFFFICES'/>
              </Grid.Column>
            </Grid>
      		</Grid.Column>
      	</Grid>
      </div>
    );
  }
}

const CategoryCard = ({icon, heading, text}) => (
  <Segment className='category-card' text-align='center'>
    <Image src={require(`../../media/svgs/${icon}.svg`)} centered/>
    <Header as='h3' className='card-header'> {heading} </Header>
    <Divider className='card-divider' />
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
  </Segment>
)


export default ExplorePage;
  

