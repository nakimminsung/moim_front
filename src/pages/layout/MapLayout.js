import React from 'react';

function layout(props) {
	return (
		<div className='layout'>
			<main>
				<div className='layContent'>{props.children}</div>
			</main>
		</div>
	);
}

export default layout;
