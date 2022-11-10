import React from 'react';
import {Route, Routes} from 'react-router-dom';
import NoneRouter from './NoneRouter';
import BasicRouter from './BasicRouter';

function Router() {
	return (
		<>
			<Routes>
				<Route path='/*' element={<BasicRouter />} />
				<Route path='/map/*' element={<NoneRouter />} />
			</Routes>
		</>
	);
}

export default Router;
