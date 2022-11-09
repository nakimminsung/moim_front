import React, {useEffect, useState} from 'react';
import RoomIcon from '@mui/icons-material/Room';
import {Favorite} from '@material-ui/icons';
import SmsIcon from '@mui/icons-material/Sms';
import PersonIcon from '@mui/icons-material/Person';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function RoomCard(props) {
	const [tagData, setTagData] = useState([]);
	const [imageData, setImageData] = useState([]);
	const [reviewCount, setReviewCount] = useState('');
	const [likeCount, setLikeCount] = useState('');
	const {roomData, roomNum} = props;
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

	// image prev, next button option
	const show = document.getElementById('show');
	const btnShow = () => {
		show.style.display = 'block';
	};
	const btnHidden = () => {
		show.style.display = 'none';
	};

	// image zoom
	const img = document.getElementById('image');
	const zoomIn = () => {
		img.style.transform = 'scale(1.2)';
		img.style.zIndex = 1;
		img.style.transition = 'all 0.5s';
	};
	const zoomOut = () => {
		img.style.transform = 'scale(1)';
		img.style.zIndex = 0;
		img.style.transition = 'all 0.5s';
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
		<Card
			sx={{maxWidth: '30%'}}
			onMouseEnter={() => zoomIn()}
			onMouseLeave={() => zoomOut()}
		>
			<CardActionArea
				onMouseEnter={() => btnShow()}
				onMouseLeave={() => btnHidden()}
			>
				<Box sx={{maxWidth: 400, flexGrow: 1}}>
					<AutoPlaySwipeableViews
						axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
						index={activeStep}
						onChangeIndex={handleStepChange}
						enableMouseEvents
						className='img'
					>
						{imageData &&
							imageData.map((step, index) => (
								<div
									key={step.label}
									style={{overflow: 'hidden'}}
								>
									{Math.abs(activeStep - index) <= 2 ? (
										<Box
											component='img'
											sx={{
												height: 200,
												display: 'block',
												maxWidth: '100%',
												overflow: 'hidden',
												width: '100%',
											}}
											className='scale'
											id='image'
											src={step.rimageUrl}
											alt={step.label}
										/>
									) : null}
								</div>
							))}
					</AutoPlaySwipeableViews>
					<div
						id='show'
						style={{display: 'none'}}
						onMouseEnter={() => zoomIn()}
						onMouseLeave={() => zoomOut()}
					>
						<Button
							size='small'
							onClick={handleBack}
							// disabled={activeStep === 0}
							style={{
								position: 'absolute',
								top: '0',
								left: '0',
								bottom: '0',
								cursor: 'pointer',
								height: '200px',
								border: '0',
								background: 'none',
								color: 'white',
							}}
						>
							{theme.direction === 'rtl' ? (
								<KeyboardArrowRight />
							) : (
								<KeyboardArrowLeft />
							)}
						</Button>
						<Button
							size='small'
							onClick={handleNext}
							// disabled={activeStep === maxSteps - 1}
							style={{
								position: 'absolute',
								top: '0',
								right: '0',
								bottom: '0',
								cursor: 'pointer',
								height: '200px',
								border: '0px',
								background: 'none',
								color: 'white',
							}}
						>
							{theme.direction === 'rtl' ? (
								<KeyboardArrowLeft />
							) : (
								<KeyboardArrowRight />
							)}
						</Button>
					</div>
				</Box>
				<span
					style={{
						width: '60px',
						height: '60px',
						backgroundColor:
							roomData.payment === '바로결제'
								? '#ffff33'
								: '#9b4de3',
						color:
							roomData.payment !== '바로결제'
								? '#ffff33'
								: '#9b4de3',
						paddingLeft: '18px',
						paddingRight: '13px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						position: 'absolute',
						top: '0',
						right: '0',
						borderRadius: '2px',
						opacity: '0.9',
						zIndex: '10',
					}}
				>
					{roomData.payment}
				</span>
				<CardContent
					onClick={() => {
						navi('/detail/' + roomData.num);
					}}
				>
					<Typography gutterBottom variant='h5' component='div'>
						{roomData.name.length > 14
							? roomData.name.substr(0, 15) + '...'
							: roomData.name}
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						<div>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									position: 'relative',
									right: '5px',
								}}
							>
								<RoomIcon />
								{roomData.address.split(' ')[2]}
							</div>
							<div style={{marginTop: '10px'}}>
								{tagData &&
									tagData.map((item, i) => (
										<span
											key={i}
											style={{
												marginRight: '5px',
											}}
										>
											#{item.tname}
										</span>
									))}
							</div>
						</div>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								marginTop: '10px',
							}}
						>
							<div
								style={{display: 'flex', alignItems: 'center'}}
							>
								<b
									style={{
										fontSize: '23px',
										marginRight: '5px',
										color: '#9b4de3',
									}}
								>
									{roomData.weekAmPrice.toLocaleString(
										'ko-KR',
									)}
								</b>
								원/시간
							</div>
							<div>
								<span style={{marginLeft: '5px'}}>
									<PersonIcon /> {roomData.headcount}
								</span>
								<span style={{marginLeft: '5px'}}>
									<SmsIcon style={{marginRight: '3px'}} />
									{reviewCount}
								</span>
								<span style={{marginLeft: '5px'}}>
									<Favorite style={{marginRight: '3px'}} />{' '}
									{likeCount}
								</span>
							</div>
						</div>
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default RoomCard;
