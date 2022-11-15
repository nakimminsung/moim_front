import React, {useEffect, useState} from 'react';
import {Calendar} from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import moment from 'moment';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

function DeatilBooking(props) {
	const [selectDay, setSelectDay] = useState('');
	const {num} = useParams();
	const [roomData, setRoomData] = useState('');
	const [businessHour, setBusinessHour] = useState([]);
	const [showCalendar, setShowCalendar] = useState(false);
	const [showTime, setShowTime] = useState(false);
	const [inwon, setInwon] = useState(1);
	const [selectTime1, setSelectTime1] = useState('');
	const [selectTime2, setSelectTime2] = useState('');
	const [totalPrice, setTotalPrice] = useState(0);

	//룸관련 데이터 출력
	const onSelectData = () => {
		let url = localStorage.url + '/detailInfo?num=' + num;

		axios.get(url).then((res) => {
			setRoomData(res.data.roomData);
			onTime(res.data.roomData.stime, res.data.roomData.etime);
		});
	};

	//시간 배열
	const onTime = (stime, etime) => {
		let times = [];
		for (var i = stime; i <= etime; i++) {
			times.push(i);
		}
		setBusinessHour(times);
	};

	//날짜 선택 시
	const changeDay = (e) => {
		setSelectDay(e);
		setShowTime(true);
		if (selectTime1 !== '' || selectTime2 !== '') {
			setSelectTime1('');
			setSelectTime2('');
		}
	};
	//인원 감소
	const minusHandler = (e) => {
		if (inwon <= 1) {
			alert('최소 인원은 1명입니다');
		} else {
			setInwon(inwon - 1);
		}
	};
	//인원 추가
	const plusHandler = (e) => {
		if (inwon >= roomData.headcount) {
			alert('최대 인원은 ' + roomData.headcount + '명입니다');
		} else {
			setInwon(inwon + 1);
		}
	};
	//시간 선택
	const selectTime = (e) => {
		e.preventDefault();

		if (selectTime1 !== '' && selectTime2 !== '') {
			setSelectTime2('');
			setSelectTime1(e.target.dataset.hour);
		} else if (selectTime1 !== '') {
			setSelectTime2(e.target.dataset.hour);
		} else {
			setSelectTime1(e.target.dataset.hour);
		}
	};
	const calculatePay = () => {
		if (selectTime1 === '' || selectTime2 === '') {
			return;
		}
		let selectStime = '';
		let selectEtime = '';
		if (selectTime1 > selectTime2) {
			selectStime = selectTime2;
			selectEtime = selectTime1;
		} else {
			selectStime = selectTime1;
			selectEtime = selectTime2;
		}

		//금액 계산
		var price = 0;
		for (var i = selectStime; i <= selectEtime; i++) {
			console.log('a' + i);

			//주말 오전 오후 가격
			if (selectDay.getDay() === 0 || selectDay.getDay() === 6) {
				if (i >= 6 && i <= 18) {
					price += roomData.holiAmPrice;
				} else {
					price += roomData.holiPmPrice;
				}
			} else {
				//평일 오전 오후 가격
				if (i >= 6 && i <= 18) {
					price += roomData.weekAmPrice;
				} else {
					price += roomData.weekPmPrice;
				}
			}
		}
		setTotalPrice(price);
		console.log(totalPrice);
	};
	//Slick Setting(사진 넘기기)
	var settings = {
		dots: false, //하단 점
		infinite: false, //무한 반복 옵션
		speed: 500, // 다음 버튼 누르고 다음 화면 뜨는데까지 걸리는 시간(ms)
		slidesToShow: 8, // 한 화면에 보여질 컨텐츠 개수
		//slidesToScroll 1, //스크롤 한번에 움직일 컨텐츠 개수
		arrows: false, // 옆으로 이동하는 화살표 표시 여부
		autoplay: false, // 자동 스크롤 사용 여부
		pauseOnHover: true, // 슬라이드 이동시 마우스 호버하면 슬라이더 멈추게 설정
		draggable: true, //드래그 가능 여부(없어도 가능)
		swipeToSlide: true,
	};

	useEffect((e) => {
		onSelectData(num);
	}, []);

	useEffect(() => {
		calculatePay();
	}, [selectTime1, selectTime2, totalPrice]);

	return (
		<div>
			<div>
				<b>예약선택</b>
				<br />
				<label style={{cursor: 'pointer'}}>
					<input
						type={'radio'}
						onClick={() => {
							setShowCalendar(true);
						}}
					/>
					시간단위예약
				</label>
			</div>
			<br />
			<div style={{display: showCalendar ? 'block' : 'none'}}>
				<b>날짜 선택</b>
				<span style={{float: 'right'}}>
					{' '}
					{moment(selectDay).format('YYYY-MM-DD')}
				</span>
				<Calendar
					onChange={changeDay}
					showNeighboringMonth={true} //이전 달 날짜 없애기
					calendarType={'US'} //일요일부터 출력
					defaultActiveStartDate={new Date()} //금일 날짜 표시
					minDate={new Date()} //금일 날짜 기준으로 선택 못하게 막기
					formatDay={(locale, date) =>
						date.toLocaleString('en', {day: 'numeric'})
					} //달력 일 없애기
					formatMonthYear={(locale, date) =>
						date
							.toLocaleString('ko', {
								year: 'numeric',
								month: 'numeric',
							})
							.replace(/.$/, '')
					} //달력 년원 숫자만
					next2Label={null} //>>없애기
					prev2Label={null} //<<없애기
					tileDisabled={(
						{activeStartDate, date, view}, //특정일자 막기
					) =>
						date.getDay() === roomData.holiday ? (
							<p>It's Sunday!</p>
						) : null
					}
				/>
			</div>
			<br />
			<div
				className='time'
				style={{
					display: showTime ? 'block' : 'none',
				}}
			>
				<div>
					<b>시간 선택</b>{' '}
					<span
						style={{
							display:
								selectTime1 && selectTime2 ? 'inline' : 'none',
						}}
					>
						{selectTime1 > selectTime2 ? selectTime2 : selectTime1}
						시~
						{selectTime1 < selectTime2
							? Number(selectTime2) + 1
							: Number(selectTime1) + 1}
						시
					</span>
				</div>
				<div>
					<Slider
						{...settings}
						style={{maxWidth: '70vw', margin: 'auto'}}
					>
						{businessHour &&
							businessHour.map((item, idx) => (
								<div>
									<p>{idx}</p>
									<div
										className='smallTime'
										onClick={selectTime}
										data-hour={item}
									>
										{selectDay
											? selectDay.getDay() === 0 ||
											  selectDay.getDay() === 6
												? idx <= 18 && idx > 5
													? roomData.holiAmPrice
															.toString()
															.replace(
																/\B(?=(\d{3})+(?!\d))/g,
																',',
															)
													: roomData.holiPmPrice
															.toString()
															.replace(
																/\B(?=(\d{3})+(?!\d))/g,
																',',
															)
												: idx <= 18 && idx > 5
												? roomData.weekAmPrice
														.toString()
														.replace(
															/\B(?=(\d{3})+(?!\d))/g,
															',',
														)
												: roomData.weekPmPrice
														.toString()
														.replace(
															/\B(?=(\d{3})+(?!\d))/g,
															',',
														)
											: ''}
									</div>
								</div>
							))}
					</Slider>
					<div>예약불가 가능 선택</div>
					<div
						style={{
							color: 'red',
							fontSize: '12px',
						}}
					>
						<span>
							<ErrorOutlineIcon style={{fontSize: 'small'}} />
							예약 도중 이탈하시는 경우(결제 오류 및 취소 등),
							중복 예약 방지 목적으로 10분 동안 해당 날짜에
							예약하실 수 없습니다
						</span>
					</div>
					<br />
					<div>
						<div style={{borderBottom: '2px solid #704de4'}}>
							<b>총 예약인원 (최대 {roomData.headcount}명)</b>
						</div>

						<div
							style={{width: '100%', padding: '10px 45px'}}
							className='input-group'
						>
							<span
								className='changeInwon'
								onClick={minusHandler}
							>
								<RemoveIcon />
							</span>

							<span
								style={{
									width: '130px',
									border: '1px solid lightgray',
									textAlign: 'center',
									lineHeight: '40px',
									height: '40px',
								}}
							>
								{inwon}
							</span>
							<span className='changeInwon' onClick={plusHandler}>
								<AddIcon />
							</span>
						</div>
						<div>
							{totalPrice}
							<button
								onClick={() => {
									const stime =
										selectTime1 > selectTime2
											? selectTime2
											: selectTime1;
									const etime =
										selectTime1 > selectTime2
											? selectTime1
											: selectTime2;
									window.location.href =
										'/booking/detail?num=' +
										num +
										'&date=' +
										moment(selectDay).format('YYYY-MM-DD') +
										'&stime=' +
										stime +
										'&etime=' +
										etime +
										'&head=' +
										inwon;
								}}
							>
								바로 예약하기
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DeatilBooking;
