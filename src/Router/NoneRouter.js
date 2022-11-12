import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/login/Login';
import Map from '../pages/map/Map';

function NoneRouter() {
	return (
		<>
			<Routes>
				<Route path=':num' element={<Map />} />
			</Routes>
		</>
	);
}

export default NoneRouter;
