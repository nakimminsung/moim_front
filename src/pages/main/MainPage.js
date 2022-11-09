import {Mic} from '@material-ui/icons';
import React from 'react';
import {NavLink} from 'react-router-dom';
import './MainPage.css';
import Theme from './Theme';

function mainpage(props) {
	return (
		<div>
			<div className='directButton'>
				<h5>바로가기 버튼(임시)</h5>
				<ul className='main'>
					<li>
						<NavLink to={'/'}>메인 페이지</NavLink>
					</li>
					<li>
						<NavLink to={'/host/slist'}>호스트 페이지</NavLink>
					</li>
					<li>
						<NavLink to={'/review'}>리뷰 페이지</NavLink>
					</li>
					<li>
						<NavLink to={'/like'}>찜한공간 버튼</NavLink>
					</li>
					{/* 임시버튼 */}
					<li>
						<NavLink to={'/'}>임시 버튼</NavLink>
					</li>
					<li>
						<NavLink to={'/'}>임시 버튼</NavLink>
					</li>
					<li>
						<NavLink to={'/'}>임시 버튼</NavLink>
					</li>
					<li>
						<NavLink to={'/'}>임시 버튼</NavLink>
					</li>
					<li>
						<NavLink to={'/'}>임시 버튼</NavLink>
					</li>
					<li>
						<NavLink to={'/'}>임시 버튼</NavLink>
					</li>
				</ul>
			</div>

			<br />
			<br />
			<hr />

			<div className='categoryBox' style={{textAlign: 'center'}}>
				<h3>어떤 공간을 찾고있나요?</h3>
				<div>
					<h6>DB에서 category 테이블 가져오기</h6>
				</div>
			</div>
			<br />
			<br />
			<br />
			<br />
			<hr />

			<div className='categoryBox' style={{textAlign: 'center'}}>
				<div>
					<h3>광고 / 공지사항 / 이벤트 배너 영역</h3>
					<img
						alt=''
						src='https://kr.object.ncloudstorage.com/scloud-service/service/166677817_5bcdfa7d1d565f1dcf9c5fd4675c31d1.png'
						style={{borderRadius: '20px'}}
					/>
				</div>
			</div>

			<br />
			<br />
			<hr />

			<Theme />

			<br />
			<br />
			<br />
			<br />
			<hr />

			<div className='themeArea' style={{textAlign: 'center'}}>
				<h3>추천 공간 - 최신순 or ReadCount</h3>
				<h6 style={{color: 'gray'}}>뜨기 전에 먼저 예약하세요!</h6>
			</div>
			<br />
			<br />
			<br />
			<br />
			<hr />

			<div className='reviewArea' style={{textAlign: 'center'}}>
				<h3>리뷰 ZONE</h3>
				<h6 style={{color: 'gray'}}>
					이용자들의 생생한 후기를 만나보세요!
				</h6>
			</div>
			<br />
			<br />
			<br />
			<br />
		</div>
	);
}

export default mainpage;
