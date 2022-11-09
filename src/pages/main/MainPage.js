import React from 'react';
import {NavLink} from 'react-router-dom';
import './MainPage.css';

function mainpage(props) {
	return (
		<div>
			<ul className='main'>
				<li>
					<NavLink to={'/'}>메인 페이지</NavLink>
				</li>
				<li>
					<NavLink to={'/host/slist'}>호스트 페이지</NavLink>
				</li>
			</ul>
		</div>
	);
}

export default mainpage;
