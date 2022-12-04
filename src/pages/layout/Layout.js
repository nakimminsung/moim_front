import React from 'react';
import './Layout.css';
import Header from './Header';
import Footer from './Footer';
import Toolbar from '@mui/material/Toolbar';
import BasicRouter from '../../Router/BasicRouter';
import BottomMenu from '../../components/BottomMenu';

function Layout(props) {
	return (
		<div className='layout'>
			<Header />
			<Toolbar id='back-to-top-anchor' />
			<main>
				<div className='layContent'>
					{props.children}
					<BottomMenu />
					<BasicRouter />
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default Layout;
