import React from 'react';

function Home(props) {
	localStorage.url = process.env.MOIM_APP_URL;
	return (
		<div>
			<h1>Hello World!!!</h1>
		</div>
	);
}

export default Home;
