import React from 'react';
import {Route, Routes} from 'react-router-dom';
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
