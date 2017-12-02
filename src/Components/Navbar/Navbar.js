import React, { Component } from 'react';
import { Menu, Image, Input, Icon} from 'semantic-ui-react';
import './Navbar.css';

var NavLink = require('react-router-dom').NavLink;

class Navbar extends Component {
  state = {};
  handleItemClick = (e, { name, target }) => {
    this.setState({ activeItem: name });
  }
  render() {
  	const { activeItem } = this.state;
    return (
      <Menu fixed="top">
	      <Menu.Item className='logo-item'>
	        <Image className='logo' src={require('../../media/virtual-reality-white.svg')} 
	          size="mini"/>
	      </Menu.Item>
	      <Menu.Item>
	      	<Input transparent className='icon' icon='search' placeholder='Search...' />
	      </Menu.Item>
	      <Menu.Menu position='right'>
	      	<Menu.Item
	      	  name='products'
	      	  active={activeItem === 'products'}
	      	  onClick={this.handleItemClick}>
	      	  <NavLink exact to='/'>
  	  				Home
  	  			</NavLink>
	      	</Menu.Item>
	      	<Menu.Item
	      	  name='clients'
	      	  active={activeItem === 'clients'}
	      	  onClick={this.handleItemClick}>
	      	  <NavLink exact to='/explore'>
  	  				Explore
  	  			</NavLink>
	      	</Menu.Item>
	      	<Menu.Item
	      	  name='login'
	      	  active={activeItem === 'login'}
	      	  onClick={this.handleItemClick}>
	      	  <NavLink exact to='/login'>
  	  				Login
  	  			</NavLink>
	      	</Menu.Item>
	      </Menu.Menu>
	    </Menu>
    );
  }
}

export default Navbar;
