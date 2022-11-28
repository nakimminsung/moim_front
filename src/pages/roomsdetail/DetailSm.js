import {Box} from '@material-ui/core';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import SmCard from './SmCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import styled from '@emotion/styled/macro';

function DetailSm(props) {
	const {num} = useParams();
	const [randomData, setRandomData] = useState([]);

	const selectRandomPlace = () => {
		let url = localStorage.url + '/detailRandomPlace?num=' + num;
		axios.get(url).then((res) => {
			setRandomData(res.data);
		});
	};

	useEffect((e) => {
		selectRandomPlace(num);
	}, []);

	//Slick Setting(사진 넘기기)
	var settings = {
		infinite: true, //무한 반복 옵션
		speed: 500, // 다음 버튼 누르고 다음 화면 뜨는데까지 걸리는 시간(ms)
		slidesToShow: 3, // 한 화면에 보여질 컨텐츠 개수
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
		<ListWrapper>
			<div style={{width: '100%', marginBottom: '30px'}}>
				<b
					style={{
						borderBottom: '2px solid #ffd014',
						fontSize: '18px',
						paddingBottom: '5px',
					}}
				>
					추천공간
				</b>
			</div>
			<RoomList>
				{randomData &&
					randomData.map((item, i) => (
						<SmCard
							randomData={item}
							key={i}
							randomNum={item.num}
						/>
					))}
			</RoomList>
		</ListWrapper>
	);
}

export default DetailSm;
const ListWrapper = styled(Box)`
	padding-bottom: 100px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 100px;
`;

const RoomList = styled(Box)`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	width: 100%;
`;
