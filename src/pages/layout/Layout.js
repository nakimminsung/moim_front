import React from 'react';
import './Layout.css';
import Header from './Header';
import Footer from './Footer';

function layout(props) {
	return (
		<div className='layout'>
			<Header />

			<main className='layContent'>
				<div>{props.children}</div>
			</main>

			<Footer />
		</div>
	);
}

export default layout;
