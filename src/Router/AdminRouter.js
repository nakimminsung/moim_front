import React from 'react';
import {Route, Routes} from 'react-router-dom';
import AdminMain from '../pages/admin/AdminMain';
import BannerManagement from '../pages/admin/BannerManagement';
import HostManagement from '../pages/admin/HostManagement';
import MemberManagement from '../pages/admin/MemberManagement';
import NoticeManagement from '../pages/admin/NoticeManagement';
import PopUpManagement from '../pages/admin/PopUpManagement';
import ReportManagement from '../pages/admin/ReportManagement';
import SpaceManagement from '../pages/admin/space/SpaceManagement';

import ThemeManagement from '../pages/admin/ThemeManagement';

function AdminRouter() {
	return (
		<>
			<Routes>
				{/* admin 레이아웃을 적용받을 js 페이지 */}
				<Route path='' element={<AdminMain />} />
				<Route path='member' element={<MemberManagement />} />
				<Route path='host' element={<HostManagement />} />

				<Route path='space' element={<SpaceManagement />} />

				<Route path='report' element={<ReportManagement />} />
				<Route path='notice' element={<NoticeManagement />} />
				<Route path='theme' element={<ThemeManagement />} />
				<Route path='popup' element={<PopUpManagement />} />
				<Route path='banner' element={<BannerManagement />} />
			</Routes>
		</>
	);
}

export default AdminRouter;
