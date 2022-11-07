import React from 'react';
import {NavLink} from 'react-router-dom';

function Menu(props) {
	return (
		<div>
			<ul className='menu'>
				<li>
					<NavLink to={'/'}>Home</NavLink>
				</li>
				<li>
					<NavLink to={'/host/slist'}>HostPage</NavLink>
				</li>
			</ul>
		</div>
	);
}

export default Menu;
