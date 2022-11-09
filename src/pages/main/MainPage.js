import React from 'react';
import {NavLink} from 'react-router-dom';
import './MainPage.css';

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
					<li>
						<NavLink to={'/'}>임시 버튼</NavLink>
					</li>
				</ul>
			</div>

			<br />
			<br />
			<hr />

			<div className='categoryBox' style={{textAlign: 'center'}}>
				<h2>어떤 공간을 찾고있나요?</h2>
				<div>임시</div>
			</div>
		</div>
	);
}

export default mainpage;
