import {FormControl, MenuItem, Select, TextField} from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {Calendar} from 'react-calendar';
import styled from 'styled-components';

function Acount2(props) {
	const {hostNum} = props;
	console.log('hostNum=' + hostNum);

	localStorage.url = 'http://localhost:9000';

	const [sday, setSday] = useState(
		new Date(new Date().getFullYear(), new Date().getMonth(), 1),
	);
	console.log('sday=' + sday);
	const [eday, setEday] = useState(
		new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
	);
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

	const [payStatus, setPayStatus] = useState(1);
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
			hostNum +
			'&payStatus=' +
			payStatus;
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
	// console.log(tot);

	const sumtotal = () => {
		let a = 0;
		acountlist.map((price, i) => {
			if (price.bookingStatus == 4 && price.payStatus == 1) {
				a += price.totalPrice;
			}
		});
		console.log('a=' + a);
		setTot(a);
		console.log(tot);
	};
	useEffect(() => {
		sumtotal();
	}, [acountlist]);

	// const scalendarRef = useRef(null);
	// useEffect(() => {
	// 	function handleClickOutside(event) {
	// 		//@ts-ignore
	// 		if (
	// 			scalendarRef.current &&
	// 			!scalendarRef.current.contains(event.target)
	// 		) {
	// 			setSShowCalendar(false);
	// 		}
	// 	}
	// 	document.addEventListener('mousedown', handleClickOutside);
	// 	return () => {
	// 		document.removeEventListener('mousedown', handleClickOutside);
	// 	};
	// }, [scalendarRef]);

	// const calendarRef = useRef(null);
	// useEffect(() => {
	// 	function handleClickOutside(event) {
	// 		//@ts-ignore
	// 		if (
	// 			calendarRef.current &&
	// 			!calendarRef.current.contains(event.target)
	// 		) {
	// 			setEShowCalendar(false);
	// 		}
	// 	}
	// 	document.addEventListener('mousedown', handleClickOutside);
	// 	return () => {
	// 		document.removeEventListener('mousedown', handleClickOutside);
	// 	};
	// }, [calendarRef]);
	return (
		<div style={{height: '100vh'}}>
			<div className='box_search'>
				<div className='box_inner'>
					<div className='one_search'>
						<div className='flex_wrap'>
							<div>결제기간</div>
							<div className='flex_box' style={{display: 'flex'}}>
								<div>
									<div
										className='flex'
										style={{width: '400px'}}
									>
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
											<div style={{position: 'relative'}}>
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
												sx={{m: 1, minWidth: 200}}
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
															.map(
																(item, idx) => (
																	<MenuItem
																		value={
																			item.roomName
																		}
																	>
																		<em
																			key={
																				idx
																			}
																		>
																			{
																				item.roomName
																			}
																		</em>
																	</MenuItem>
																),
															)}
												</Select>
											</FormControl>
										</div>
									</div>
								</div>
								<div className='flex'>
									<BtnBox
										style={{cursor: 'pointer'}}
										onClick={onClickSearch}
									>
										<BtnLabel>
											<div>검색</div>
										</BtnLabel>
									</BtnBox>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div style={{position: 'relative'}}>
				{/* 캘린더 */}
				<div
					style={{
						display: sshowCalendar ? 'block' : 'none',
						position: 'absolute',
					}}
					// ref={calendarRef}
				>
					<Calendar
						id='sday'
						onChange={changeStartDay}
						value={sday}
						locale='en-EN'
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
				<div
					style={{
						display: eshowCalendar ? 'block' : 'none',
						position: 'absolute',
						left: '220px',
					}}
					// ref={scalendarRef}
				>
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
			</div>
			<div style={{textAlign: 'center', marginTop: '30px'}}>
				<div style={{fontSize: '20px', fontWeight: 'bold'}}>
					<b style={{color: 'red'}}>
						{moment(sday).format('YYYY-MM-DD')}
						&nbsp;~&nbsp;
						{moment(eday).format('YYYY-MM-DD')}
					</b>
					<spna>기간에 정산된 내역입니다</spna>
				</div>
				<div
					style={{
						marginTop: '30px',
						fontSize: '20px',
						fontWeight: 'bold',
					}}
				>
					<span>정산완료금액: </span>
					<b style={{color: '#ffd014'}}>{acountlist.length}건</b>
					&nbsp; / &nbsp;
					<b>총</b>&nbsp;
					<b style={{color: '#704de4'}}>{tot}원</b>
				</div>
			</div>
			<div
				className='acountList'
				style={{marginTop: '50px', width: '100%'}}
			>
				<table style={{width: '100%'}} className='table table-bordered'>
					<thead
						style={{textAlign: 'center'}}
						className='table table-dark'
					>
						<tr>
							<th style={{width: '10%'}}>결제일</th>
							<th style={{width: '5%'}}>예약번호</th>
							<th style={{width: '10%'}}>공간명</th>
							<th style={{width: '5%'}}>PG</th>
							<th style={{width: '5%'}}>예약자명</th>
							<th style={{width: '5%'}}>정산금액</th>
							<th style={{width: '5%'}}>상태</th>
						</tr>
					</thead>

					<tbody
						style={{textAlign: 'center'}}
						className='table table-Light'
					>
						{acountlist.length === 0 ? (
							<tr>
								<td colSpan={7} style={{textAlign: 'center'}}>
									<h5>내역이 없습니다</h5>
								</td>
							</tr>
						) : (
							acountlist &&
							acountlist.map((item, idx) => {
								if (
									item.payStatus == 1 &&
									item.bookingStatus == 4
								)
									return (
										<tr key={idx}>
											<td>{item.createdAt}</td>
											<td>{item.merchantUid}</td>
											<td>{item.roomName}</td>
											<td>{item.pg}</td>
											<td>{item.name}</td>
											<td>{item.totalPrice}</td>
											<td>
												{Number(item.payStatus) ===
												1 ? (
													<span>정산 완료</span>
												) : null}
											</td>
										</tr>
									);
							})
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Acount2;
const BtnBox = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	margin-left: 10px;
	overflow: hidden;
	width: 154px;
	line-height: 50px;
`;

const BtnLabel = styled.label`
	cursor: pointer;
	display: block;
	background-color: #704de4;
	border: 0;
	color: #fff;
	text-align: center;
	border-radius: 0;
	width: 100%;
	height: 100%;
	font-size: 20px;
	line-height: 50px;
`;
