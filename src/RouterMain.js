import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';

import BookingDetail from './pages/booking/BookingDetail';
import BookingList from './pages/booking/BookingList';
import BookingMain from './pages/booking/BookingMain';
import List1 from './pages/components/List1';
import List2 from './pages/components/List2';
import SpaceList from './pages/host/SpaceList';

import ReviewList from './pages/review/ReviewList';

import MainPage from './pages/main/MainPage';
import Layout from './pages/layout/Layout';
import Like from './pages/like/Like';
import Detail from './pages/roomsdetail/Detail';

import MainTheme from './pages/main/Theme';
import Theme from './pages/theme/Theme';

import AdminMain from './pages/admin/AdminMain';

function RouterMain() {
	return (
		<div>
			{/* <Menu /> */}
			<Layout>
				<Routes>
					{/* <Route path='/' element={<Home />} /> */}
					<Route path='/' element={<MainPage />} />

					{/* 리뷰/Q&A 리스트(게스트) */}
					<Route path='/review' element={<ReviewList />} />
					{/* 찜하기 */}
					<Route path='/like' element={<Like />} />
					{/* 공간 상세페이지 */}
					<Route path='/detail/:num' element={<Detail />} />

					<Route path='/menu1/list' element={<List1 />} />
					<Route path='/menu2'>
						<Route path='list' element={<List2 />} />
					</Route>
					<Route path='/main_theme' element={<MainTheme />} />
					<Route path='/theme/:num' element={<Theme />} />

					{/* 호스트 */}
					<Route path='host'>
						<Route path='slist' element={<SpaceList />} />
					</Route>
					{/* 호스트 끝 */}

					{/* 예약페이지 */}
					<Route path='/booking'>
						<Route path='main' element={<BookingMain />} />
						<Route path='list' element={<BookingList />} />
						<Route path='detail' element={<BookingDetail />} />
					</Route>

					{/* 어드민_관리자 */}
					<Route path='admin'>
						<Route path='' element={<AdminMain />} />
					</Route>

					<Route
						path='*'
						element={
							<div>
								<h1>잘못된 URL 주소입니다</h1>
							</div>
						}
					/>
				</Routes>
			</Layout>
		</div>
	);
}

export default RouterMain;
