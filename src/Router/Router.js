import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Layout from '../pages/layout/Layout';
import MapLayout from '../pages/layout/MapLayout';

function Router() {
	return (
		<>
			<Routes>
				<Route path='/*' element={<Layout />} />
				<Route path='/map/*' element={<MapLayout />} />
			</Routes>
		</>
	);
}

export default Router;
