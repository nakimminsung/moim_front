import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

function AdminMain(props) {
	const [topMenu, setTopMenu] = useState('관리자 메인화면');

	const menuHandler = (e) => {
		// console.log(e.target.name);
		setTopMenu(e.target.name);
	};

	return (
		// 전체 묶는 div
		<div className='bindingBox' style={{width: '100%', height: '80vh'}}>
			{/* 상단 Box */}
			<div
				className='topBox'
				style={{
					width: '100%',
					height: '38vh',
					display: 'flex',
					justifyContent: 'space-between',
					marginTop: '3%',
				}}
			>
				<div
					className='recentMember'
					style={{width: '48%', border: '1px solid gray'}}
				>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<h5>최근 가입한 멤버</h5>
						<NavLink
							to={'/admin/member'}
							name='게스트 관리'
							onClick={menuHandler}
						>
							더보기 +
						</NavLink>
					</div>
					<div>굉장히 좋은데?</div>
				</div>

				<div
					className='warningHost'
					style={{width: '48%', border: '1px solid gray'}}
				>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<h5>신고 누적 호스트</h5>
						<NavLink
							to={'/admin/report'}
							name='호스트 관리'
							onClick={menuHandler}
						>
							더보기 +
						</NavLink>
					</div>
				</div>
			</div>

			{/* 하단 Box */}
			<div
				className='bottomBox'
				style={{
					width: '100%',
					height: '38vh',
					display: 'flex',
					justifyContent: 'space-between',
					marginTop: '3%',
				}}
			>
				<div
					className='spaceBox'
					style={{width: '48%', border: '1px solid gray'}}
				>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<h5>등록 대기중인 공간</h5>
						<NavLink
							to={'/admin/space'}
							name='공간 관리'
							onClick={menuHandler}
						>
							더보기 +
						</NavLink>
					</div>
				</div>
				<div
					className='noticeBox'
					style={{width: '48%', border: '1px solid gray'}}
				>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<h5>공지사항 리스트</h5>
						<NavLink
							to={'/admin/notice'}
							name='공지사항 관리'
							onClick={menuHandler}
						>
							더보기 +
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AdminMain;
