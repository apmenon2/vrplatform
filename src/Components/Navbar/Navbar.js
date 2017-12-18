import React, { Component } from 'react';
import { Menu, Image, Input} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import './Navbar.css';

import {logout} from '../../auth.js';

class Navbar extends Component {
  state = {};
  handleItemClick = (e, { name, target }) => {
    this.setState({ activeItem: name });
  }
  render() {
  	const { activeItem } = this.state;
    return (
      <Menu fixed="top">
	      <Menu.Item as={Link} to='/' className='logo-item'>
	        <Image className='logo' src={require('../../media/dragonfly-white.svg')} 
	          size="mini"/>
	      </Menu.Item>
	      <Menu.Item>
	      	<Input transparent className='icon' icon='search' placeholder='Search...' />
	      </Menu.Item>
	      <Menu.Menu position='right'>
	      	{this.props.authed &&
	      	<Menu.Item
	      	  name='my-page'
	      	  active={activeItem === 'my-page'}
	      	  onClick={this.handleItemClick}
	      	  as={Link} 
	      	  to={'/video/' + this.props.uid}>
  	  				My Page
	      	</Menu.Item>}
	      	<Menu.Item
	      	  name='products'
	      	  active={activeItem === 'products'}
	      	  onClick={this.handleItemClick}
	      	  as={Link}
	      	  to='/'>
  	  				Home
	      	</Menu.Item>
	      	<Menu.Item
	      	  name='clients'
	      	  active={activeItem === 'clients'}
	      	  onClick={this.handleItemClick}
	      	  as={Link}
	      	  to='/explore'>
  	  				Explore
	      	</Menu.Item>
	      	{this.props.authed
	          ? <Menu.Item
			      	  name='logout'
			      	  active={activeItem === 'login'}
			      	  onClick={() => logout()}>
			      	  Logout
			      	</Menu.Item>
	          : <Menu.Item
			      	  name='login'
			      	  active={activeItem === 'login'}
			      	  onClick={(this.handleItemClick)}
			      	  as={Link}
			      	  to='/login'>
		  	  				Login
			      	</Menu.Item>}
	      </Menu.Menu>
	    </Menu>
    );
  }
}

export default Navbar;
