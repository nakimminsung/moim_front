import {ClassNames} from '@emotion/react';
import {FormControl, MenuItem, Select, TextField} from '@material-ui/core';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import styled from 'styled-components';
import './SpaceAddForm3.css';

function SpaceUpdateForm3(props) {
	localStorage.url = 'http://localhost:9000';
	const {num} = useParams();
	const navi = useNavigate();

	// const num = props.res.num; // 테스트용 번호 나중에 값 받아서 진행 num = roomNum
	console.log({num});
	const timeArr = Array.from(Array(25), (v, i) => i + 0);
	const [stime, setStime] = useState(1);
	const [etime, setEtime] = useState(24);
	const [holiday, setHoliday] = useState(7);

	const [floorhide, setFloorHide] = useState(false);
	const [parkinghide, setParkingHide] = useState(false);

	const [floor, setFloor] = useState('1');
	const [parking, setParking] = useState('');
	const [headcount, setHeadCount] = useState();
	const [weekAmPrice, setWeekAmPrice] = useState();
	const [weekPmPrice, setWeekPmPrice] = useState();
	const [holiAmPrice, setHoliAmPrice] = useState();
	const [holiPmPrice, setHoliPmPrice] = useState();

	const [elevator, setElevator] = useState();
	const [payment, setPayment] = useState();

	// const floorRef = React.useRef('');
	// const parkingRef = React.useRef('');
	// const HeadcountRef = React.useRef(''); // 저장 클릭시 curent로 값 가져오기
	// const weekAmPriceRef = React.useRef(''); // 저장 클릭시 curent로 값 가져오기
	// const weekPmPriceRef = React.useRef(''); // 저장 클릭시 curent로 값 가져오기
	// const holiAmPriceRef = React.useRef(''); // 저장 클릭시 curent로 값 가져오기
	// const holiPmPriceRef = React.useRef(''); // 저장 클릭시 curent로 값 가져오기

	//num에 해당하는 dto 가져오기
	const onSelectData = () => {
		let selectUrl = localStorage.url + '/host/select?num=' + num;
		console.log(selectUrl);
		axios.get(selectUrl).then((res) => {
			setStime(res.data.stime);
			setEtime(res.data.etime);
			setHoliday(res.data.holiday);
			setElevator(res.data.elevator);
			console.log(elevator);
			setPayment(res.data.payment);
			// console.log(payment);
			setFloor(res.data.floor);
			setParking(res.data.parking);
			setHeadCount(res.data.headcount);
			setWeekAmPrice(res.data.weekAmPrice);
			setWeekPmPrice(res.data.weekPmPrice);
			setHoliAmPrice(res.data.holiAmPrice);
			setHoliPmPrice(res.data.holiPmPrice);
		});
	};

	//처음 시작 시 스프링으로부터 dto를 얻어야하므로 useEffect 에서 호출
	useEffect(() => {
		onSelectData();
		console.log('호출');
	}, []);

	const stiemeOnchange = (e) => {
		setStime(e.target.value);
	};
	const etiemeOnchange = (e) => {
		setEtime(e.target.value);
	};
	const holidayOnchange = (e) => {
		setHoliday(e.target.value);
	};
	const floorOnchange = (e) => {
		setFloor(e.target.value);
		console.log(e.target.value);
		if (e.target.value != '직접입력') {
			setFloorHide(false);
		}
	};
	const parkingOnchange = (e) => {
		setParking(e.target.value);
		console.log(e.target.value);
		if (e.target.value != '직접입력') {
			setParkingHide(false);
		}
	};

	const onClick = (e, key, type) => {
		e.preventDefault();
		if (type === 'elevator') {
			setElevator(key);
		} else {
			setPayment(key);
		}
		console.log(elevator);
		console.log(payment);
	};
	// useEffect(() => {
	// 	console.log('headcount=' + headcount);
	// 	console.log('floor=' + floor);
	// 	console.log('weekAmPrice=' + weekAmPrice);
	// 	// console.log('stime=' + stime);
	// 	// console.log('etime=' + etime);
	// 	// console.log('holiday=' + holiday);
	// }, [stime, etime, floor]);

	//저장 버튼
	const onSubmitEvent = (e) => {
		e.preventDefault();

		let insertUpdateUrl = localStorage.url + '/host/insertupdate';
		//헤드카운트 가져오는 방법
		// let headcount = HeadcountRef.current.value;
		// let weekAmPrice = weekAmPriceRef.current.value;
		// let weekPmPrice = weekAmPriceRef.current.value;
		// let holiAmPrice = weekAmPriceRef.current.value;
		// let holiPmPrice = weekAmPriceRef.current.value;
		// let floor = floorRef.current.value;
		// let parking = parkingRef.current.value;

		axios
			.post(insertUpdateUrl, {
				num,
				headcount,
				stime,
				etime,
				holiday,
				floor,
				parking,
				elevator,
				payment,
				weekAmPrice,
				weekPmPrice,
				holiAmPrice,
				holiPmPrice,
			})
			.then((res) => {
				navi(`/host/slist`);
			});
	};
	return (
		<div className='contents'>
			<form onSubmit={onSubmitEvent}>
				<div
					className='input-group'
					style={{
						position: 'relative',
						width: '100%',
						borderBottom: '3px solid #704de4',
						borderBottomWidth: '4px',
						fontSize: '16px',
						lineHeight: '20px',
						paddingBottom: '26px',
					}}
				>
					<h3
						style={{
							fontSize: '26px',
							lineHeight: '26px',
							fontWeight: '400',
						}}
					>
						이용 정보를 입력하세요
					</h3>
					<span
						style={{
							verticalAlign: 'top',
							position: 'absolute',
							color: '#656565',
							right: '0',
							lineHeight: '14px',
							fontSize: '16px',
							top: '1px',
						}}
					>
						<span style={{verticalAlign: 'top', color: '#ff3a48'}}>
							<IcoRequired>*</IcoRequired> 필수입력
						</span>
					</span>
				</div>

				{/* 첫번째줄 시작 */}
				<Space>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<div className='headcount'>
							<div style={{fontSize: '20px', fontWeight: 'bold'}}>
								인원수
								<IcoRequired>*</IcoRequired>
							</div>
							<div
								style={{display: 'flex', alignItems: 'center'}}
							>
								<TextField
									id='outlined-full-width'
									style={{width: '400px'}}
									placeholder='최대 인원수를 입력해주세요'
									required
									type={'number'}
									margin='normal'
									value={headcount}
									InputProps={{
										inputProps: {min: 0, max: 500},
									}}
									variant='outlined'
									size='small'
									onChange={(e) =>
										setHeadCount(e.target.value)
									}
									// inputRef={HeadcountRef}
								/>
								<b>명</b>
							</div>
						</div>
						<div style={{marginLeft: '300px'}}>
							<div className='operating'>
								<div
									style={{
										fontSize: '20px',
										fontWeight: 'bold',
									}}
								>
									이용시간
									<IcoRequired>*</IcoRequired>
								</div>
								<div
									style={{
										marginTop: '3px',
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
										}}
									>
										<FormControl
											style={{width: '150px'}}
											variant='outlined'
											className={ClassNames.formControl}
											size='small'
										>
											<Select
												native
												// defaultValue={0}
												onChange={stiemeOnchange}
												value={stime}
												inputProps={{
													id: 'outlined-age-native-simple',
												}}
											>
												{timeArr.map((stime, i) => (
													<option
														aria-label='None'
														value={stime}
														key={i}
													>
														{stime < 10
															? '0' + stime
															: stime}
														시
													</option>
												))}
											</Select>
										</FormControl>
										&nbsp;&nbsp;
										<b>부터</b>
										&nbsp;&nbsp;
									</div>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
										}}
									>
										<FormControl
											style={{width: '150px'}}
											variant='outlined'
											className={ClassNames.formControl}
											size='small'
										>
											<Select
												native
												// defaultValue={24}
												value={etime}
												onChange={etiemeOnchange}
												inputProps={{
													id: 'outlined-age-native-simple',
												}}
											>
												{timeArr.map((etime, i) => (
													<option
														aria-label='None'
														value={etime}
														key={i}
													>
														{etime < 10
															? '0' + etime
															: etime}
														시
													</option>
												))}
											</Select>
										</FormControl>
										&nbsp;&nbsp;
										<b>까지</b>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Space>

				{/* 두번째줄 시작 */}
				<Space>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<div className='holiday'>
							<div style={{fontSize: '20px', fontWeight: 'bold'}}>
								휴무일
								<IcoRequired>*</IcoRequired>
							</div>
							<div style={{marginTop: '15px'}}>
								<FormControl
									style={{width: '150px'}}
									variant='outlined'
									className={ClassNames.formControl}
									size='small'
								>
									<Select
										labelId='demo-simple-select-outlined-label'
										id='demo-simple-select-outlined'
										value={holiday}
										onChange={holidayOnchange}
										// defaultValue={7}
									>
										<MenuItem value={7} selected>
											휴무없음
										</MenuItem>
										<MenuItem value={0}>
											매주 월요일
										</MenuItem>
										<MenuItem value={1}>
											매주 화요일
										</MenuItem>
										<MenuItem value={2}>
											매주 수요일
										</MenuItem>
										<MenuItem value={3}>
											매주 목요일
										</MenuItem>
										<MenuItem value={4}>
											매주 금요일
										</MenuItem>
										<MenuItem value={5}>
											매주 토요일
										</MenuItem>
										<MenuItem value={6}>
											매주 일요일
										</MenuItem>
									</Select>
								</FormControl>
							</div>
						</div>
						<div className='floor'>
							<div style={{fontSize: '20px', fontWeight: 'bold'}}>
								공간 층수
								<IcoRequired>*</IcoRequired>
							</div>
							<div
								style={{display: 'flex', alignItems: 'center'}}
							>
								<div style={{marginTop: '15px'}}>
									<FormControl
										style={{width: '150px'}}
										variant='outlined'
										className={ClassNames.formControl}
										size='small'
									>
										<Select
											labelId='demo-simple-select-outlined-label'
											id='demo-simple-select-outlined'
											value={floor}
											// ref={floorRef}
											// value={floorRef.current}
											onChange={floorOnchange}
											defaultValue={1}
										>
											<MenuItem value={1}>
												지상 1층
											</MenuItem>
											<MenuItem value={2}>
												지상 2층
											</MenuItem>
											<MenuItem value={3}>
												지상 3층
											</MenuItem>
											<MenuItem value={-1}>
												지하 1층
											</MenuItem>
											<MenuItem value={-2}>
												지하 2층
											</MenuItem>
											<MenuItem value={-3}>
												지하 3층
											</MenuItem>
											<MenuItem
												value={'직접입력'}
												onClick={() => {
													setFloorHide(true);
													console.log(
														'floorhide=' +
															floorhide,
													);
												}}
											>
												직접 입력
											</MenuItem>
										</Select>
									</FormControl>
									{floorhide == true ? (
										<TextField
											id='textFloor'
											style={{
												width: '150px',
												marginTop: '0px',
											}}
											// placeholder='최대 인원수를 입력해주세요'
											InputProps={{inputProps: {min: 4}}}
											required
											type={'number'}
											margin='normal'
											variant='outlined'
											size='small'
											onChange={(e) => {
												setFloor(e.target.value);
												console.log('floor=' + floor);
											}}
										/>
									) : null}
								</div>
							</div>
						</div>
						<div className='parking'>
							<div style={{fontSize: '20px', fontWeight: 'bold'}}>
								주차여부
								<IcoRequired>*</IcoRequired>
							</div>
							<div
								style={{display: 'flex', alignItems: 'center'}}
							>
								<div style={{marginTop: '15px'}}>
									<FormControl
										variant='outlined'
										className={ClassNames.formControl}
										size='small'
									>
										<Select
											style={{width: '150px'}}
											labelId='demo-simple-select-outlined-label'
											id='demo-simple-select-outlined'
											value={parking}
											// ref={parkingRef}
											onChange={parkingOnchange}
											defaultValue={1}
										>
											<MenuItem value={0}>
												주차불가
											</MenuItem>
											<MenuItem value={1}>1대</MenuItem>
											<MenuItem value={2}>2대</MenuItem>
											<MenuItem value={3}>3대</MenuItem>
											<MenuItem value={4}>4대</MenuItem>
											<MenuItem
												value={'직접입력'}
												onClick={() => {
													setParkingHide(true);
													console.log(
														'parkinghide=' +
															parkinghide,
													);
												}}
											>
												직접 입력
											</MenuItem>
										</Select>
									</FormControl>
									{parkinghide == true ? (
										<TextField
											id='textFloor'
											style={{
												width: '150px',
												marginTop: '0px',
											}}
											// placeholder='최대 인원수를 입력해주세요'
											InputProps={{inputProps: {min: 5}}}
											required
											type={'number'}
											margin='normal'
											variant='outlined'
											size='small'
										/>
									) : null}
								</div>
							</div>
						</div>
					</div>
				</Space>
				{/* 3번째 줄 시작 */}
				<Space>
					<div className='elevator'>
						<div>
							<div style={{fontSize: '20px', fontWeight: 'bold'}}>
								엘리베이터 여부
							</div>
						</div>
						<div>
							<div style={{display: 'flex'}}>
								<div>
									<button
										type='button'
										onClick={(e) =>
											onClick(e, 1, 'elevator')
										}
										className={
											elevator === 1 ? 'selected' : ''
										}
										style={{
											width: '200px',
											height: '35px',
											borderStyle: 'solid',
											border: '1px solid #704de4',
										}}
									>
										있음
									</button>
								</div>
								<div>
									<button
										type='button'
										onClick={(e) =>
											onClick(e, 0, 'elevator')
										}
										className={
											elevator === 0 ? 'selected' : ''
										}
										style={{
											width: '200px',
											height: '35px',
											borderStyle: 'solid',
											border: '1px solid #704de4',
										}}
									>
										없음
									</button>
								</div>
							</div>
						</div>
					</div>
				</Space>

				{/* 4번째 줄 시작 */}
				<Space>
					<div className='price'>
						<div style={{fontSize: '20px', fontWeight: 'bold'}}>
							가격 정보 입력
						</div>

						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								marginTop: '20px',
							}}
						>
							<table
								style={{width: '100%'}}
								className='table table-bordered'
							>
								<thead
									style={{textAlign: 'center'}}
									className='table table-info'
								>
									<tr>
										<th>주간 오전 가격</th>
										<th>가격 오후 가격</th>
										<th>주말 오전 가격</th>
										<th>주말 오후 가격</th>
									</tr>
								</thead>
								<tbody
									style={{textAlign: 'center'}}
									className='table table-Light'
								>
									<tr>
										<td>
											<input
												type='number'
												value={weekAmPrice}
												// ref={weekAmPriceRef}
												onChange={(e) =>
													setWeekAmPrice(
														e.target.value,
													)
												}
												min='0'
											/>
										</td>
										<td>
											<input
												type='number'
												value={weekPmPrice}
												// ref={weekPmPriceRef}
												onChange={(e) =>
													setWeekPmPrice(
														e.target.value,
													)
												}
												min='0'
											/>
										</td>
										<td>
											<input
												type='number'
												value={holiAmPrice}
												// ref={holiAmPriceRef}
												onChange={(e) =>
													setHoliAmPrice(
														e.target.value,
													)
												}
												min='0'
											/>
										</td>
										<td>
											<input
												type='number'
												value={holiPmPrice}
												// ref={holiPmPriceRef}
												onChange={(e) =>
													setHoliPmPrice(
														e.target.value,
													)
												}
												min='0'
											/>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</Space>

				{/* 마지막 줄 */}
				<Space>
					<div className='payment'>
						<div style={{fontSize: '20px', fontWeight: 'bold'}}>
							바로결제/승인결제
						</div>
						<div style={{display: 'flex', marginTop: '20px'}}>
							<div>
								<button
									type='button'
									onClick={(e) =>
										onClick(e, '바로결제', 'payment')
									}
									className={
										payment === '바로결제'
											? 'selected1'
											: ''
									}
									style={{
										width: '200px',
										height: '35px',
										borderStyle: 'solid',
										border: '1px solid #704de4',
									}}
								>
									바로결제
								</button>
							</div>
							<div>
								<button
									type='button'
									onClick={(e) =>
										onClick(e, '승인결제', 'payment')
									}
									className={
										payment === '승인결제'
											? 'selected1'
											: ''
									}
									style={{
										width: '200px',
										height: '35px',
										borderStyle: 'solid',
										border: '1px solid #704de4',
									}}
								>
									승인결제
								</button>
							</div>
						</div>
					</div>
				</Space>

				<ButtonEvent>
					<BtnEventWrap>
						<BtnWrap
							typy='button'
							style={{
								cursor: 'pointer',
								backgroundColor: '#4d4d4d',
							}}
							onClick={() => {
								navi(-1);
							}}
						>
							이전
						</BtnWrap>
					</BtnEventWrap>
					<BtnEventWrap>
						<BtnWrap
							type='submit'
							style={{backgroundColor: '#ff3a48'}}
							onClick={onSubmitEvent}
						>
							저장
						</BtnWrap>
					</BtnEventWrap>
				</ButtonEvent>
			</form>
		</div>
	);
}

export default SpaceUpdateForm3;

const ButtonEvent = styled.div`
	margin: 0 auto 100px;
	margin-top: 50px;
	width: 1380;
`;

const BtnWrap = styled.span`
	display: block;
	width: 100%;
	border-radius: 4px;
	font-size: 20px;
	line-height: 60px;
	color: #fff;
	text-align: center;
`;

const BtnEventWrap = styled.span`
	width: 50%;
	float: left;
	padding-right: 10px;
`;
const IcoRequired = styled.span`
	vertical-align: top;
	color: #ff3a48;
	font-size: 20px;
`;
const Space = styled.div`
	position: relative;
	margin-top: 40px;
`;
