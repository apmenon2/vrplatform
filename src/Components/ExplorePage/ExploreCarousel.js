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
      slidesToShow: 2,
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
        			<p>
        				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elit purus, ultrices suscipit neque in, ultricies vulputate quam. Nulla vehicula.
        			</p>
        		</div>
        	</div>
        </div>
        <div className="slide-container">
        	<div className="slide-background">
        		<Image src={require('../../media/thumbnails/venice.png')} />
        	</div>
        	<div className="slide-info">
        		<div className="text">
        			<Header className='slide-header' as='h3'> VENICE </Header>
        			<p>
        				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elit purus, ultrices suscipit neque in, ultricies vulputate quam. Nulla vehicula.
        			</p>
        		</div>
        	</div>
        </div>
        <div className="slide-container">
        	<div className="slide-background">
        		<Image src={require('../../media/thumbnails/skate.png')} />
        	</div>
        	<div className="slide-info">
        		<div className="text">
        			<Header className='slide-header' as='h3'> URBANA SKATE PARK </Header>
        			<p>
        				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elit purus, ultrices suscipit neque in, ultricies vulputate quam. Nulla vehicula.
        			</p>
        		</div>
        	</div>
        </div>
        <div className="slide-container">
        	<div className="slide-background">
        		<Image src={require('../../media/thumbnails/singapore.jpeg')} />
        	</div>
        	<div className="slide-info">
        		<div className="text">
        			<Header className='slide-header' as='h3'> SINGAPORE </Header>
        			<p>
        				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elit purus, ultrices suscipit neque in, ultricies vulputate quam. Nulla vehicula.
        			</p>
        		</div>
        	</div>
        </div>
      </Slider>
    );
  }
}

export default ExploreCarousel;