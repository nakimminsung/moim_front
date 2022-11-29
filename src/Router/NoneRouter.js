import React from 'react';
import ThemeContainer from '../containers/ThemeContainer';
import {Route, Routes} from 'react-router-dom';
import CategoryMap from '../pages/categoryMap/CategoryMap';
import Map from '../pages/thememap/Map';
import ChatRoom from '../components/ChatRoom';
import Chat from '../components/Chat';

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
				<Route path='chat' element={<Chat />} />
			</Routes>
		</>
	);
}

export default NoneRouter;
