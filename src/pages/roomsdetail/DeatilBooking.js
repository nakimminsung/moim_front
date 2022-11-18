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
import CallIcon from '@material-ui/icons/Call';

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
	const token = localStorage.getItem('token');

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
		for (let i = Number(stime); i <= Number(etime); i++) {
			times.push(i);
		}
		setBusinessHour(times);
		console.log(times);
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
		if (selectTime1 !== '' && selectTime2 !== '') {
			setSelectTime2('');
			setSelectTime1(Number(e.target.dataset.hour));
		} else if (selectTime1 !== '') {
			setSelectTime2(Number(e.target.dataset.hour));
		} else {
			setSelectTime1(Number(e.target.dataset.hour));
		}
	};
	const calculatePay = (e) => {
		if (selectTime1 === '' || selectTime2 === '') {
			for (let s = roomData.stime; s <= roomData.etime; s++) {
				document
					.getElementById('smallTime' + s)
					.classList.remove('smallTimecolor');
			}
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
		let price = 0;
		for (let i = selectStime; i <= selectEtime; i++) {
			//console.log('a' + i)
			if (selectStime !== '' || selectEtime !== '') {
				document.getElementById('smallTime' + i).className +=
					' smallTimecolor';
			}

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
	};

	//Slick Setting(사진 넘기기)
	let settings = {
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
			<div
				style={{
					padding: '14px',
				}}
			>
				<div
					style={{
						borderBottom: '1px solid lightgray',
						paddingBottom: '10px',
						paddingTop: '10px',
						borderTop: '2px solid #704de4',
					}}
				>
					<b>예약선택</b>
				</div>

				<label style={{cursor: 'pointer', padding: '10px 10px'}}>
					<input
						type={'radio'}
						onClick={() => {
							setShowCalendar(true);
						}}
					/>
					시간단위예약
				</label>
			</div>

			<div
				style={{
					display: showCalendar ? 'block' : 'none',
					padding: '14px',
				}}
			>
				<div
					style={{
						marginBottom: '10px',
						borderBottom: '2px solid #704de4',
						paddingBottom: '10px',
					}}
				>
					<b>날짜 선택</b>
					<b
						style={{
							display: showTime ? 'block' : 'none',
							float: 'right',
							color: '#704de4',
						}}
					>
						{moment(selectDay).format('YYYY-MM-DD')}
					</b>
				</div>
				{/* 캘린더 */}
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
					} //달력 년월 숫자만
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
				<div
					style={{
						marginTop: '5px',
						display: 'flex',
						justifyContent: 'space-evenly',
					}}
				>
					<div style={{}}>
						<div
							className='detailBox'
							style={{
								backgroundColor: '#f0f0f0',
							}}
						></div>
						&nbsp;
						<span style={{fontSize: '12px'}}>예약불가</span>
					</div>
					<div>
						<div
							className='detailBox'
							style={{
								backgroundColor: '#ffd014',
							}}
						></div>
						&nbsp;
						<span style={{fontSize: '12px'}}>오늘</span>
					</div>
					<div>
						<div
							className='detailBox'
							style={{
								backgroundColor: '#704de4 ',
							}}
						></div>
						&nbsp;
						<span style={{fontSize: '12px'}}>선택</span>
					</div>
				</div>
			</div>
			<br />
			<div
				className='time'
				style={{
					display: showTime ? 'block' : 'none',
					padding: '14px',
				}}
			>
				<div
					style={{
						marginBottom: '10px',
						borderBottom: '2px solid #704de4',
						paddingBottom: '10px',
					}}
				>
					<b>시간 선택</b>{' '}
					<div
						style={{
							display:
								selectTime1 && selectTime2 ? 'inline' : 'none',
							float: 'right',
							color: '#704de4',
						}}
					>
						<b>
							{selectTime1 > selectTime2
								? selectTime2
								: selectTime1}
							시~
							{selectTime1 < selectTime2
								? Number(selectTime2) + 1
								: Number(selectTime1) + 1}
							시
						</b>
					</div>
				</div>
				<div>
					<Slider {...settings}>
						{businessHour &&
							businessHour.map((item, idx) => (
								<div>
									<span>{item}</span>
									<div
										className='smallTime'
										onClick={selectTime}
										data-hour={item}
										id={'smallTime' + item}
									>
										{selectDay
											? selectDay.getDay() === 0 ||
											  selectDay.getDay() === 6
												? idx <= 18 && idx > 5
													? roomData.holiAmPrice.toLocaleString(
															'ko-KR',
													  )
													: roomData.holiPmPrice.toLocaleString(
															'ko-KR',
													  )
												: idx <= 18 && idx > 5
												? roomData.weekAmPrice.toLocaleString(
														'ko-KR',
												  )
												: roomData.weekPmPrice.toLocaleString(
														'ko-KR',
												  )
											: ''}
									</div>
								</div>
							))}
					</Slider>
					<div
						style={{
							marginTop: '5px',
							display: 'flex',
							justifyContent: 'space-evenly',
						}}
					>
						<div style={{}}>
							<div
								className='detailBox'
								style={{
									backgroundColor: '#f0f0f0',
								}}
							></div>
							&nbsp;
							<span style={{fontSize: '12px'}}>예약불가</span>
						</div>
						<div>
							<div
								className='detailBox'
								style={{
									backgroundColor: '#ffd014',
								}}
							></div>
							&nbsp;
							<span style={{fontSize: '12px'}}>가능</span>
						</div>
						<div>
							<div
								className='detailBox'
								style={{
									backgroundColor: '#704de4 ',
								}}
							></div>
							&nbsp;
							<span style={{fontSize: '12px'}}>선택</span>
						</div>
					</div>
					<div className='detailTimeInfo'>
						<span>
							<ErrorOutlineIcon style={{fontSize: 'small'}} />
							예약 도중 이탈하시는 경우(결제 오류 및 취소 등),
							중복 예약 방지 목적으로 10분 동안 해당 날짜에
							예약하실 수 없습니다
						</span>
					</div>
					<br />
					<div>
						<div
							style={{
								borderBottom: '2px solid #704de4',
								paddingBottom: '10px',
							}}
						>
							<b>총 예약인원 (최대 {roomData.headcount}명)</b>
							<div
								style={{
									float: 'right',
									color: '#704de4',
								}}
							>
								<b>{inwon}명</b>
							</div>
						</div>

						<div className='detailInwon'>
							<div className='changeInwon' onClick={minusHandler}>
								<RemoveIcon />
							</div>

							<input
								type={'text'}
								className='detailInputInwon'
								value={inwon}
								onChange={(e) => {
									if (e.target.value > roomData.headcount) {
										alert(
											'최대 인원은 ' +
												roomData.headcount +
												'명입니다',
										);
									} else {
										setInwon(
											Number(
												e.target.value.replace(
													/[^0-9]/g,
													'',
												),
											),
										);
									}
								}}
							/>
							<div className='changeInwon' onClick={plusHandler}>
								<AddIcon />
							</div>
						</div>
						<div
							className='detailTimeInfo'
							style={{marginBottom: '30px'}}
						>
							<span>
								<ErrorOutlineIcon style={{fontSize: 'small'}} />
								최대 인원까지 선택 가능하며 인원 변경은 사이트
								내에서는 어려우니 호스트에게 문의해주시기
								바랍니다
							</span>
						</div>
						<br />
						<div>
							<div className='detailTotalPrice'>
								<br />
								<b
									style={{
										color: 'black',
										float: 'left',
										fontSize: '20px',
									}}
								>
									공간사용료
								</b>
								<b>₩{totalPrice.toLocaleString('ko-KR')}</b>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className='input-group'
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<button className='call'>
					<CallIcon />
					전화
				</button>
				<button
					className='booking'
					onClick={() => {
						const stime =
							selectTime1 > selectTime2
								? selectTime2
								: selectTime1;
						const etime =
							selectTime1 > selectTime2
								? selectTime1
								: selectTime2;
						if (token) {
							if (stime !== '' || etime !== '') {
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
							} else {
								alert('시간 선택해주시기 바랍니다');
							}
						} else {
							alert('로그인 해주시기 바랍니다');
						}
					}}
				>
					예약하기
				</button>
			</div>
		</div>
	);
}

export default DeatilBooking;
