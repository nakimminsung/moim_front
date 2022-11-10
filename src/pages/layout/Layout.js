import React from 'react';
import './Layout.css';
import Header from './Header';
import Footer from './Footer';
import BasicRouter from '../../Router/BasicRouter';

function layout(props) {
	return (
		<div className='layout'>
			<Header />
			<main>
				<div className='layContent'>
					<BasicRouter />
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default layout;
