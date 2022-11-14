import React, {useEffect, useState} from 'react';
import './Layout.css';
import Header from './Header';
import Footer from './Footer';
import {History, KeyboardArrowUp, Sms} from '@material-ui/icons';
import BasicRouter from '../../Router/BasicRouter';

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
							width: '180px',
							height: '80px',
							padding: '10px 10px 10px 10px',

							position: 'fixed',
							bottom: '20px',
							right: '20px',

							opacity: '0.75',
							backgroundColor: 'rgba(0, 0, 0)',
							borderRadius: '10px',
							display: 'flex',
							justifyContent: 'center',

							zIndex: '1',
						}}
					>
						{/* 상담 chat */}
						<button
							type='button'
							// className='btn btn-warning'
							style={{
								width: '60px',
								height: '60px',
								border: 'none',
								borderRadius: '50px',
								color: 'white',
								backgroundColor: 'rgba(0, 0, 0)',
								outline: 'none',
							}}
						>
							<Sms style={{fontSize: '35px'}} />
						</button>
						&emsp;
						{/* history 최근 본 상품 */}
						<button
							type='button'
							// className='btn btn-warning'
							style={{
								width: '60px',
								height: '60px',
								border: 'none',
								borderRadius: '50px',
								color: 'white',
								backgroundColor: 'rgba(0, 0, 0)',
								outline: 'none',
							}}
						>
							<History style={{fontSize: '35px'}} />
						</button>
						&emsp;
						{/* 맨 위로 버튼 */}
						<button
							type='button'
							className='btnTop'
							onClick={goToTop}
							style={{
								width: '60px',
								height: '60px',
								border: 'none',
								borderRadius: '50px',

								backgroundColor: 'rgba(0, 0, 0)',
								color: 'white',
								outline: 'none',
							}}
						>
							{/* <ArrowUpward /> */}
							<KeyboardArrowUp />
							<br />
							TOP
						</button>
					</div>

					<BasicRouter />
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default Layout;
