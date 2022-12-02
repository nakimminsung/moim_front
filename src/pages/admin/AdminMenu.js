import React from 'react';
import {NavLink} from 'react-router-dom';

function AdminMenu(props) {
	const {topMenu, setTopMenu} = props;

	const menuHandler = (e) => {
		// console.log(e.target.name);
		setTopMenu(e.target.name);
	};

	return (
		<div>
			{/* 좌측 메뉴 div */}
			<div
				style={{
					// minHeight: '920px',
					width: '14%',
					height: '96vh',
					position: 'fixed',

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
						paddingLeft: '30px',
						marginTop: '15px',
					}}
				>
					<NavLink to={'/'} className='NavLink'>
						<span className='logo_span' style={{cursor: 'pointer'}}>
							{/* <img className='headerLogo' alt='' src={mlogo} /> */}
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
				<ul className='adminMenu'>
					<li>
						<NavLink
							to={'/admin'}
							className='NavLink'
							name='관리자 메인화면'
							onClick={menuHandler}
						>
							관리자 메인화면
						</NavLink>
					</li>
					<li>
						<NavLink
							to={'/admin/member'}
							className='NavLink'
							name='게스트 관리'
							onClick={menuHandler}
						>
							게스트 관리
						</NavLink>
					</li>
					<li>
						<NavLink
							to={'/admin/host'}
							className='NavLink'
							name='호스트 관리'
							onClick={menuHandler}
						>
							호스트 관리
						</NavLink>
					</li>
					<li>
						<NavLink
							to={'/admin/space'}
							className='NavLink'
							name='공간 관리'
							onClick={menuHandler}
						>
							공간 관리
						</NavLink>
					</li>
					<li>
						<NavLink
							to={'/admin/notice'}
							className='NavLink'
							name='공지사항 관리'
							onClick={menuHandler}
						>
							공지사항 관리
						</NavLink>
					</li>
					<li>
						<NavLink
							to={'/admin/theme'}
							className='NavLink'
							name='기획전 관리'
							onClick={menuHandler}
						>
							기획전 관리
						</NavLink>
					</li>
					<li>
						<NavLink
							to={'/admin/report'}
							className='NavLink'
							name='신고 관리'
							onClick={menuHandler}
						>
							신고 관리
						</NavLink>
					</li>
					<li>
						<NavLink
							to={'/admin/settlement'}
							className='NavLink'
							name='정산 관리'
							onClick={menuHandler}
						>
							정산 관리
						</NavLink>
					</li>

					{/* 
					<li>
						<NavLink to={'/admin/popup'} className='NavLink'>
							팝업 관리
						</NavLink>
					</li>
					<li>
						<NavLink to={'/admin/banner'} className='NavLink'>
							배너 관리
						</NavLink>
					</li>
					 */}
				</ul>
			</div>
		</div>
	);
}

export default AdminMenu;
