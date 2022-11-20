import {NavLink} from 'react-router-dom';
import Category from './Category';
import './MainPage.css';
import NoticeEvent from './NoticeEvent';
import ReviewZone from './ReviewZone';
import SuggestRoom from './SuggestRoom';
import Theme from './Theme';

function Mainpage(props) {
	localStorage.url = 'http://localhost:9000';

	// localStorage.url = process.env.MOIM_APP_BACK_URL;

	return (
		<div>
			<div className='directButton'>
				<ul
					className='main'
					style={{display: 'flex', justifyContent: 'center'}}
				>
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
						<NavLink to={'/like'}>찜한 공간</NavLink>
					</li>
					<li>
						<NavLink to={'/booking/list/47'}>리뷰리스트</NavLink>
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
				</ul>
			</div>

			<hr />
			<br />

			{/* 카테고리 영역 */}
			<Category />

			<br />
			<br />
			<br />
			<br />

			{/* 공지&이벤트 영역 */}
			{/* 
			<NoticeEvent />
			<br />
			<br />
			<br />
			 */}

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
