import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import {Box} from '@mui/system';
import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Pagenation from './Pagenation';
import './SpaceBookingList.css';

function SpaceBookingList(props) {
	// 페이징 처리
	const [limit, setLimit] = useState(6);
	const [page, setPage] = useState(1);
	const offset = (page - 1) * limit;

	const [searchKeyword, setSearchKeyword] = useState(''); //조회 검색어

	localStorage.url = 'http://localhost:9000';
	let imageUrl = localStorage.url + '/image/';
	// const {hostNum} = useParams();
	const hostNum = sessionStorage.num; // 여기에 호스트넘버 받아야합니다
	console.log(hostNum);

	const [sort, setSort] = useState('num desc');
	const [bookingList, setBookingList] = useState([]);
	const [bookingStatus, setBookingStatus] = useState('-1');
	console.log(bookingList);

	const getBookingList = () => {
		let bookingListUrl =
			localStorage.url +
			`/host/bookinglist?hostNum=${hostNum}&bookingStatus=${bookingStatus}&sort=${sort}`;
		axios.get(bookingListUrl).then((res) => {
			setBookingList(res.data);
		});
		console.log(bookingListUrl);
	};

	console.log(bookingList);
	useEffect(() => {
		getBookingList();
		// bookingSearch();
	}, [bookingStatus, sort]);

	// select
	const handleChange = (event) => {
		setBookingStatus(event.target.value);
		console.log('bookingStatus=' + bookingStatus);
	};

	const handleChangeSort = (event) => {
		setSort(event.target.value);
	};

	// 시간 배열에서 뽑아오기, 요일계산
	let stime = new Array();
	let etime = new Array();
	let calTime = new Array();
	let weekday = new Array();
	for (let i = 0; i < bookingList.length; i++) {
		let str = bookingList[i].bookingTime;
		let arr = str.split(',');
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

	const navi = useNavigate();

	const onCalendar = () => {
		navi(`/host/bookingcalendar`);
	};

	return (
		<>
			{Number(hostNum) ? (
				<div className='reservation'>
					<div className='reservation_list'>
						<h3
							style={{
								fontSize: '26px',
								lineHeight: '26px',
								fontWeight: '400',
							}}
						>
							예약리스트
						</h3>
						<div className='box_search'>
							{/* <div
								style={{fontSize: '15 px', fontWeight: 'bold'}}
							>
								예약정보 검색
							</div> */}
							<div className='flex_box'>
								<div>
									<TextField
										placeholder='예약자명 또는 공간명을 입력하세요.'
										margin='normal'
										variant='outlined'
										size='small'
										style={{
											width: '300px',
										}}
										onChange={(e) => {
											setSearchKeyword(e.target.value);
										}}
									/>
								</div>
								<div className='inner_width'>
									<div className='sorting_filter'>
										<TextField
											style={{
												width: '150px',
											}}
											id='select'
											label='정렬'
											value={sort}
											size='small'
											onChange={handleChangeSort}
											select
										>
											<MenuItem value={`num desc`}>
												번호순정렬
											</MenuItem>
											<MenuItem
												value={`bookingDate desc`}
											>
												이용일자순정렬
											</MenuItem>
										</TextField>
									</div>
								</div>
								<div className='inner_width inner_width_shallow'>
									<div className='sorting_filter'>
										<TextField
											style={{
												width: '150px',
											}}
											label='상태'
											name='sort'
											size='small'
											id='sorting'
											value={bookingStatus}
											onChange={handleChange}
											defaultValue={-1}
											select
										>
											<MenuItem value={-1}>
												전체상태
											</MenuItem>
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
										</TextField>
									</div>
								</div>
								<div>
									<button
										type='button'
										class='btn btn-dark'
										onClick={onCalendar}
										style={{
											width: '200px',
											height: '35px',
										}}
									>
										캘린더보기
									</button>
								</div>
							</div>
						</div>
						<div className='filter_area'></div>
						{bookingList.length == 0 ? (
							<div
								className='reservaion_state_ment'
								style={{
									justifyContent: 'center',
									display: 'flex',
								}}
							>
								현재 진행된 예약이 없습니다
							</div>
						) : (
							<>
								<div
									className='BLContainer'
									style={{
										width: '100%',
										marginLeft: '20px',
										marginTop: '30px',
									}}
								>
									{newBookingList &&
										newBookingList
											.filter((data) =>
												searchKeyword === ''
													? true
													: (data.roomName
															? data.roomName.includes(
																	searchKeyword,
															  )
															: false) ||
													  (data.name
															? data.name.includes(
																	searchKeyword,
															  )
															: false),
											)
											.slice(offset, offset + limit)
											.map((item, idx) => (
												<>
													<div
														className='itemList'
														key={idx}
													>
														<Card
															style={{
																maxWidth: 345,
															}}
														>
															<CardActionArea>
																<CardMedia
																	component='img'
																	height='140'
																	image={
																		item.thumbnailImage
																	}
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
																		{
																			item.roomName
																		}
																	</Typography>

																	<Typography
																		variant='body2'
																		color='text.secondary'
																	>
																		<div
																			style={{
																				display:
																					'flex',
																				justifyContent:
																					'space-between',
																				alignItems:
																					'center',
																			}}
																		>
																			{Number(
																				item.bookingStatus,
																			) ===
																			1 ? (
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
																			  ) ===
																			  2 ? (
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
																			  ) ===
																			  3 ? (
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
																			  ) ===
																			  4 ? (
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
																			<b>
																				{
																					item.name
																				}
																			</b>
																		</div>
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
																			)
																			&nbsp;
																		</span>
																		<span>
																			{
																				item
																					.stime[
																					idx
																				]
																			}
																			시 ~{' '}
																			{
																				item
																					.etime[
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
																		navi(
																			`../bookingdetail/${item.num}`,
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
												</>
											))}
								</div>
							</>
						)}

						<div>
							<Pagenation
								total={bookingList.length}
								limit={limit}
								page={page}
								setPage={setPage}
							/>
						</div>
					</div>
				</div>
			) : (
				'로그인 후 이용가능합니다'
			)}
		</>
	);
}

export default SpaceBookingList;
