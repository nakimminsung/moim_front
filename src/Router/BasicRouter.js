import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Mainpage from '../pages/main/MainPage';
import SpaceList from '../pages/host/SpaceList';
import ReviewList from '../pages/review/ReviewList';
import Like from '../pages/like/Like';
import Detail from '../pages/roomsdetail/Detail';
import MainTheme from '../pages/main/Theme';
import Theme from '../pages/theme/Theme';
import AdminMain from '../pages/admin/AdminMain';
import SpaceAddForm from '../pages/host/SpaceAddForm';
import SpaceAddForm2 from '../pages/host/SpaceAddForm2';

function BasicRouter() {
	return (
		<>
			<Routes>
				<Route path='' element={<Mainpage />} />
				{/* 리뷰/Q&A 리스트(게스트) */}
				<Route path='review' element={<ReviewList />} />
				{/* 찜하기 */}
				<Route path='like' element={<Like />} />
				{/* 공간 상세페이지 */}
				<Route path='detail/:num' element={<Detail />} />
				{/* 메인페이지 theme component */}
				<Route path='main_theme' element={<MainTheme />} />
				{/* 기획전 페이지 */}
				<Route path='theme'>
					<Route path=':num' element={<Theme />} />
				</Route>
				{/* 호스트 */}
				<Route path='host'>
					<Route path='slist' element={<SpaceList />} />
					<Route path='addform' element={<SpaceAddForm />} />
					<Route path='addform2/:num' element={<SpaceAddForm2 />} />
				</Route>
				{/* 호스트 끝 */}
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
		</>
	);
}

export default BasicRouter;
