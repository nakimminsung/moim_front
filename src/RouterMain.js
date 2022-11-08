import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './pages/components/Home';
import List1 from './pages/components/List1';
import List2 from './pages/components/List2';
import Menu from './pages/components/Menu';
import SpaceList from './pages/host/SpaceList';
import ReviewList from './pages/review/ReviewList';

function RouterMain() {
	return (
		<div>
			<Menu />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/menu1/list' element={<List1 />} />
				<Route path='/menu2'>
					<Route path='list' element={<List2 />} />
				</Route>
				{/* 리뷰/Q&A 리스트(게스트) */}
				<Route path='/review' element={<ReviewList />} />
				{/* 호스트 */}
				<Route path='host'>
					<Route path='slist' element={<SpaceList />} />
				</Route>
				{/* 호스트 끝 */}
				<Route
					path='*'
					element={
						<div>
							<h1>잘못된 URL 주소입니다</h1>
						</div>
					}
				/>
			</Routes>
		</div>
	);
}

export default RouterMain;
