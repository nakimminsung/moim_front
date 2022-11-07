import React from 'react';
import {NavLink} from 'react-router-dom';
import '../css/main.css';

function mainpage(props) {
	return (
		<div>
			<h1>Hello World!!!</h1>
			<ul className='menu'>
				<li>
					<NavLink to={'/'}>Home</NavLink>
				</li>
				<li>
					<NavLink to={'/member/form'}>회원가입</NavLink>
				</li>
				<li>
					<NavLink to={'/member/list'}>회원목록</NavLink>
				</li>
				<li>
					<NavLink to={'/board/list'}>게시판</NavLink>
				</li>

				<li>
					<NavLink to={'/reducer1'}>리듀서에제1</NavLink>
				</li>

				<li>
					<NavLink to={'/reducer2'}>리듀서예제2</NavLink>
				</li>

				<li>
					<NavLink to={'/qstring?color=red&name=lee&addr=seoul'}>
						쿼리스트링
					</NavLink>
				</li>
			</ul>
		</div>
	);
}

export default mainpage;
