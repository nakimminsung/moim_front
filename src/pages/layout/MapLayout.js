import React from 'react';
import NoneRouter from '../../Router/NoneRouter';
import './MapLayout.css';

function NoneLayout(props) {
	return (
		<div>
			<main>
				<div>
					<NoneRouter />
				</div>
			</main>
		</div>
	);
}

export default NoneLayout;
