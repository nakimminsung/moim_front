import React, {useEffect, useState} from 'react';
import RoomIcon from '@mui/icons-material/Room';
import {Favorite} from '@material-ui/icons';
import SmsIcon from '@mui/icons-material/Sms';
import PersonIcon from '@mui/icons-material/Person';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {CardActionArea} from '@mui/material';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';
import styled from '@emotion/styled/macro';
import {Box, Typography} from '@mui/material';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CloseIcon from '@material-ui/icons/Close';
import Slider from 'react-slick';
import jwt_decode from 'jwt-decode';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function RoomCard(props) {
	const {roomData, num} = props;
	const [tagData, setTagData] = useState([]);
	const [imageData, setImageData] = useState([]);
	const [reviewCount, setReviewCount] = useState('');
	const [likeCount, setLikeCount] = useState('');
	const navi = useNavigate();

	const imgUrl = 'http://localhost:9000/image/';

	// room tag list select function
	const selectTagList = (num) => {
		let url = localStorage.url + '/tag/list?num=' + num;

		axios.get(url).then((res) => {
			setTagData(res.data.tagData);
			setImageData(res.data.roomImageData);
			setReviewCount(res.data.reviewCount);
			setLikeCount(res.data.likeCount);
		});
	};

	//x 클릭시 찜목록 삭제
	const deleteLike = () => {
		let deleteLikeUrl = localStorage.url + '/detail/deleteLike';
		console.log(deleteLikeUrl);
		let userNum = jwt_decode(localStorage.getItem('token')).idx;
		axios.post(deleteLikeUrl, {userNum, num}).then((res) => {
			alert('삭제되었습니다');
			window.location.reload();
		});
	};

	useEffect(() => {
		selectTagList(num);
	}, [num]);

	//Slick Setting(사진 넘기기)
	var settings = {
		speed: 500, // 다음 버튼 누르고 다음 화면 뜨는데까지 걸리는 시간(ms)
		slidesToShow: 1, // 한 화면에 보여질 컨텐츠 개수
		slidesToScroll: 1, //스크롤 한번에 움직일 컨텐츠 개수
		arrows: true, // 옆으로 이동하는 화살표 표시 여부
		pauseOnHover: true, // 슬라이드 이동시 마우스 호버하면 슬라이더 멈추게 설정
		draggable: true, //드래그 가능 여부(없어도 가능)
		nextArrow: <KeyboardArrowRightIcon className='cardRight' />, //화살표
		prevArrow: <KeyboardArrowLeftIcon className='cardLeft' />, //화살표
	};

	return (
		<CardWrapper>
			<Card>
				<CardActionArea>
					<Box>
						<CardAction className='cardImg'>
							<Slider {...settings}>
								{imageData &&
									imageData.map((step, index) => (
										<ImageDiv key={step.label}>
											<ImageBox
												component='img'
												sx={{
													height: '250px',
													minHeight: '250px',
													display: 'block',
													maxWidth: '100%',
													overflow: 'hidden',
													width: '100%',
												}}
												id='image'
												src={imgUrl + step.rimageUrl}
												alt={step.label}
												onClick={() => {
													navi(
														'/detail/' +
															roomData.num,
													);
												}}
											/>
										</ImageDiv>
									))}
							</Slider>
						</CardAction>
					</Box>
					<PayInfo
						style={{
							backgroundColor:
								roomData.payment === '바로결제'
									? '#ffff33'
									: roomData.payment === '승인결제'
									? '#9b4de3'
									: '',
							color:
								roomData.payment === '바로결제'
									? '#9b4de3'
									: roomData.payment === '승인결제'
									? '#ffff33'
									: '',
						}}
					>
						{roomData.payment}
					</PayInfo>
					<CardContent style={{height: '170px'}}>
						<Typography
							gutterBottom
							variant='h6'
							component='div'
							style={{fontWeight: 'bold'}}
						>
							{String(roomData.name).length > 11
								? roomData.name.substr(0, 12) + '...'
								: roomData.name}
							<span style={{float: 'right'}}>
								<CloseIcon onClick={deleteLike} />
							</span>
						</Typography>
						<Typography
							variant='body2'
							color='text.secondary'
							onClick={() => {
								navi('/detail/' + roomData.num);
							}}
						>
							<Address>
								<RoomIcon />
								{roomData.address.split(' ')[1]}
							</Address>
							<TagDiv>
								{tagData &&
									tagData.map((item, i) => (
										<Tag key={i}>#{item.tname}</Tag>
									))}
							</TagDiv>
							<RoomInfoBottom>
								<PriceDiv>
									<Price>
										{roomData.weekAmPrice.toLocaleString(
											'ko-KR',
										)}
									</Price>
									원/시간
								</PriceDiv>
								<EtcInfoDiv>
									<HeadCount>
										<PersonIcon /> {roomData.headcount}
									</HeadCount>
									<ReviewCount>
										<SmsIcon style={{marginRight: '5px'}} />
										{reviewCount}
									</ReviewCount>
									<LikeCount>
										<Favorite /> {likeCount}
									</LikeCount>
								</EtcInfoDiv>
							</RoomInfoBottom>
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</CardWrapper>
	);
}

export default RoomCard;
const ImageDiv = styled(Box)`
	overflow: hidden;
`;

const PayInfo = styled(Typography)`
	width: 65px;
	height: 65px;
	padding-left: 18px;
	padding-right: 13px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	right: 0;
	border-radius: 1px;
	opacity: 0.9;
	z-index: 10;
	font-weight: 1000;
	word-spacing: normal;
`;
const Address = styled(Typography)`
	display: flex;
	align-items: center;
	position: relative;
	right: 5px;
`;
const TagDiv = styled(Box)`
	margin-top: 10px;
	min-height: 40px;
`;
const Tag = styled(Box)`
	margin-right: 5px;
	display: inline;
`;
const RoomInfoBottom = styled(Box)`
	display: flex;
	justify-content: space-between;
	margin-top: 10px;
	align-items: baseline;
	margin-top: 1px;
`;
const PriceDiv = styled(Box)`
	display: flex;
	align-items: flex-end;
`;
const Price = styled(Typography)`
	font-size: 23px;
	margin-right: 5px;
	color: #9b4de3;
	margin-bottom: -7px;
`;
const EtcInfoDiv = styled(Box)`
	display: flex;
`;
const HeadCount = styled(Typography)`
	margin-left: 5px;
`;
const ReviewCount = styled(Typography)`
	margin-left: 5px;
`;
const LikeCount = styled(Typography)`
	margin-left: 5px;
`;
const CardWrapper = styled(Typography)`
	@media (max-width: 1920px) {
		width: 33%;
		padding: 5px;
	}
	@media (max-width: 1680px) {
		width: 33.3%;
		padding: 5px;
	}
	@media (max-width: 1000px) {
		width: 50%;
		padding: 5px;
	}
	@media (max-width: 900px) {
		width: 100%;
		padding-bottom: 5px;
	}
`;
const CardAction = styled(AutoPlaySwipeableViews)`
	width: 100%;
	height: 250px;
	overflow: hidden;
`;
const ImageBox = styled(Box)`
	transform: scale(1);
	-webkit-transform: scale(1);
	-moz-transform: scale(1);
	-ms-transform: scale(1);
	-o-transform: scale(1);
	transition: all 0.3s ease-in-out; /* 부드러운 모션을 위해 추가*/
	:hover {
		transform: scale(1.1);
		-webkit-transform: scale(1.1);
		-moz-transform: scale(1.1);
		-ms-transform: scale(1.1);
		-o-transform: scale(1.1);
	}
`;
