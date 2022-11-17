import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Map from '../pages/thememap/Map';
import ThemeContainer from '../containers/ThemeContainer';

function NoneRouter() {
	return (
		<>
			<Routes>
				<Route path=':themeNum' element={<ThemeContainer />} />
			</Routes>
		</>
	);
}

export default NoneRouter;
