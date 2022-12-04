import {NavLink} from 'react-router-dom';
import Category from './Category';
import './MainPage.css';

import ReviewZone from './ReviewZone';
import SuggestRoom from './SuggestRoom';
import Theme from './Theme';

function Mainpage(props) {
	localStorage.url = 'http://localhost:9000';

	// localStorage.url = process.env.MOIM_APP_BACK_URL;

	return (
		<div>
			{/* <div className='directButton'>
				<ul
					className='main'
					style={{display: 'flex', justifyContent: 'center'}}
				>
					<li>
						<NavLink to={'/admin'}>관리자🐹</NavLink>
					</li>
					<li>
						<NavLink to={'/host/slist'}>호스트 페이지</NavLink>
					</li>
					<li>
						<NavLink to={'/review'}>리뷰 페이지</NavLink>
					</li>
					<li>
						<NavLink to={'/like'}>찜한 공간</NavLink>
					</li>
					<li>
						<NavLink to={'/booking/list/47'}>
							예약내역리스트
						</NavLink>
					</li>
					<li>
						<NavLink to={'/host/bookinglist'}>예약리스트</NavLink>
					</li>
					<li>
						<NavLink to={'/chat/chat'}>채팅 (호스트)</NavLink>
					</li>
					<li>
						<NavLink to={'/chat/chat'}>채팅 (유저)</NavLink>
						<NavLink to={'/passwordsearch'}>비밀번호변경</NavLink>
						<NavLink to={'/host/acount'}>정산페이지</NavLink>
					</li>
					<li>
						<NavLink to={'/notice'}>공지사항🦆</NavLink>
					</li>
				</ul>
			</div>
			<hr /> */}

			{/* 시작 지점 */}
			<br />
			<br />
			<br />
			<br />

			{/* 카테고리 영역 */}
			<Category />

			<br />
			<br />
			<br />
			<br />

			{/* 기획전 영역 */}
			<Theme />

			<br />
			<br />
			<br />
			<br />

			{/* 오늘의 추천 공간 영역 */}
			<SuggestRoom />

			<br />
			<br />
			<br />
			<br />

			<ReviewZone />
			<br />
			<br />
			<br />
			<br />
		</div>
	);
}

export default Mainpage;
