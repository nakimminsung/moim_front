import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Button, CardActionArea, CardActions} from '@mui/material';
import jwt_decode from 'jwt-decode';
import Pagination from 'react-js-pagination';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './booking.css';

function BookingList() {
	const {userNum} = useParams();
	const [bookingStatus, setBookingStatus] = useState('');
	const [sort, setSort] = useState('');
	const [bookingList, setBookingList] = useState([]);
	const url = `http://localhost:9000/bookingDetail/list?userNum=${userNum}&bookingStatus=${bookingStatus}&sort=${sort}`;
	const imgUrl = 'http://localhost:9000/image/';
	const token = localStorage.getItem('token');
	const navigate = useNavigate();
	//pagenation
	const [page, setPage] = useState(1);
	let items = 6;

	const handlePageChange = (page) => {
		setPage(page);
	};

	// select
	const handleChange = (event) => {
		setBookingStatus(event.target.value);
	};

	const handleChangeSort = (event) => {
		setSort(event.target.value);
	};

	const getBookingList = () => {
		axios.get(url).then((res) => {
			console.log(res.data);
			setBookingList(res.data);
		});
	};

	// 시간 배열에서 뽑아오기, 요일계산
	let stime = new Array();
	let etime = new Array();
	let calTime = new Array();
	let weekday = new Array();
	for (let i = 0; i < bookingList.length; i++) {
		let str = bookingList[i].bookingTime;
		console.log('aa' + bookingList[i].num);
		let arr = str.split(',');
		// console.log('aa' + Array.isArray(arr));
		// console.log(arr);
		let _stime = arr[0];
		let _etime = arr[arr.length - 1];

		stime.push(_stime);
		etime.push(_etime);
		calTime.push(_etime - _stime);

		//요일
		let date = new Date(bookingList[i].bookingDate);
		var n = date.getDay();
		switch (n) {
			case 0:
				weekday.push('일');
				break;
			case 1:
				weekday.push('월');
				break;
			case 2:
				weekday.push('화');
				break;
			case 3:
				weekday.push('수');
				break;
			case 4:
				weekday.push('목');
				break;
			case 5:
				weekday.push('금');
				break;
			case 6:
				weekday.push('토');
				break;
			default:
				break;
		}
	}
	// console.log('ww' + weekday);
	let newBookingList = [];
	const filter = bookingList.map((data) => ({
		...data,
		stime: stime,
		etime: etime,
		calTime: calTime,
		weekday: weekday,
	}));
	newBookingList = [...filter];
	// console.log(newBookingList);

	useEffect(() => {
		getBookingList();
	}, [bookingStatus, sort]);

	return (
		<>
			{token ? (
				<>
					{Number(userNum) === Number(jwt_decode(token).idx) ? (
						<>
							<h1 className='bookingTop'>예약 내역 리스트</h1>
							<div style={{display: 'flex'}}>
								<Box
									sx={{minWidth: 120}}
									style={{marginRight: '10px'}}
								>
									<FormControl
										sx={{m: 1, minWidth: 120}}
										size='small'
									>
										<InputLabel id='demo-simple-select-label'>
											예약상태
										</InputLabel>
										<Select
											labelId='demo-simple-select-label'
											id='demo-simple-select'
											value={bookingStatus}
											label='bookingStatus'
											onChange={handleChange}
										>
											<MenuItem value={1}>
												승인대기
											</MenuItem>
											<MenuItem value={2}>
												결제대기
											</MenuItem>
											<MenuItem value={3}>
												예약확정
											</MenuItem>
											<MenuItem value={4}>
												이용완료
											</MenuItem>
											<MenuItem value={5}>
												취소환불
											</MenuItem>
										</Select>
									</FormControl>
								</Box>
								<Box sx={{minWidth: 120}}>
									<FormControl
										sx={{m: 1, minWidth: 120}}
										size='small'
									>
										<InputLabel id='demo-simple-select-label'>
											정렬순
										</InputLabel>
										<Select
											labelId='demo-simple-select-label'
											id='demo-simple-select'
											value={sort}
											label='sort'
											onChange={handleChangeSort}
										>
											<MenuItem value={`num desc`}>
												예약일자순
											</MenuItem>
											<MenuItem
												value={`bookingDate desc`}
											>
												이용일자순
											</MenuItem>
										</Select>
									</FormControl>
								</Box>
							</div>
							<div className='BLContainer'>
								{newBookingList
									.map((item, idx) => (
										<div className='BLItem' key={idx}>
											<Card sx={{maxWidth: 345}}>
												<CardActionArea>
													<CardMedia
														component='img'
														height='140'
														image={
															imgUrl +
															item.thumbnailImage
														}
														alt='green iguana'
													/>
													<CardContent>
														<Typography
															gutterBottom
															variant='h5'
															component='div'
															style={{
																textOverflow:
																	'ellipsis',
																overflow:
																	'hidden',
																whiteSpace:
																	'nowrap',
																display:
																	'inline-block',
																width: '250px',
															}}
														>
															{item.roomName}
														</Typography>
														<Typography
															variant='body2'
															color='text.secondary'
														>
															{Number(
																item.bookingStatus,
															) === 1 ? (
																<div
																	className='statusTag'
																	style={{
																		backgroundColor:
																			'#EFB786',
																		color: '#483948',
																	}}
																>
																	<span>
																		승인대기
																	</span>
																</div>
															) : Number(
																	item.bookingStatus,
															  ) === 2 ? (
																<div
																	className='statusTag'
																	style={{
																		backgroundColor:
																			'#EDE7F8',
																		color: '#BB35AE',
																	}}
																>
																	<span>
																		결제대기
																	</span>
																</div>
															) : Number(
																	item.bookingStatus,
															  ) === 3 ? (
																<div
																	className='statusTag'
																	style={{
																		backgroundColor:
																			'#704de4',
																		color: '#ffd014',
																	}}
																>
																	<span>
																		예약확정
																	</span>
																</div>
															) : Number(
																	item.bookingStatus,
															  ) === 4 ? (
																<div
																	className='statusTag'
																	style={{
																		backgroundColor:
																			'#E8EDE7',
																		color: '#036280',
																	}}
																>
																	<span>
																		이용완료
																	</span>
																</div>
															) : (
																<div
																	className='statusTag'
																	style={{
																		backgroundColor:
																			'#E83100',
																		color: 'white',
																	}}
																>
																	<span>
																		취소환불
																	</span>
																</div>
															)}
															<br />
															<span>
																{
																	item.bookingDate
																}
																(
																{
																	item
																		.weekday[
																		idx
																	]
																}
																) &nbsp;
															</span>
															<span>
																{
																	item.stime[
																		idx
																	]
																}
																시 ~{' '}
																{
																	item.etime[
																		idx
																	]
																}
																시,&nbsp;
																{
																	item
																		.calTime[
																		idx
																	]
																}
																시간
															</span>
															<b>
																<p>
																	{item.totalPrice.toLocaleString(
																		'ko-KR',
																	)}
																	원
																</p>
															</b>
														</Typography>
													</CardContent>
												</CardActionArea>
												<CardActions>
													<Button
														size='small'
														color='primary'
														onClick={() => {
															navigate(
																`../detail/${item.num}`,
															);
														}}
													>
														<span
															style={{
																color: '#704de4',
															}}
														>
															상세내역
														</span>
													</Button>
												</CardActions>
											</Card>
										</div>
									))
									.slice(
										items * (page - 1),
										items * (page - 1) + items,
									)}
							</div>
							<Pagination
								activePage={page}
								itemsCountPerPage={6}
								totalItemsCount={bookingList.length}
								pageRangeDisplayed={5}
								prevPageText={'‹'}
								nextPageText={'›'}
								onChange={handlePageChange}
							/>
						</>
					) : (
						<>
							<p>다른 회원의 정보에 접근할 권한이 없습니다</p>
						</>
					)}
				</>
			) : (
				<>
					<p>로그인 후 이용해 주세요</p>
				</>
			)}
		</>
	);
}

export default BookingList;
