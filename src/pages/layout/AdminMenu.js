import React from 'react';
import {NavLink} from 'react-router-dom';

import mlogo from '../../asset/logo/m_logo_removebg.png';

function AdminMenu(props) {
	return (
		<div>
			{/* 좌측 메뉴 div */}
			<div
				style={{
					width: '250px',
					height: '900px',

					margin: '20px 20px',
					border: '1px solid gray',
					borderRadius: '10px',

					backgroundColor: 'rgba(0, 0, 0)',
					opacity: '0.75',
					color: 'lightgray',
				}}
			>
				{/* 로고 */}
				<div
					className='logo'
					style={{
						borderRadius: '10px',
						paddingLeft: '20px',
					}}
				>
					<NavLink to={'/admin'} className='NavLink'>
						<span className='logo_span' style={{cursor: 'pointer'}}>
							<img className='headerLogo' alt='' src={mlogo} />
							<b
								style={{
									fontSize: '40px',
									color: 'lightgray',
								}}
							>
								MoiM
							</b>
						</span>
					</NavLink>
				</div>

				<hr />

				{/* 메뉴 */}
				<ul>
					<li>
						<NavLink to={'/'} className='NavLink'>
							메인 페이지
						</NavLink>
					</li>
					<li>
						<NavLink to={'/admin/member'} className='NavLink'>
							회원 관리
						</NavLink>
					</li>
					<li>
						<NavLink to={'/admin/space'} className='NavLink'>
							공간 관리
						</NavLink>
					</li>
					<li>신고 관리</li>
					<li>공지 사항</li>
					<li>기획전 관리</li>
					<li>팝업 관리</li>
				</ul>
			</div>
		</div>
	);
}

export default AdminMenu;
