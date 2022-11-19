import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Button, CardActionArea, CardActions} from '@mui/material';
import './booking.css';

function BookingList() {
	const {userNum} = useParams();
	const [bookingList, setBookingList] = useState([]);
	const url = `http://localhost:9000/bookingDetail/list?userNum=${userNum}`;
	const imgUrl = 'http://localhost:9000/image/';

	const getBookingList = () => {
		axios.get(url).then((res) => {
			console.log(res.data);
			setBookingList(res.data);
		});
	};

	// 시간계산
	let stime = new Array();
	let etime = new Array();
	let calTime = new Array();

	for (let i = 0; i < bookingList.length; i++) {
		let str = bookingList[i].bookingTime;
		let arr = str.split(',');
		// console.log('aa' + Array.isArray(arr));
		// console.log(arr);
		let _stime = arr[0];
		let _etime = arr[arr.length - 1];
		stime.push(_stime);
		etime.push(_etime);
		calTime.push(_etime - _stime);
	}
	// console.log(stime);
	// console.log(etime);
	// console.log(calTime);

	useEffect(() => {
		getBookingList();
	}, []);

	return (
		<>
			<h1 className='bookingTop'>예약 내역 리스트</h1>
			<div className='BLContainer'>
				{bookingList.map((item, idx) => (
					<div className='BLItem'>
						<Card sx={{maxWidth: 345}}>
							<CardActionArea>
								<CardMedia
									component='img'
									height='140'
									image={imgUrl + item.thumbnailImage}
									alt='green iguana'
								/>
								<CardContent>
									<Typography
										gutterBottom
										variant='h5'
										component='div'
									>
										{item.roomName}
									</Typography>
									<Typography
										variant='body2'
										color='text.secondary'
									>
										<span>
											{item.bookingDate}&nbsp;&nbsp;&nbsp;
										</span>
										<span>
											{stime[idx]}시 ~ {etime[idx]}
											시&nbsp;&nbsp;{calTime[idx]}시간
										</span>
										<p>{item.totalPrice}원</p>
									</Typography>
								</CardContent>
							</CardActionArea>
							<CardActions>
								<Button size='small' color='primary'>
									상세내역
								</Button>
							</CardActions>
						</Card>
					</div>
				))}
			</div>
		</>
	);
}

export default BookingList;
