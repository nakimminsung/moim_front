import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../pages/layout/AdminLayout';
import Layout from '../pages/layout/Layout';
import MapLayout from '../pages/layout/MapLayout';
import MyPageLayout from '../pages/layout/MyPageLayout';
import KakaoLoginRedirect from '../pages/login/KakaoLoginRedirect';
import MypageRouter from './MypageRouter';

function Router() {
	return (
		<>
			<Routes>
				<Route path='/*' element={<Layout />} />

				<Route path='/admin/*' element={<AdminLayout />} />

				<Route path='/map/*' element={<MapLayout />} />

				<Route path='/mypage/*' element={<MyPageLayout />} />

				<Route
					path='/oauth2/redirect/:token'
					// path="/oauth/redirect/"
					element={<KakaoLoginRedirect />}
				/>
			</Routes>
		</>
	);
}

export default Router;
