import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CategoryMap from '../pages/categoryMap/CategoryMap';
import Login from '../pages/login/Login';
import Map from '../pages/map/Map';

function NoneRouter() {
	return (
		<>
			<Routes>
				<Route path=':themeNum' element={<Map />} />
				<Route path='/category/:categoryNum' element={<CategoryMap />} />
			</Routes>
		</>
	);
}

export default NoneRouter;
