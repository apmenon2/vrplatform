import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import { Grid, Segment, Header, Image, Divider } from 'semantic-ui-react';
import './ExplorePage.css';

import ExploreCarousel from './ExploreCarousel.js';

class ExplorePage extends Component {
  state = {
    redirect: ''
  }

  handleClick = (type) => {
    this.setState({redirect: type})
  }

  render() {
    const {redirect} = this.state;
    if (redirect !== '') {
      return (
        <Redirect to={`/category/${redirect}`} />
      )
    }
    return (
    	<Grid className="explore-page-container" centered>
    		<Grid.Column width={14} className='explore-page-main-outer' text-align='left'>
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
              heading='UNIVERSITIES AND INSTITUTIONS'
              onClick={this.handleClick}/>
            </Grid.Column>
            <Grid.Column>
              <CategoryCard
              icon='cities'
              heading='CITIES AND SKYLINES'
              onClick={this.handleClick}/>
            </Grid.Column>
            <Grid.Column>
              <CategoryCard
              icon='media'
              heading='ARTS AND CULTURE'
              onClick={this.handleClick}/>
            </Grid.Column>
            <Grid.Column>
              <CategoryCard
              icon='nature'
              heading='NATURE AND WILDLIFE'
              onClick={this.handleClick}/>
            </Grid.Column>
            <Grid.Column>
              <CategoryCard
              icon='tourism'
              heading='TOURISM AND PHOTOGRAPHY'
              onClick={this.handleClick}/>
            </Grid.Column>
            <Grid.Column>
              <CategoryCard
              icon='business'
              heading='BUSSINESS AND OFFFICES'
              onClick={this.handleClick}/>
            </Grid.Column>
          </Grid>
    		</Grid.Column>
    	</Grid>
    );
  }
}

const CategoryCard = ({icon, heading, text, onClick}) => (
  <Segment onClick={()=> onClick(icon)} className='category-card' textAlign='center'>
    <Image src={require(`../../media/svgs/${icon}.svg`)} centered/>
    <Header as='h3' className='card-header'> {heading} </Header>
    <Divider className='card-divider' />
  </Segment>
)


export default ExplorePage;
  

