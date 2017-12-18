import React, { Component } from 'react';
import { Image, Header } from 'semantic-ui-react';
import Slider from 'react-slick';
import './ExplorePage.css';

class ExploreCarousel extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
    };
    return (
      <Slider className='carousel' {...settings}>
      	<div className="slide-container">
        	<div className="slide-background">
        		<Image src={require('../../media/thumbnails/alma_mater.jpg')} />
        	</div>
        	<div className="slide-info">
        		<div className="text">
        			<Header className='slide-header' as='h3'> UIUC ALMA MATER </Header>
        		</div>
        	</div>
        </div>
        <div className="slide-container">
        	<div className="slide-background">
        		<Image src={require('../../media/thumbnails/yellowstone.jpg')} />
        	</div>
        	<div className="slide-info">
        		<div className="text">
        			<Header className='slide-header' as='h3'> YELLOWSTONE </Header>
        		</div>
        	</div>
        </div>
        <div className="slide-container">
        	<div className="slide-background">
        		<Image src={require('../../media/thumbnails/chicago.jpg')} />
        	</div>
        	<div className="slide-info">
        		<div className="text">
        			<Header className='slide-header' as='h3'> CHICAGO </Header>
        		</div>
        	</div>
        </div>
        <div className="slide-container">
        	<div className="slide-background">
        		<Image src={require('../../media/thumbnails/australia.jpg')} />
        	</div>
        	<div className="slide-info">
        		<div className="text">
        			<Header className='slide-header' as='h3'> AUSTRALIA </Header>
        		</div>
        	</div>
        </div>
      </Slider>
    );
  }
}

export default ExploreCarousel;