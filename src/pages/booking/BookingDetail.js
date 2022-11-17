import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import './booking.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InfoIcon from '@mui/icons-material/Info';
import BdOtherInfo from './BdOtherInfo';
import defaultImg from './img/404.png';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function BookingDetail() {
	const [roomData, setRoomData] = useState('');
	const [categoryList, setCategoryList] = useState([]);
	const [facilityList, setFacilityList] = useState([]);
	const [optionList, setOptionList] = useState([]);
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [purpose, setPurpose] = useState('');
	const [bookingStatus, setBookingStatus] = useState('');
	const [hostNum, setHostNum] = useState('');
	// 요청사항 (textarea)
	const contentRef = useRef('');
	//const bookingTime
	// iamport
	const {IMP} = window;
	// 옵션 수량 버튼
	const [optionPrice, setOptionPrice] = useState('');

	const navi = useNavigate();
	//const {num} = useParams();
	//	const num = 1;
	const url = `http://localhost:9000/room/detail?num=${num}`;
	const cUrl = `http://localhost:9000/room/category?num=${num}`;
	const fUrl = `http://localhost:9000/room/facility?num=${num}`;
	const oUrl = `http://localhost:9000/room/option?num=${num}`;
	const imgUrl = 'http://localhost:9000/image/';

	let roomPrice = roomData.weekAmPrice;
	let totalPrice = roomPrice + optionPrice;
	//let bookingStatus = bs;
	let userNum = 1;
	const {search} = useLocation();
	const {num, date, head, stime, etime} = queryString.parse(search);

	let bookingTime = '10';
	let headCount = 50;

	const selectRoomData = () => {
		axios.get(url).then((res) => {
			setRoomData(res.data);
			setHostNum(res.data.hostNum);
		});
	};

	const selectCategoryData = () => {
		axios.get(cUrl).then((res) => {
			setCategoryList(res.data);
		});
	};

	const selectFacilityData = () => {
		axios.get(fUrl).then((res) => {
			setFacilityList(res.data);
		});
	};

	// 옵션 초기값
	const initialState = {
		count: 0,
		roomNum: num,
		roptionNum: 0,
		name: '',
		price: 0,
	};

	// 옵션 insert할 배열
	const [optionInsertList, setOptionInsertList] = useState([]);

	const selectOptionData = () => {
		axios.get(oUrl).then((res) => {
			setOptionList(res.data);

			let options = [];

			for (let i = 0; i < res.data.length; i++) {
				options[i] = {
					...initialState,
					roptionNum: res.data[i].ronum,
					name: res.data[i].oname,
					price: res.data[i].price,
				};
			}
			setOptionInsertList(options);
		});
	};

	const onErrorImg = (e) => {
		e.target.src = defaultImg;
	};
	// 모달
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		if (name && phone && email !== '') {
			setOpen(true);
		} else {
			alert('필수 정보를 입력해주세요');
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onSend = () => {
		// 요청사항
		let request = contentRef.current.value;
		let insertUrl = 'http://localhost:9000/bookingDetail/insert';

		axios
			.post(insertUrl, {
				bookingTime,
				headCount,
				name,
				phone,
				email,
				purpose,
				request,
				totalPrice,
				bookingStatus,
				num,
				userNum,
			})
			.then((res) => {
				setName('');
				setPhone('');
				setEmail('');
				setPurpose('');
				contentRef.current.value = '';
			});
	};

	const onOptionSend = () => {
		let insertUrl = 'http://localhost:9000/bookingDetailOption/insert';
		console.log(optionInsertList);

		axios({
			url: insertUrl,
			method: 'post',
			data: {optionInsertList},
		}).then((res) => {});
	};

	// 옵션 수량 버튼
	const onIncrease = (idx) => {
		let options = [...optionInsertList];
		options[idx].count += 1;
		console.log(optionInsertList);
		setOptionInsertList(options);
		totalOptionSum(options);
	};

	const onDecrease = (idx) => {
		let options = [...optionInsertList];

		if (options[idx].count > 0) {
			options[idx].count -= 1;
		} else {
			options[idx].count = 0;
		}

		setOptionInsertList(options);
		totalOptionSum(options);
		//	console.log('idx: ' + idx);
	};

	// 옵션 가격 계산
	const totalOptionSum = (optionInsertList) => {
		let total = 0;
		Object.keys(optionInsertList).map((item) => {
			total +=
				optionInsertList[item].price * optionInsertList[item].count;
		});
		setOptionPrice(total);
		console.log(total);
	};

	// 결제
	//버튼 클릭하면 실행
	function payment(data) {
		IMP.init('imp30007238'); //아임포트 관리자 콘솔에 서 확인한 '가맹점 식별코드' 입력
		IMP.request_pay(
			{
				// param
				pg: 'kakaopay', //pg사명 or pg사명.CID (잘못 입력할 경우, 기본 PG사가 띄워짐)
				pay_method: 'card', //지불 방법
				merchant_uid: `mid_${new Date().getTime()}`, //가맹점 주문번호 (아임포트를 사용하는 가맹점에서 중복되지 않은 임의의 문자열을 입력)
				name: roomData.name, //결제창에 노출될 상품명
				amount: totalPrice, //금액
				buyer_email: 'testiamport@naver.com',
				buyer_name: '홍길동',
				buyer_tel: '01012341234',
			},
			function (rsp) {
				// callback
				if (rsp.success) {
					alert(
						'완료 -> imp_uid : ' +
							rsp.imp_uid +
							' / merchant_uid(orderKey) : ' +
							rsp.merchant_uid,
					);
					onSend();
				} else {
					alert(
						'실패 : 코드(' +
							rsp.error_code +
							') / 메세지(' +
							rsp.error_msg +
							')',
					);
				}
			},
		);
	}

	useEffect(() => {
		selectRoomData();
		selectCategoryData();
		selectFacilityData();
		selectOptionData();
	}, []);

	useEffect(() => {
		if (phone.length === 10) {
			setPhone(phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
		}
		if (phone.length === 13) {
			setPhone(
				phone
					.replace(/-/g, '')
					.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
			);
		}
	}, [phone]);

	return (
		<>
			<form>
				<div>
					<div className='bookingTop'>
						<h1>예약하기</h1>
					</div>
					<div className='bdContainer'>
						<div className='dbItem'>
							<div className='bdSpace'>
								<div
									style={{
										display: 'flex',
										borderBottom: '3px solid #704de4',
									}}
								>
									<h4>예약공간</h4>
									<h4
										style={{
											marginLeft: 'auto',
											color: '#704de4',
										}}
									>
										₩{roomData.weekAmPrice}
									</h4>
								</div>

								<div className='bdSpaceInfo'>
									<img
										alt=''
										src={imgUrl + roomData.thumbnailImage}
										width='200'
										height={200}
									/>
									<div
										style={{
											marginTop: '30px',
											marginLeft: '20px',
										}}
									>
										<h3>{roomData.name}</h3>
										<h6>{roomData.fullIntroduction}</h6>
									</div>
								</div>
								<hr />
								<span
									style={{
										marginLeft: '30px',
										marginRight: '50px',
									}}
								>
									<CheckOutlinedIcon />
									&nbsp; 공간유형
								</span>
								{categoryList.map((item, idx) => (
									<span key={idx}>{item.cname} </span>
								))}
								<p style={{marginLeft: '30px'}}>
									<CheckOutlinedIcon />
									&nbsp; 예약가능인원&nbsp;&nbsp;&nbsp;&nbsp;
									최대&nbsp;
									{roomData.headcount}명
								</p>

								<div
									style={{
										display: 'flex',
										flexWrap: 'wrap',
										marginLeft: '30px',
									}}
								>
									{facilityList.map((item, idx) => (
										<>
											<div
												style={{display: 'flex'}}
												key={idx}
											>
												<img
													alt=''
													src={item.imageUrl}
													width='30'
													height={30}
												/>
												&nbsp;&nbsp;
												<p>{item.fname}</p>
											</div>
											&nbsp;&nbsp;&nbsp;
										</>
									))}
								</div>
							</div>

							<div className='bdInfo'>
								<div
									style={{
										display: 'flex',
										borderBottom: '3px solid #704de4',
										marginTop: '30px',
									}}
								>
									<h4>예약정보</h4>
								</div>
								<div
									style={{
										display: 'flex',
										marginLeft: '30px',
										marginTop: '10px',
									}}
								>
									<p>예약날짜</p>
									<p style={{marginLeft: 'auto'}}>
										2022-11-08
									</p>
								</div>
								<div
									style={{
										display: 'flex',
										marginLeft: '30px',
									}}
								>
									<p>예약인원</p>
									<p style={{marginLeft: 'auto'}}>2명</p>
								</div>
							</div>

							<div className='bdOption'>
								<div
									style={{
										display: 'flex',
										borderBottom: '3px solid #704de4',
										marginTop: '30px',
									}}
								>
									<h4>추가옵션선택</h4>
									<IconButton
										color='primary'
										style={{
											color: '#704de4',
											marginLeft: 'auto',
										}}
										aria-label='add to shopping cart'
										onClick={() => {
											onOptionSend();
										}}
									>
										<AddShoppingCartIcon />
									</IconButton>
								</div>
								{optionList.map((item, idx) =>
									item.oname == null ? (
										<></>
									) : (
										<>
											<div
												className='bdSpaceInfo'
												key={idx}
											>
												<>
													<img
														alt=''
														src={item.oimageUrl}
														width='110'
														height={110}
														onError={onErrorImg}
													/>
													<div
														style={{
															marginLeft: '50px',
														}}
													>
														<h5>{item.oname}</h5>
														<p>
															{item.price} / 수량
															1개
														</p>
														<div>
															<Button
																variant='outlined'
																style={{
																	marginBottom:
																		'3px',
																	width: '10px',
																}}
																onClick={() => {
																	onDecrease(
																		idx,
																	);
																}}
															>
																-
															</Button>

															<input
																type='text'
																value={
																	optionInsertList[
																		idx
																	].count
																}
																style={{
																	width: '250px',
																	height: '36px',
																	textAlign:
																		'center',
																}}
															></input>

															<Button
																variant='outlined'
																style={{
																	marginBottom:
																		'3px',
																}}
																onClick={() =>
																	onIncrease(
																		idx,
																	)
																}
															>
																+
															</Button>
														</div>
													</div>
													<br />
													<br />
												</>
											</div>
										</>
									),
								)}
							</div>

							<div
								style={{
									display: 'flex',
									borderBottom: '3px solid #704de4',
									marginTop: '30px',
								}}
							>
								<h4>예약자정보</h4>
								<p
									style={{
										marginLeft: 'auto',
										color: 'red',
									}}
								>
									*필수입력
								</p>
							</div>

							<div className='bdUserInfo'>
								<div
									style={{
										display: 'flex',
										marginBottom: '15px',
									}}
								>
									<h6>
										예약자&nbsp;
										<span style={{color: 'red'}}>*</span>
									</h6>
									<input
										type='text'
										style={{
											width: '85%',
											height: '40px',
											marginLeft: '30px',
										}}
										required
										value={name}
										onChange={(e) =>
											setName(e.target.value)
										}
									/>
								</div>
								<div
									style={{
										display: 'flex',
										marginBottom: '15px',
									}}
								>
									<h6 style={{marginTop: '8px'}}>
										연락처&nbsp;
										<span style={{color: 'red'}}>*</span>
									</h6>
									<input
										type='text'
										style={{
											width: '85%',
											height: '40px',
											marginLeft: '30px',
										}}
										required
										onChange={(e) => {
											return setPhone(e.target.value);
										}}
										value={phone}
									/>
								</div>
								<div
									style={{
										display: 'flex',
										marginBottom: '15px',
									}}
								>
									<h6 style={{marginTop: '8px'}}>
										이메일&nbsp;
										<span style={{color: 'red'}}>*</span>
									</h6>
									<input
										type='email'
										style={{
											width: '85%',
											height: '40px',
											marginLeft: '30px',
										}}
										required
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
									/>
								</div>
								<div
									style={{
										display: 'flex',
										marginBottom: '15px',
									}}
								>
									<h6 style={{marginTop: '8px'}}>사용목적</h6>
									<input
										type='text'
										style={{
											width: '85%',
											height: '40px',
											marginLeft: '28px',
										}}
										value={purpose}
										onChange={(e) =>
											setPurpose(e.target.value)
										}
									/>
								</div>
								<div
									style={{
										display: 'flex',
										marginBottom: '15px',
									}}
								>
									<h6 style={{marginTop: '8px'}}>요청사항</h6>
									<textarea
										ref={contentRef}
										style={{
											width: '85%',
											height: '100px',
											marginLeft: '28px',
										}}
										className='form-control'
									></textarea>
								</div>
							</div>

							<div className='otherInfo'>
								<BdOtherInfo
									hostNum={hostNum}
									roomNum={roomNum}
								/>
							</div>
						</div>
						<div className='dbItem'>
							<div
								style={{
									display: 'flex',
									borderBottom: '3px solid #704de4',
								}}
							>
								<h4>결제 예정금액</h4>
							</div>
							<div className='bdPrice'>
								<div>
									<p>
										예약날짜&nbsp;&nbsp;<b>2022-11-25</b>
									</p>
									<div style={{display: 'flex'}}>
										<p>
											예약시간&nbsp;&nbsp;
											<b>11시~16시, 5시간</b>&nbsp;&nbsp;
										</p>
										<p
											style={{
												marginLeft: 'auto',
												color: '#704de4',
											}}
										>
											<b>₩{roomPrice}</b>
										</p>
									</div>

									<div style={{display: 'flex'}}>
										{optionInsertList.some(
											(elem) => elem.count > 0,
										) ? (
											<>추가옵션&nbsp;&nbsp;</>
										) : (
											<></>
										)}
										{optionInsertList.map((item, idx) =>
											item.count > 0 ? (
												<>
													<p
														key={idx}
														style={{
															display:
																'inline-block',
														}}
													>
														<b>
															{item.name}
															{item.count}
															개&nbsp;&nbsp;
														</b>
													</p>
												</>
											) : (
												<></>
											),
										)}
										{optionInsertList.some(
											(elem) => elem.count > 0,
										) ? (
											<p
												style={{
													marginLeft: 'auto',
													color: '#704de4',
												}}
											>
												<b>₩{optionPrice}</b>
											</p>
										) : (
											<></>
										)}
									</div>
									<p
										style={{
											display: 'flex',
											borderBottom: '3px solid #704de4',
										}}
									>
										예약인원&nbsp;&nbsp;<b>2명</b>
									</p>

									<div
										style={{
											display: 'flex',
											color: '#704de4',
										}}
									>
										<h4>₩</h4>
										<h4
											style={{
												marginLeft: 'auto',
											}}
										>
											{totalPrice}
										</h4>
									</div>
								</div>
								{
									<Button
										class='bookingBtn'
										type='button'
										id='btn_submit'
										variant='outlined'
										onClick={handleClickOpen}
									>
										예약신청하기
									</Button>
								}

								{/* 모달 */}
								<Dialog
									open={open}
									onClose={handleClose}
									aria-labelledby='alert-dialog-title'
									aria-describedby='alert-dialog-description'
								>
									<DialogTitle
										id='alert-dialog-title'
										style={{
											borderBottom: '3px solid #704de4',
											marginBotton: '40px',
										}}
									>
										{roomData.payment === '바로결제' ? (
											<h4
												style={{
													marginBottom: '10px',
													marginTop: '10px',
													textAlign: 'center',
												}}
											>
												결제하시겠습니까?
											</h4>
										) : (
											<h4
												style={{
													marginBottom: '10px',
													marginTop: '10px',
													textAlign: 'center',
												}}
											>
												예약 내용을 확인해주세요
											</h4>
										)}
									</DialogTitle>
									<DialogContent>
										<DialogContentText id='alert-dialog-description'>
											<span
												style={{
													marginTop: '5px',
													marginRight: '40px',
												}}
											>
												예약공간
											</span>
											<span style={{float: 'right'}}>
												{roomData.name}
											</span>
											<hr />
											<span>예약날짜</span>
											<span style={{float: 'right'}}>
												2022-11-25
											</span>
											<hr />
											<span>예약시간</span>
											<span style={{float: 'right'}}>
												11시~16시, 5시간
											</span>
											<hr />
											<span>예약인원</span>
											<span style={{float: 'right'}}>
												2명
											</span>
											<hr />
											<span>결제예정금액</span>
											<span
												style={{
													float: 'right',
													color: '#704de4',
												}}
											>
												₩60000
											</span>
											<hr />
											{roomData.payment === '바로결제' ? (
												<>
													<InfoIcon
														style={{color: 'red'}}
													/>
													&nbsp;&nbsp;
													<span
														style={{color: 'red'}}
													>
														결제전에, 환불기준과
														예약내용을 반드시
														확인해주세요!
													</span>
												</>
											) : (
												<></>
											)}
										</DialogContentText>
									</DialogContent>
									<DialogActions>
										<Button
											onClick={handleClose}
											color='primary'
										>
											닫기
										</Button>
										{roomData.payment === '바로결제' ? (
											<Button
												onClick={() => {
													setBookingStatus('5');
													payment();
													handleClose();
												}}
												color='primary'
												autoFocus
												type='button'
											>
												결제하기
											</Button>
										) : (
											<Button
												onClick={() => {
													setBookingStatus('2');
													onSend();
													handleClose();
												}}
												color='primary'
												autoFocus
												type='button'
											>
												예약신청
											</Button>
										)}
									</DialogActions>
								</Dialog>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	);
}

export default BookingDetail;
