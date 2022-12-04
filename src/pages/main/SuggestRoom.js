import {Favorite, Person, Sms} from '@material-ui/icons';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

//Slick 관련
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Slider from 'react-slick';

function SuggestRoom(props) {
	const [roomList, setRoomList] = useState('');

	const getRoomList = () => {
		let url = localStorage.url + '/roomList';

		axios.get(url).then((res) => {
			// console.log(res.data);

			var x = res.data;

			setRoomList(x);

			// console.log(x.length);
		});
	};

	useEffect(() => {
		//방 리스트
		getRoomList();
	}, []);

	//공간 클릭 시 상세페이지로 이동되도록
	const navi = useNavigate();

	//Slick Setting(사진 넘기기)
	var settings = {
		dots: true, //하단 점
		infinite: true, //무한 반복 옵션
		speed: 500, // 다음 버튼 누르고 다음 화면 뜨는데까지 걸리는 시간(ms)
		slidesToShow: 1, // 한 화면에 보여질 컨텐츠 개수
		slidesToScroll: 1, //스크롤 한번에 움직일 컨텐츠 개수
		arrows: true, // 옆으로 이동하는 화살표 표시 여부
		autoplay: true, // 자동 스크롤 사용 여부
		autoplaySpeed: 5000, // 자동 스크롤 시 다음으로 넘어가는데 걸리는 시간 (ms)
		pauseOnHover: true, // 슬라이드 이동시 마우스 호버하면 슬라이더 멈추게 설정
		draggable: true, //드래그 가능 여부(없어도 가능)
		nextArrow: <ChevronRightIcon />, //화살표
		prevArrow: <ChevronLeftIcon />, //화살표
	};

	return (
		<div className='themeArea'>
			{/* 상단 출력 문구 */}
			<div style={{textAlign: 'center'}}>
				<h2>
					<b>오늘의 추천 공간</b>
				</h2>
				<h6 style={{color: 'gray', fontWeight: '500'}}>
					뜨기 전에 먼저 예약하세요!
				</h6>
			</div>
			<br />

			{/* 슬라이더 1 출력 부분 */}
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					flexWrap: 'wrap',

					width: '100%',
				}}
			></div>

			<div>
				<div className='sliderBanner'>
					<Slider {...settings}>
						{roomList &&
							roomList.map((data, idx) => (
								<div
									style={{
										border: '1px solid lightgray',
										borderRadius: '5px',
										// width: '350px',
										width: '32%',
										cursor: 'pointer',
										// marginBottom: '30px',
									}}
									key={idx}
									onClick={() => {
										navi('/detail/' + data.num);
									}}
								>
									<img
										alt=''
										src={data.thumbnailImage}
										style={{
											width: '100%',
											height: '250px',
											borderRadius: '5px',
										}}
									/>
									<br />
									<div style={{color: 'gray'}}>
										<h5>
											<b style={{color: 'black'}}>
												{data.name}
											</b>
										</h5>
										<span>room tag list</span>
										<br />
										<span>
											<b
												style={{
													color: '#6f42c1',
													fontSize: '20px',
												}}
											>
												{data.weekAmPrice.toLocaleString(
													'ko-KR',
												)}
											</b>
											&nbsp;원/시간
										</span>
										&emsp;&emsp;
										<span>
											<Person
												style={{fontSize: '20px'}}
											/>{' '}
											최대 {data.headcount}인{' '}
											<Sms style={{fontSize: '20px'}} /> 0{' '}
											<Favorite
												style={{fontSize: '20px'}}
											/>{' '}
											0
										</span>
										<br />
										<br />
									</div>
								</div>
							))}
					</Slider>
				</div>

				<br />
				<br />
			</div>

			{/* 슬라이더 2 출력부분 */}
			<div>
				<div className='sliderBanner'>
					<Slider {...settings}>
						{roomList &&
							roomList.map((data, idx) => (
								<div
									style={{
										border: '1px solid lightgray',
										borderRadius: '5px',
										// width: '350px',
										width: '100%',
										cursor: 'pointer',
										// marginBottom: '30px',
										display: 'flex',
									}}
									key={idx}
									onClick={() => {
										navi('/detail/' + data.num);
									}}
								>
									<img
										alt=''
										src={data.thumbnailImage}
										style={{
											width: '35%',
											height: '250px',
											borderRadius: '5px',
										}}
									/>

									<div
										style={{
											color: 'gray',
											marginLeft: '20px',
										}}
									>
										<h5>
											<b style={{color: 'black'}}>
												{data.name}
											</b>
										</h5>
										<span>room tag list</span>
										<br />
										<span>
											<b
												style={{
													color: '#6f42c1',
													fontSize: '20px',
												}}
											>
												{data.weekAmPrice.toLocaleString(
													'ko-KR',
												)}
											</b>
											&nbsp;원/시간
										</span>
										&emsp;&emsp;
										<span>
											<Person
												style={{fontSize: '20px'}}
											/>{' '}
											최대 {data.headcount}인{' '}
											<Sms style={{fontSize: '20px'}} /> 0{' '}
											<Favorite
												style={{fontSize: '20px'}}
											/>{' '}
											0
										</span>
										<br />
										<br />
									</div>
								</div>
							))}
					</Slider>
				</div>

				<br />
				<br />
			</div>
		</div>
	);
}

export default SuggestRoom;
