import React, {useEffect, useState} from 'react';
import './Layout.css';
import Header from './Header';
import Footer from './Footer';
import {KeyboardArrowUp} from '@material-ui/icons';

function Layout(props) {
	// 맨 위로 관련
	// 토글 여부를 결정하는 state 선언
	const [toggleBtn, setToggleBtn] = useState(true);

	// window 객체에서 scrollY 값을 받아옴
	// 어느정도 스크롤이 된건지 판단 후, 토글 여부 결정
	const handleScroll = () => {
		const {scrollY} = window;

		scrollY > 200 ? setToggleBtn(true) : setToggleBtn(false);
	};

	// scroll 이벤트 발생 시 이를 감지하고 handleScroll 함수를 실행
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	// 버튼 클릭 시 스크롤을 맨 위로 올려주는 함수
	const goToTop = () => {
		window.scrollTo({top: 0, behavior: 'smooth'});
	};
	return (
		<div className='layout'>
			<Header />

			<main>
				<div className='layContent'>
					{props.children}
					{/* 우측 하단 고정부 */}
					<div
						style={{
							position: 'fixed',
							bottom: '20px',
							right: '20px',
							opacity: '0.8',
						}}
					>
						<button
							type='button'
							className='btn btn-warning'
							style={{
								width: '70px',
								height: '70px',
								borderRadius: '50px',
								marginTop: '10px',
							}}
						>
							<b>상담하기</b>
						</button>
						<br />

						{/* 맨 위로 버튼 */}
						<button
							type='button'
							className='btn btn-dark'
							onClick={goToTop}
							style={{
								width: '70px',
								height: '70px',
								borderRadius: '50px',
								marginTop: '10px',
							}}
						>
							{/* <ArrowUpward /> */}
							<KeyboardArrowUp />
							<br />
							TOP
						</button>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}

export default Layout;
