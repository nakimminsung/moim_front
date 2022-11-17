import {ClassNames} from '@emotion/react';
import {
	Button,
	FormControl,
	MenuItem,
	Select,
	TextField,
} from '@material-ui/core';
import axios from 'axios';
import React, {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

function SpaceAddForm3(props) {
	localStorage.url = 'http://localhost:9000';
	const {num} = useParams();
	const navi = useNavigate();

	// const num = props.res.num; // 테스트용 번호 나중에 값 받아서 진행 num = roomNum
	console.log({num});
	const timeArr = Array.from(Array(25), (v, i) => i + 0);
	const [stime, setStime] = useState('0');
	const [etime, setEtime] = useState('24');
	const [holiday, setHoliday] = useState('7');
	const [floor, setFloor] = useState('');
	const [parking, setParking] = useState('');
	const [elevator, setElevator] = useState([]);
	const [payment, setPayment] = useState([]);
	const HeadcountRef = React.useRef(''); // 저장 클릭시 curent로 값 가져오기
	const weekAmPriceRef = React.useRef(''); // 저장 클릭시 curent로 값 가져오기
	const weekPmPriceRef = React.useRef(''); // 저장 클릭시 curent로 값 가져오기
	const holiAmPriceRef = React.useRef(''); // 저장 클릭시 curent로 값 가져오기
	const holiPmPriceRef = React.useRef(''); // 저장 클릭시 curent로 값 가져오기

	const payCheck = (e) => {
		setPayment(e.target.value);
		console.log(e.target.value);
	};

	const radioCheck = (e) => {
		setElevator(e.target.value);
		// console.log(e.target.value);
	};

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
		if (e.target.value === 6) {
			setFloor(e.target.value);
			console.log('여기에 6뜹니다');
		} else {
			setFloor(e.target.value);
		}
	};
	const parkingOnchange = (e) => {
		if (e.target.value === 5) {
			setParking(e.target.value);
			console.log('여기에 5뜹니다');
		} else {
			setParking(e.target.value);
		}
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
		let headcount = HeadcountRef.current.value;
		let weekAmPrice = weekAmPriceRef.current.value;
		let weekPmPrice = weekAmPriceRef.current.value;
		let holiAmPrice = weekAmPriceRef.current.value;
		let holiPmPrice = weekAmPriceRef.current.value;

		console.log('headcount=' + headcount);
		console.log('num=' + num);
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
				<div>
					<h1>이용 정보를 입력하세요</h1>
				</div>

				{/* 첫번째줄 시작 */}
				<div className='input-group'>
					<div className='headcount'>
						<h4>인원수</h4>
						<TextField
							id='outlined-full-width'
							style={{margin: 8, width: '450px'}}
							placeholder='최대 인원수를 입력해주세요'
							required
							type={'number'}
							margin='normal'
							InputProps={{inputProps: {min: 0, max: 10}}}
							variant='outlined'
							size='small'
							inputRef={HeadcountRef}
						/>
						명
					</div>
					<div>
						<div className='operating'>
							<h4>이용시간</h4>
							<FormControl
								variant='outlined'
								className={ClassNames.formControl}
								size='small'
							>
								<Select
									native
									defaultValue={0}
									onChange={stiemeOnchange}
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
											{stime < 10 ? '0' + stime : stime}시
										</option>
									))}
								</Select>
							</FormControl>
							<b>부터</b>
							<FormControl
								variant='outlined'
								className={ClassNames.formControl}
								size='small'
							>
								<Select
									native
									defaultValue={24}
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
											{etime < 10 ? '0' + etime : etime}시
										</option>
									))}
								</Select>
							</FormControl>
							<b>까지</b>
						</div>
					</div>
				</div>

				{/* 두번째줄 시작 */}
				<div className='input-group'>
					<div className='holiday'>
						<h4>휴무일</h4>
						<FormControl
							variant='outlined'
							className={ClassNames.formControl}
							size='small'
						>
							<Select
								labelId='demo-simple-select-outlined-label'
								id='demo-simple-select-outlined'
								value={holiday}
								onChange={holidayOnchange}
								defaultValue={7}
							>
								<MenuItem value={7} selected>
									휴무없음
								</MenuItem>
								<MenuItem value={0}>매주 월요일</MenuItem>
								<MenuItem value={1}>매주 화요일</MenuItem>
								<MenuItem value={2}>매주 수요일</MenuItem>
								<MenuItem value={3}>매주 목요일</MenuItem>
								<MenuItem value={4}>매주 금요일</MenuItem>
								<MenuItem value={5}>매주 토요일</MenuItem>
								<MenuItem value={6}>매주 일요일</MenuItem>
							</Select>
						</FormControl>
					</div>
					<div className='floor'>
						<h4>공간 층수</h4>
						<FormControl
							variant='outlined'
							className={ClassNames.formControl}
							size='small'
						>
							<Select
								labelId='demo-simple-select-outlined-label'
								id='demo-simple-select-outlined'
								value={floor}
								onChange={floorOnchange}
								// defaultValue={7}
							>
								<MenuItem value={0}>지상 1층</MenuItem>
								<MenuItem value={1}>지상 2층</MenuItem>
								<MenuItem value={2}>지상 3층</MenuItem>
								<MenuItem value={3}>지하 1층</MenuItem>
								<MenuItem value={4}>지하 2층</MenuItem>
								<MenuItem value={5}>지하 2층</MenuItem>
								<MenuItem value={6}>직접 입력</MenuItem>
							</Select>
						</FormControl>
						{floor === 6 ? (
							<TextField
								id='textFloor'
								style={{margin: 8, width: '450px'}}
								// placeholder='최대 인원수를 입력해주세요'
								InputProps={{inputProps: {min: 4}}}
								required
								type={'number'}
								margin='normal'
								variant='outlined'
								size='small'
							/>
						) : null}
					</div>
					<div className='parking'>
						<h4>주차 여부</h4>
						<FormControl
							variant='outlined'
							className={ClassNames.formControl}
							size='small'
						>
							<Select
								labelId='demo-simple-select-outlined-label'
								id='demo-simple-select-outlined'
								value={parking}
								onChange={parkingOnchange}
								// defaultValue={7}
							>
								<MenuItem value={0}>주차불가</MenuItem>
								<MenuItem value={1}>1대</MenuItem>
								<MenuItem value={2}>2대</MenuItem>
								<MenuItem value={3}>3대</MenuItem>
								<MenuItem value={4}>4대</MenuItem>
								<MenuItem value={5}>직접 입력</MenuItem>
							</Select>
						</FormControl>
						{parking === 5 ? (
							<TextField
								id='textFloor'
								style={{margin: 8, width: '450px'}}
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

				{/* 3번째 줄 시작 */}
				<div className='elevator'>
					<h4>엘리베이터 여부</h4>
					<input
						type={'radio'}
						value='1'
						checked={elevator === '1'}
						onChange={radioCheck}
					/>
					<label>있음</label>
					<input
						type={'radio'}
						value='0'
						checked={elevator === '0'}
						onChange={radioCheck}
					/>
					<label>없음</label>
				</div>

				{/* 4번째 줄 시작 */}
				<div className='price'>
					<table>
						<tbody>
							<tr>
								<th>주간 오전 가격</th>
								<th>가격 오후 가격</th>
								<th>주말 오전 가격</th>
								<th>주말 오후 가격</th>
							</tr>
							<tr>
								<td>
									<input
										type='number'
										ref={weekAmPriceRef}
										min='0'
									/>
								</td>
								<td>
									<input
										type='number'
										ref={weekPmPriceRef}
										min='0'
									/>
								</td>
								<td>
									<input
										type='number'
										ref={holiAmPriceRef}
										min='0'
									/>
								</td>
								<td>
									<input
										type='number'
										ref={holiPmPriceRef}
										min='0'
									/>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				{/* 마지막 줄 */}
				<div className='payment'>
					<h4>바로/승인결제</h4>
					<input
						type={'radio'}
						value='바로결제'
						checked={payment === '바로결제'}
						onChange={payCheck}
					/>
					<label>바로결제</label>
					<input
						type={'radio'}
						value='승인결제'
						checked={payment === '승인결제'}
						onChange={payCheck}
					/>
					<label>승인결제</label>
				</div>
				<div className='buttonEvent'>
					<Button variant='contained' color='primary' type='submit'>
						저장
					</Button>
					{/* <Button
						variant='contained'
						color='secondary'
						type='button'
						onClick={() => {
							navi(-1);
						}}
					>
						취소
					</Button> */}
				</div>
			</form>
		</div>
	);
}

export default SpaceAddForm3;
