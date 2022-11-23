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
import {useTheme} from '@mui/material/styles';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';
import styled from '@emotion/styled/macro';
import {Box, Typography} from '@mui/material';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function RoomCard(props) {
	const {roomData, roomNum} = props;
	const [tagData, setTagData] = useState([]);
	const [imageData, setImageData] = useState([]);
	const [reviewCount, setReviewCount] = useState('');
	const [likeCount, setLikeCount] = useState('');
	const navi = useNavigate();

	// room tag list select function
	const selectTagList = (num) => {
		let url = localStorage.url + '/tag/list?num=' + num;
		console.log(url);
		axios.get(url).then((res) => {
			setTagData(res.data.tagData);
			setImageData(res.data.roomImageData);
			setReviewCount(res.data.reviewCount);
			setLikeCount(res.data.likeCount);
		});
	};

	useEffect(() => {
		selectTagList(roomNum);
	}, []);

	// carousel
	const theme = useTheme();
	const [activeStep, setActiveStep] = useState(0);
	const maxSteps = imageData.length;

	const handleNext = () => {
		setActiveStep((prevActiveStep) =>
			activeStep === maxSteps - 1 ? 0 : prevActiveStep + 1,
		);
	};
	const handleBack = () => {
		setActiveStep((prevActiveStep) =>
			activeStep === 0 ? maxSteps - 1 : prevActiveStep - 1,
		);
	};
	const handleStepChange = (step) => {
		setActiveStep(step);
	};

	return (
		<CardWrapper>
			<Card>
				<CardActionArea>
					<Box>
						<CardAction
							axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
							index={activeStep}
							onChangeIndex={handleStepChange}
							enableMouseEvents
						>
							{imageData &&
								imageData.map((step, index) => (
									<ImageDiv key={step.label}>
										{Math.abs(activeStep - index) <= 2 ? (
											<ImageBox
												component='img'
												sx={{
													height: '100%',
													minHeight: '200px',
													display: 'block',
													maxWidth: '100%',
													overflow: 'hidden',
													width: '100%',
												}}
												id='image'
												src={step.rimageUrl}
												alt={step.label}
												onClick={() => {
													navi(
														'/detail/' +
															roomData.num,
													);
												}}
											/>
										) : null}
									</ImageDiv>
								))}
						</CardAction>
						<ImageButtonDiv
							style={{
								display:
									imageData.length < 2 ? 'none' : 'block',
							}}
						>
							<PrevButton size='small' onClick={handleBack}>
								{theme.direction === 'rtl' ? (
									<KeyboardArrowRight />
								) : (
									<KeyboardArrowLeft />
								)}
							</PrevButton>
							<NextButton size='small' onClick={handleNext}>
								{theme.direction === 'rtl' ? (
									<KeyboardArrowLeft />
								) : (
									<KeyboardArrowRight />
								)}
							</NextButton>
						</ImageButtonDiv>
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
					<CardContent
						onClick={() => {
							navi('/detail/' + roomData.num);
						}}
					>
						<Typography gutterBottom variant='h5' component='div'>
							{roomData.name.length > 11
								? roomData.name.substr(0, 12) + '...'
								: roomData.name}
						</Typography>
						<Typography variant='body2' color='text.secondary'>
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
const ImageButtonDiv = styled(Box)``;
const PrevButton = styled(Button)`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	cursor: pointer;
	height: 200px;
	border: 0;
	background: none;
	color: white;
`;
const NextButton = styled(Button)`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	cursor: pointer;
	height: 200px;
	border: 0px;
	background: none;
	color: white;
`;
const PayInfo = styled(Typography)`
	width: 70px;
	height: 70px;
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
`;
const PriceDiv = styled(Box)`
	display: flex;
	align-items: flex-end;
`;
const Price = styled(Typography)`
	font-size: 23px;
	margin-right: 5px;
	color: #9b4de3;
	margin-bottom: -3px;
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
	height: 200px;
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
