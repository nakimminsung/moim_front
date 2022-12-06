import React, {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import PopularHostSpace from './PopularHostSpace';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import WaitSpaceList from './WaitSpaceList';
import WaitReportList from './WaitReportList';
import MemberChart from './MemberChart';

function AdminMain(props) {
	const [topMenu, setTopMenu] = useState('관리자 메인화면');

	const menuHandler = (e) => {
		// console.log(e.target.name);
		setTopMenu(e.target.name);
	};

	//승인대기 공간 리스트
	const [waitSpace, setWaitSpace] = useState('');

	//처리대기 신고 리스트
	const [waitReport, setWaitReport] = useState('');

	const navi = useNavigate();

	return (
		// 전체 묶는 div
		<div className='bindingBox' style={{width: '100%', height: '80vh'}}>
			{/* 상단 Box */}
			<div
				className='topBox'
				style={{
					width: '100%',
					height: '39vh',
					display: 'flex',
					justifyContent: 'space-between',
					// marginTop: '3%',
				}}
			>
				<div
					className='recentMember'
					style={{width: '49%', border: '1px solid lightgray'}}
				>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<h5>최근 가입한 멤버</h5>
						<br />
					</div>
					<div>
						<MemberChart />
					</div>
				</div>

				<div
					className='popularSpace'
					style={{width: '49%', border: '1px solid lightgray'}}
				>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<div style={{display: 'flex'}}>
							<div
								style={{
									backgroundColor: 'black',
									color: 'white',
									width: '60px',
									height: '30px',
									borderRadius: '30px',
									textAlign: 'center',
									fontWeight: 'bold',
								}}
							>
								TOP 5
							</div>
							&emsp;
							<b style={{fontSize: '20px'}}>
								인기있는 공간 & 호스트{' '}
								{/* <ThumbUpIcon style={{color: 'gray'}} /> */}
							</b>
						</div>
						<div
							style={{
								backgroundColor: 'white',
								color: 'gray',
								width: '80px',
								height: '30px',

								borderRadius: '30px',
								textAlign: 'center',
								fontWeight: 'bold',

								marginTop: '5px',
								cursor: 'pointer',
								border: '1.5px solid gray',
							}}
							onClick={() => {
								navi('/admin/space');
							}}
						>
							바로가기
						</div>
					</div>
					<div>
						<PopularHostSpace />
					</div>
				</div>
			</div>

			{/* 하단 Box */}
			<div
				className='bottomBox'
				style={{
					width: '100%',
					height: '39vh',
					display: 'flex',
					justifyContent: 'space-between',
					marginTop: '2%',
				}}
			>
				<div
					className='waitSpaceBox'
					style={{width: '49%', border: '1px solid lightgray'}}
				>
					<div
						style={{
							display: 'flex',
						}}
					>
						<b style={{fontSize: '20px'}}>
							등록 대기중인 공간{' '}
							{/* <ThumbUpIcon style={{color: 'gray'}} /> */}
						</b>
						&nbsp;
						<div
							style={{
								backgroundColor: 'gray',
								color: 'white',
								width: '30px',
								height: '30px',
								borderRadius: '30px',
								textAlign: 'center',
								fontWeight: 'bold',
							}}
						>
							{waitSpace.length}
						</div>
					</div>
					<div>
						<WaitSpaceList
							waitSpace={waitSpace}
							setWaitSpace={setWaitSpace}
						/>
					</div>
				</div>
				<div
					className='reportBox'
					style={{width: '49%', border: '1px solid lightgray'}}
				>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
							}}
						>
							<b style={{fontSize: '20px'}}>
								접수 대기중인 신고목록{' '}
								{/* <ThumbUpIcon style={{color: 'gray'}} /> */}
							</b>
							&nbsp;
							<div
								style={{
									backgroundColor: 'gray',
									color: 'white',
									width: '30px',
									height: '30px',
									borderRadius: '30px',
									textAlign: 'center',
									fontWeight: 'bold',
								}}
							>
								{waitReport.length}
							</div>
						</div>

						<div
							style={{
								backgroundColor: 'white',
								color: 'gray',
								width: '80px',
								height: '30px',

								borderRadius: '30px',
								textAlign: 'center',
								fontWeight: 'bold',

								marginTop: '5px',
								cursor: 'pointer',
								border: '1.5px solid gray',
							}}
							onClick={() => {
								navi('/admin/report');
							}}
						>
							바로가기
						</div>
					</div>

					<div>
						<WaitReportList
							waitReport={waitReport}
							setWaitReport={setWaitReport}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AdminMain;
