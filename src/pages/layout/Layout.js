import React, {useEffect, useState} from 'react';
import './Layout.css';
import Header from './Header';
import Footer from './Footer';
import Toolbar from '@mui/material/Toolbar';

import BasicRouter from '../../Router/BasicRouter';
import BottomMenu from '../../components/BottomMenu';
import BottomMenu1 from '../../components/BottomMenu1';

function Layout(props) {
	// // 맨 위로 관련
	// // 토글 여부를 결정하는 state 선언
	// const [toggleBtn, setToggleBtn] = useState(true);

	// // window 객체에서 scrollY 값을 받아옴
	// // 어느정도 스크롤이 된건지 판단 후, 토글 여부 결정
	// const handleScroll = () => {
	// 	const {scrollY} = window;

	// 	scrollY > 200 ? setToggleBtn(true) : setToggleBtn(false);
	// };

	// // scroll 이벤트 발생 시 이를 감지하고 handleScroll 함수를 실행
	// useEffect(() => {
	// 	window.addEventListener('scroll', handleScroll);

	// 	return () => {
	// 		window.removeEventListener('scroll', handleScroll);
	// 	};
	// }, []);

	return (
		<div className='layout'>
			<Header />
			<Toolbar id='back-to-top-anchor' />
			<main>
				<div className='layContent'>
					{props.children}
					{/* <BottomMenu1 /> */}
					<BottomMenu />
					<BasicRouter />
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default Layout;
