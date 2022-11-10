import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Detail.css';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

function Detail() {
	localStorage.url = process.env.React_APP_URL;
	const {num} = useParams();
	const navi = useNavigate();
	const [roomData, setRoomData] = useState(''); //룸정보
	const [tag, setTag] = useState(''); //태그
	const [img, setImg] = useState(''); //방이미지

	//룸관련 데이터 출력
	const onSelectData = () => {
		let url = localStorage.url + '/detailroom?num=' + num;
		axios.get(url).then((res) => {
			console.log(res.data.tag);
			setRoomData(res.data.roomData);
			setTag(res.data.tag);
			setImg(res.data.roomImg);
		});
	};

	useEffect(() => {
		onSelectData(num);
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
		autoplaySpeed: 10000, // 자동 스크롤 시 다음으로 넘어가는데 걸리는 시간 (ms)
		pauseOnHover: true, // 슬라이드 이동시 마우스 호버하면 슬라이더 멈추게 설정
		draggable: true, //드래그 가능 여부(없어도 가능)
		nextArrow: <ChevronRightIcon />,
		prevArrow: <ChevronLeftIcon />,
	};

	return (
		<div style={{paddingLeft: '10%', paddingTop: '2%'}}>
			<div>
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
			<div className='sliderBanner'>
				<Slider {...settings} style={{width: '600px'}}>
					{img &&
						img.map((row, idx) => (
							<div>
								<img
									alt=''
									src={row}
									style={{
										width: '600px',
										height: '350px',
										zIndex: '1',
									}}
								/>
							</div>
						))}
				</Slider>
			</div>
		</div>
	);
}

export default Detail;
