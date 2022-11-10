import {ArrowUpward, ExpandLess} from '@material-ui/icons';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import './MainPage.css';
import Theme from './Theme';

function Mainpage(props) {
	//localStorage.url = process.env.REACT_APP_URL;
	localStorage.url = 'http://localhost:9000';
	const [category, setCategory] = useState('');

	const getCategoryList = () => {
		let url = localStorage.url + '/categoryList';

		axios.get(url).then((res) => {
			// console.log(res.data);

			var x = res.data;

			setCategory(x);

			console.log(x.length);
		});
	};

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

	useEffect(() => {
		//카테고리 리스트
		getCategoryList();

		//공지사항 가져오기
	}, []);

	return (
		<div>
			<div className='directButton'>
				<h5>바로가기 버튼(임시)</h5>
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
				</ul>
			</div>

			<hr />
			<br />

			<div className='categoryBox' style={{textAlign: 'center'}}>
				<h2 style={{marginBottom: '50px', fontWeight: 'bold'}}>
					어떤 공간을 찾고있나요?
				</h2>

				{/* 카테고리 아이콘 영역 */}
				<div
					className='categoryCard'
					style={{
						display: 'flex',
						justifyContent: 'center', //정렬
						gap: '40px 2.7%', //다음 행(세로) 과의 간격 px, 같은 행의 다음 열 과의 간격 %
						flexWrap: 'wrap', //줄넘김
					}}
				>
					{/* 카테고리 img + 카테고리 name 을 묶은 div 반복 구간 */}
					{category &&
						category.map((row, idx) => (
							<div
								className='categoryCardInfo'
								key={idx}
								style={{cursor: 'pointer', width: '100px'}}
								onClick={() => {
									console.log('num=' + (idx + 1));
								}}
							>
								<img
									alt=''
									src={row.categoryImg}
									style={{
										width: '80px',
										marginBottom: '10px',
									}}
								/>
								<br />
								<span style={{}}>{row.cname}</span>
							</div>
						))}
					{/* 반복구간 종료 */}
				</div>
				{/* 카테고리 아이콘 영역 종료 */}
			</div>

			<br />
			<hr />

			<div className='noticeBox' style={{textAlign: 'center'}}>
				<div>
					<h3>광고 / 공지사항 / 이벤트 배너 영역</h3>
					<br />
					<br />

					<div>
						<img
							alt=''
							src='https://kr.object.ncloudstorage.com/scloud-service/service/166677817_5bcdfa7d1d565f1dcf9c5fd4675c31d1.png'
							style={{borderRadius: '20px'}}
						/>
					</div>
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
				<h3>오늘의 추천 공간</h3>
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
					}}
				>
					{/* <ArrowUpward /> */}
					<ExpandLess />
					<br />
					TOP
				</button>
			</div>
		</div>
	);
}

export default Mainpage;
