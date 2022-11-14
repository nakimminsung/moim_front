import React from 'react';
import {Route, Routes} from 'react-router-dom';
import AdminMain from '../pages/admin/AdminMain';
import MemberManagement from '../pages/admin/MemberManagement';
import SpaceManagement from '../pages/admin/SpaceManagement';

function AdminRouter() {
	return (
		<>
			<Routes>
				{/* admin 레이아웃을 적용받을 js 페이지 */}
				<Route path='' element={<AdminMain />} />
				<Route path='member' element={<MemberManagement />} />
				<Route path='space' element={<SpaceManagement />} />
			</Routes>
		</>
	);
}

export default AdminRouter;
