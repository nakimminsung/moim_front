import React, {useEffect, useState} from 'react';
import RoomIcon from '@mui/icons-material/Room';
import {Favorite} from '@material-ui/icons';
import SmsIcon from '@mui/icons-material/Sms';
import PersonIcon from '@mui/icons-material/Person';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function RoomCard(props) {
	const [data, setData] = useState([]);
	const [reviewCount, setReviewCount] = useState('');
	const [likeCount, setLikeCount] = useState('');
	const {roomData, roomNum} = props;
	const navi = useNavigate();

	const selectTagList = (num) => {
		let url = localStorage.url + '/tag/list?num=' + num;
		console.log(url);
		axios.get(url).then((res) => {
			setData(res.data.tagData);
			setReviewCount(res.data.reviewCount);
			setLikeCount(res.data.likeCount);
		});
	};

	const show = document.getElementById('show');

	const btnShow = () => {
		show.style.display = 'block';
	};
	const btnHidden = () => {
		show.style.display = 'none';
	};

	const img = document.getElementById('img');

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

	return (
		<Card
			sx={{maxWidth: '30%'}}
			onClick={() => {
				navi('/detail/' + roomData.num);
			}}
			onMouseEnter={() => zoomIn()}
			onMouseLeave={() => zoomOut()}
		>
			{/* <CardActionArea> */}

			<div
				className='img'
				onMouseEnter={() => btnShow()}
				onMouseLeave={() => btnHidden()}
			>
				{/* <CardMedia
						component='img'
						height='200'
						image={roomData.thumbnailImage}
						alt='green iguana'
						className='scale'
					/> */}
				<div
					id='img'
					style={{
						backgroundImage: `url(${roomData.thumbnailImage})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: '100% auto',
						backgroundPosition: 'center',
						width: '100%',
						height: '200px',
					}}
				></div>
				<div id='show' style={{display: 'none'}}>
					<button
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
						이전
					</button>
					<button
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
						다음
					</button>
				</div>
			</div>
			<span
				style={{
					width: '60px',
					height: '60px',
					backgroundColor:
						roomData.payment === '바로결제' ? '#ffff33' : '#9b4de3',
					color:
						roomData.payment !== '바로결제' ? '#ffff33' : '#9b4de3',
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
			<CardContent>
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
							{data &&
								data.map((item, i) => (
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
						<div style={{display: 'flex', alignItems: 'center'}}>
							<b
								style={{
									fontSize: '23px',
									marginRight: '5px',
									color: '#9b4de3',
								}}
							>
								{roomData.weekAmPrice.toLocaleString('ko-KR')}
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
			{/* </CardActionArea> */}
		</Card>
	);
}

export default RoomCard;
