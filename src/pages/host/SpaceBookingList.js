import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material';
import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import Pagenation from './Pagenation';
import './SpaceBookingList.css';

function SpaceBookingList(props) {
	// 페이징 처리
	const [limit, setLimit] = useState(6);
	const [page, setPage] = useState(1);
	const offset = (page - 1) * limit;

	localStorage.url = 'http://localhost:9000';
	let imageUrl = localStorage.url + '/image/';
	const hostNum = 1; // 여기에 호스트넘버 받아야합니다
	console.log(hostNum);
	// const {hostNum} = useParams();

	const [sort, setSort] = useState('');
	const [bookingList, setBookingList] = useState([]);
	const [bookingStatus, setBookingStatus] = useState('-1');

	// const [search, setSearch] = useState('');

	// const onChangeSearch = (e) => {
	// 	e.preventDefault();
	// 	e.SearchRef.current.value;
	// };
	// useEffect(() => {
	// 	onSearch();
	// }, [search]);

	// const onSearch = () => {
	// 	// setSearch(SearchRef.current.value);
	// 	console.log(search);

	// 	if (search === null || search === '') {
	// 		let bookingListUrl =
	// 			localStorage.url +
	// 			`/host/bookinglist?hostNum=${hostNum}&bookingStatus=${bookingStatus}&sort=${sort}`;
	// 		axios.get(bookingListUrl).then((res) => {
	// 			setBookingList(res.data);
	// 		});
	// 	}
	// 	const filterData = bookingList.filter((row) =>
	// 		row.roomName.includes(search),
	// 	);
	// 	const filterData2 = bookingList.filter((row) =>
	// 		row.name.includes(search),
	// 	);
	// 	console.log(filterData);
	// 	console.log(filterData2);
	// 	setBookingList(filterData.length !== 0 ? filterData : filterData2);

	// 	// if (search) {
	// 	// 	console.log('check: ' + filterData);
	// 	// 	setBookingList(filterData);
	// 	// 	//서치가 현선혜인데 룸네임이 '현선혜'이 없음
	// 	// }
	// 	// } else if (search) {
	// 	// 	const filterData = bookingList.filter((row) =>
	// 	// 		row.roomName.includes(search),
	// 	// 	);
	// 	// 	setBookingList(filterData);
	// 	// 	//서치가 현선혜인데 룸네임이 '현선혜'이 없음
	// 	// 	if (!row.roomName.includes(search)) {
	// 	// 		const filterData2 = bookingList.filter((row) =>
	// 	// 			row.name.includes(search),
	// 	// 		);
	// 	// 		setBookingList(filterData2);
	// 	// 	}
	// 	// }
	// 	// } else if (search) {
	// 	// 	const filterData2 = bookingList.filter((row) =>
	// 	// 		row.name.includes(search),
	// 	// 	);

	// 	// 	setBookingList(filterData2);
	// 	// }
	// 	console.log(SearchRef.current.value);
	// 	SearchRef.current.value = '';
	// 	console.log(SearchRef.current.value);
	// };

	// const onChangeSearch = (e) => {
	// 	e.preventDefault();
	// 	setSearch(e.target.value);
	// };

	// const onSearch = (e) => {
	// 	e.preventDefault();
	// 	if (search === null || search === '') {
	// 		let bookingListUrl =
	// 			localStorage.url +
	// 			`/host/bookinglist?hostNum=${hostNum}&bookingStatus=${bookingStatus}&sort=${sort}`;
	// 		axios.get(bookingListUrl).then((res) => {
	// 			setBookingList(res.data);
	// 		});
	// 	} else {
	// 		const filterData = bookingList.filter((row) =>
	// 			row.name.includes(search),
	// 		);
	// 		setBookingList(filterData);
	// 	}
	// 	setSearch('');
	// };

	const SearchRef = useRef('');
	const [search, setSearch] = useState('');

	// const bookingSearch = () => {
	// 	const filterData = bookingList.filter((row) =>
	// 		row.roomName.includes(search),
	// 	);
	// 	const filterData2 = bookingList.filter((row) =>
	// 		row.name.includes(search),
	// 	);
	// 	console.log(filterData);
	// 	console.log(filterData2);
	// 	console.log(bookingList);
	// 	console.log(search);
	// 	setBookingList(filterData.length !== 0 ? filterData : filterData2);

	// 	// SearchRef.current = '';
	// };

	const getBookingList = () => {
		// if (search === null || search === '') {
		let bookingListUrl =
			localStorage.url +
			`/host/bookinglist?hostNum=${hostNum}&bookingStatus=${bookingStatus}&sort=${sort}&search=${search}`;
		axios.get(bookingListUrl).then((res) => {
			setBookingList(res.data);
		});
		console.log(bookingListUrl);
		// }
	};
	console.log(bookingList);
	useEffect(() => {
		getBookingList();
		// bookingSearch();
	}, [bookingStatus, sort, search]);

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
		// console.log('aa' + bookingList[i].num);
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

	return (
		<>
			{Number(hostNum) ? (
				<div className='reservation'>
					<div className='reservation_list'>
						<div className='box_search'>
							<div className='box_inner'>
								<div className='one_search'>
									<div className='flex_wrap'>
										<div className='flex_box'>
											<div className='flex'>
												예약정보 검색
											</div>
											<div className='flex'>
												<div className='input'>
													<input
														type={'text'}
														name='reservation_num'
														id='reservation_num'
														placeholder='예약자이름을 입력하세요'
														// ref={SearchRef}
														onChange={(e) =>
															(SearchRef.current =
																e.target.value)
														}
														onKeyUp={(e) =>
															e.key === 'Enter'
																? setSearch(
																		SearchRef.current,
																  )
																: ''
														}
													/>
												</div>
											</div>
											<div className='flex'>
												<label
													style={{cursor: 'pointer'}}
													onClick={() =>
														setSearch(
															SearchRef.current,
														)
													}
												>
													<span className='search'>
														<span>
															검색 돋보기
															(넣어주기)
														</span>
													</span>
												</label>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='filter_area'>
							<div className='inner_width'>
								<div className='sorting_filter'>
									<select
										name='sort'
										id='sorting'
										value={sort}
										onChange={handleChangeSort}
									>
										<option value={`num desc`}>
											예약번호순정렬
										</option>
										<option value={`bookingDate desc`}>
											이용일자순정렬
										</option>
									</select>
								</div>
							</div>
							<div className='inner_width inner_width_shallow'>
								<div className='sorting_filter'>
									<select
										name='sort'
										id='sorting'
										value={bookingStatus}
										onChange={handleChange}
										defaultValue={-1}
									>
										<option value={-1}>전체상태</option>
										<option value={1}>승인대기</option>
										<option value={2}>결제대기</option>
										<option value={3}>예약확정</option>
										<option value={4}>이용완료</option>
										<option value={5}>취소환불</option>
									</select>
								</div>
							</div>
							<div
								className='inner_width inner_width_shallow'
								style={{backgroundColor: 'yellow'}}
							>
								<span>
									<span>캘린더 보기</span>
								</span>
							</div>
						</div>
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
								<div className='BLContainer'>
									{newBookingList &&
										newBookingList
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
																		imageUrl +
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
