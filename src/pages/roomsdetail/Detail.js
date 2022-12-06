import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Detail.css';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DetailInfo from './DetailInfo';
import DatailFunction from './DatailFunction';
import DetailSm from './DetailSm';
function Detail(props) {
	const {num} = useParams();
	const [roomData, setRoomData] = useState(''); //룸정보
	const [tag, setTag] = useState(''); //태그
	const [img, setImg] = useState(''); //방이미지

	//룸관련 데이터 출력
	const onSelectData = () => {
		let url = localStorage.url + '/detailroom?num=' + num;
		axios.get(url).then((res) => {
			setRoomData(res.data.roomData);
			setTag(res.data.tag);
			setImg(res.data.roomImg);
		});
	};

	// 최근 본 상품
	// 1. 상세페이지에 접속하면, 즉 Detail 컴포넌트가 로딩되면...
	useEffect(() => {
		// 2. localStorage의 데이터를 꺼낸다.
		var myArr = sessionStorage.getItem('watched');
		// 최초 접속시 localStorage에 데이터가 없을 경우 새로운 배열을 생성한다.
		// ( 혹은 사용자 모두에게 watched 자료형를 localStorage에 넣는 방법도 있다.)
		if (myArr == null) {
			myArr = [];
		} else {
			// myArr에서 자료를 꺼내 따옴표를 제거하고 다시 myArr에 저장한다.
			myArr = JSON.parse(myArr);
		}
		// 3.현재 상품 id를 myArr에 저장한다.
		myArr.push(num);
		// 4.중복된 데이터를 넣지 않는 set 자료형에 myArr를 담아 중복을 제거한다.
		myArr = new Set(myArr);
		// 중복 제거된 set 자료형의 myArr를 일반 배열로 변경한다.
		myArr = [...myArr];
		// 5.localStorage에 데이터를 JSON 자료형으로 저장한다.
		sessionStorage.setItem('watched', JSON.stringify(myArr));
	}, []);

	useEffect(() => {
		onSelectData(num);
		window.scrollTo(0, 0);
	}, []);

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
		<div
			className='detailContainer'
			style={{width: '100%', marginTop: '40px'}}
		>
			<div className='detailHeader' style={{width: '100%'}}>
				<h2>
					<b>{roomData.name}</b>
				</h2>
				<div style={{color: ' #656565', fontWeight: '300'}}>
					{roomData.oneIntroduction}
				</div>
				{tag &&
					tag.map((row, idx) => (
						<span className='tagRoom'>{'#' + row}&nbsp;</span>
					))}
			</div>
			<br />
			<div className='detailItem'>
				<div className='sliderBanner'>
					<Slider {...settings}>
						{img &&
							img.map((row, idx) => (
								<div>
									<img
										alt=''
										src={row}
										style={{
											width: '100%',
											height: '430px',
											zIndex: '1',
										}}
									/>
								</div>
							))}
					</Slider>

					<br />
					<br />

					<DetailInfo />
				</div>
			</div>
			<div
				className='detailItem2'
				style={{
					top: '70px',
					height: '2000px',
					width: '100%',
				}}
			>
				<DatailFunction />
			</div>
			<div className='detailBottom'>
				<DetailSm />
			</div>
		</div>
	);
}

export default Detail;
