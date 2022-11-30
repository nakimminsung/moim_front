import {FormControl, MenuItem, Select, TextField} from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Calendar} from 'react-calendar';

function Acount1(props) {
	const {hostNum} = props;
	console.log('hostNum=' + hostNum);

	localStorage.url = 'http://localhost:9000';

	const [sday, setSday] = useState(
		new Date(new Date().getFullYear(), new Date().getMonth(), 1),
	);
	console.log('sday=' + sday);
	const [eday, setEday] = useState(new Date());
	const [sshowCalendar, setSShowCalendar] = useState(false);
	const [eshowCalendar, setEShowCalendar] = useState(false);

	//시작 날짜 선택 시s
	const changeStartDay = (e) => {
		setSday(e);
		setSShowCalendar(false);
	};
	//끝나는 날짜 선택 시
	const changeEndDay = (e) => {
		setEday(e);
		setEShowCalendar(false);
	};

	// 룸 네임만 담은 리스트 호출 (셀렉트 창에 띄울)
	const [roomlist, setRoomList] = useState([]);
	const roomList = () => {
		let acountUrl = localStorage.url + '/host/acount?hostNum=' + hostNum;
		// console.log(acountUrl);
		axios.get(acountUrl).then((res) => {
			setRoomList(res.data);
		});
	};

	useEffect(() => {
		roomList();
	}, []);
	// 룸 네임만 담은 리스트 호출(셀렉트 창에 띄울)

	// 위에서 띄운 방리스트에서 선택된 값 가져오는 것
	const [roomName, setRoomName] = useState('전체보기');
	console.log(roomName);
	const getRoomName = (e) => {
		setRoomName(e.target.value);
	};

	const [status, setStatus] = useState();

	const statusList = () => {
		let statusUrl =
			localStorage.url + `/host/statuslist?hostNum=${hostNum}`;
		console.log(statusUrl);
		axios.get(statusUrl).then((res) => {
			setStatus(res.data);
			console.log(status);
		});
	};

	//리스트 호출하는 것
	const [acountlist, setAcountList] = useState([]);
	//검색 버튼 눌렀을때 발생하는 이벤트
	const onClickSearch = () => {
		let sdate = moment(sday).format('YYYY-MM-DD');
		let edate = moment(eday).format('YYYY-MM-DD');

		let searchUrl =
			localStorage.url +
			'/host/bsearch?sdate=' +
			sdate +
			'&edate=' +
			edate +
			'&roomName=' +
			roomName +
			'&hostNum=' +
			hostNum;
		console.log(searchUrl);
		axios.get(searchUrl).then((res) => {
			console.log(res.data);
			setAcountList(res.data);
		});
	};
	//검색 버튼 눌렀을때 발생하는 이벤트

	// // --테스트용
	useEffect(() => {
		onClickSearch();
		statusList();
	}, []);

	const [tot, setTot] = useState();
	console.log(tot);

	const sumtotal = () => {
		let a = 0;
		acountlist.map((price, i) => (a += price.totalPrice));

		console.log('a=' + a);
		setTot(a);
		console.log(tot);
	};
	useEffect(() => {
		sumtotal();
	}, [acountlist]);

	return (
		<div>
			<div className='box_search'>
				<div className='box_inner'>
					<div className='one_search'>
						<div className='flex_wrap'>
							<div className='flex_box'>
								<div className='flex'>
									<span>결제기간</span>
									<div style={{display: 'flex'}}>
										<div>
											<TextField
												value={moment(sday).format(
													'YYYY-MM-DD',
												)}
												id='outlined-full-width'
												title='이용시작일'
												InputProps={{
													readOnly: true,
												}}
												size='small'
												onClick={() => {
													setSShowCalendar(true);
												}}
											/>
										</div>
										<span>-</span>
										<div>
											<TextField
												value={moment(eday).format(
													'YYYY-MM-DD',
												)}
												id='outlined-full-width'
												title='이용종료일'
												InputProps={{
													readOnly: true,
												}}
												size='small'
												onClick={() => {
													setEShowCalendar(true);
												}}
											/>
										</div>
									</div>
								</div>
								<div className='flex'>
									<div className='input'>
										<FormControl
											sx={{m: 1, minWidth: 120}}
											size='small'
										>
											<Select
												labelId='demo-select-small'
												id='demo-select-small'
												onChange={getRoomName}
												defaultValue={'전체보기'}
											>
												<MenuItem
													value='전체보기'
													selected
												>
													<em>전체보기</em>
												</MenuItem>
												{roomlist &&
													roomlist
														.filter(
															(
																arr,
																index,
																callback,
															) =>
																index ===
																callback.findIndex(
																	(loc) =>
																		loc.roomName ===
																		arr.roomName,
																),
														)
														.map((item, idx) => (
															<MenuItem
																value={
																	item.roomName
																}
															>
																<em key={idx}>
																	{
																		item.roomName
																	}
																</em>
															</MenuItem>
														))}
											</Select>
										</FormControl>
									</div>
								</div>
								<div className='flex'>
									<label
										style={{cursor: 'pointer'}}
										onClick={onClickSearch}
									>
										<span className='search'>
											<span>검색 돋보기 (넣어주기)</span>
										</span>
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* 캘린더 */}
			<div style={{display: sshowCalendar ? 'block' : 'none'}}>
				<Calendar
					id='sday'
					onChange={changeStartDay}
					value={sday}
					locale='en-EN'
					// defaultActiveStartDate={new Date()} //금일 날짜 표시
					// ctiveStartDate={new Date()}
					// defaultValue={sday}
					formatMonthYear={(locale, date) =>
						date
							.toLocaleString('ko', {
								year: 'numeric',
								month: 'numeric',
							})
							.replace(/.$/, '')
					}
					next2Label={null} //>>없애기
					prev2Label={null} //<<없애기
				/>
			</div>
			<div style={{display: eshowCalendar ? 'block' : 'none'}}>
				<Calendar
					id='eday'
					onChange={changeEndDay}
					value={eday}
					locale='en-EN'
					defaultActiveStartDate={new Date()} //금일 날짜 표시
					formatMonthYear={(locale, date) =>
						date
							.toLocaleString('ko', {
								year: 'numeric',
								month: 'numeric',
							})
							.replace(/.$/, '')
					}
					next2Label={null} //>>없애기
					prev2Label={null} //<<없애기
				/>
			</div>
			<div>
				<span>
					<b>
						{moment(sday).format('YYYY-MM-DD')}
						&nbsp;~&nbsp;
						{moment(eday).format('YYYY-MM-DD')} 기간에 정산된
						내역입니다
					</b>
				</span>
			</div>
			<div>
				<span>
					정산예정금액 :
					<b>
						총 {acountlist.length}건 / 총 {tot}원
					</b>
				</span>
			</div>
			<div>
				<table>
					<thead>
						<tr>
							<th>정산일</th>
							<th>예약번호</th>
							<th>공간명</th>
							<th>PG</th>
							<th>예약자명</th>
							<th>정산금액</th>
							<th>상태</th>
						</tr>
					</thead>
					{acountlist &&
						acountlist.map((item, idx) => (
							<tbody>
								<tr>
									<td>{item.createdAt}</td>
									<td>{item.merchantUid}</td>
									<td>{item.roomName}</td>
									<td>{item.pg}</td>
									<td>{item.name}</td>
									<td>{item.totalPrice}</td>
									<td>
										{Number(item.bookingStatus) === 4 ? (
											<span>이용완료</span>
										) : Number(item.bookingStatus) === 5 ? (
											<span>취소/환불</span>
										) : null}
									</td>
								</tr>
							</tbody>
						))}
				</table>
			</div>
		</div>
	);
}

export default Acount1;
