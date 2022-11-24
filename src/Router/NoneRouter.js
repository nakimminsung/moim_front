import React from 'react';
import ThemeContainer from '../containers/ThemeContainer';
import {Route, Routes} from 'react-router-dom';
import CategoryMap from '../pages/categoryMap/CategoryMap';
import Map from '../pages/thememap/Map';
import ChatRoom from '../components/ChatRoom';

function NoneRouter() {
	return (
		<>
			<Routes>
				<Route path=':themeNum' element={<ThemeContainer />} />
				<Route path=':themeNum' element={<Map />} />
				<Route
					path='/category/:categoryNum'
					element={<CategoryMap />}
				/>
				<Route path='chat' element={<ChatRoom />} />
			</Routes>
		</>
	);
}

export default NoneRouter;
