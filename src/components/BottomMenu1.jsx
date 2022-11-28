import React from 'react';
import {History, KeyboardArrowUp, Sms} from '@material-ui/icons';

function BottomMenu1(props) {
	// 버튼 클릭 시 스크롤을 맨 위로 올려주는 함수
	const goToTop = () => {
		window.scrollTo({top: 0, behavior: 'smooth'});
	};
	return (
		<>
			{/* 우측 하단 고정부 */}
			<div
				style={{
					width: '220px',
					height: '80px',
					padding: '10px 10px 10px 10px',

					position: 'fixed',
					bottom: '20px',
					right: '20px',

					opacity: '0.75',
					backgroundColor: 'rgba(0, 0, 0)',
					borderRadius: '10px',
					display: 'flex',
					justifyContent: 'space-around',

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
		</>
	);
}

export default BottomMenu1;
