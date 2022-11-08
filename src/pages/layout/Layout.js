import React from 'react';
import './Layout.css';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';

function layout(props) {
	return (
		<div className='layout'>
			<Header />

			<main>
				<Content />
			</main>

			<Footer />
		</div>
	);
}

export default layout;
