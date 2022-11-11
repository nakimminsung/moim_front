import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import './booking.css';
import BookingModal from './BookingModal';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InfoIcon from '@mui/icons-material/Info';

function BookingDetail() {
	const [roomData, setRoomData] = useState('');
	const [categoryList, setCategoryList] = useState([]);
	const [facilityList, setFacilityList] = useState([]);
	const [optionList, setOptionList] = useState([]);
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [purpose, setPurpose] = useState('');
	const [bs, setBs] = useState('');
	// 요청사항 (textarea)
	const contentRef = useRef('');
	//const bookingTime

	const navi = useNavigate();
	//const { num } = useParams();
	const num = 1;
	const url = `http://localhost:9000/room/detail?num=${num}`;
	const cUrl = `http://localhost:9000/room/category?num=${num}`;
	const fUrl = `http://localhost:9000/room/facility?num=${num}`;
	const oUrl = `http://localhost:9000/room/option?num=${num}`;
	let totalPrice = 60000;
	let bookingStatus = bs;
	let userNum = 1;
	let roomNum = num;
	let bookingTime = '10';
	let headCount = 50;

	const selectRoomData = () => {
		axios.get(url).then((res) => {
			setRoomData(res.data);
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

	const selectOptionData = () => {
		axios.get(oUrl).then((res) => {
			//console.log(res.data);
			setOptionList(res.data);
		});
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
				roomNum,
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
										₩60000
									</h4>
								</div>

								<div className='bdSpaceInfo'>
									<img
										alt=''
										// src={require(`./img/404.png`)}
										src={roomData.thumbnailImage}
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
							<hr />

							<div className='bdOption'>
								{/* <h4>추가옵션선택 </h4> */}
								{optionList.map((item, idx) =>
									item.oname == null ? (
										<></>
									) : (
										<div className='bdSpaceInfo' key={idx}>
											<>
												<img
													alt=''
													src={require(`./img/404.png`)}
													width='100'
													height={100}
												/>
												<div>
													<h4>{item.oname}</h4>
													<h6>
														{item.price} / 수량 1개
													</h6>
												</div>
											</>
										</div>
									),
								)}
							</div>

							<div className='bdUserInfo'>
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

								<div
									style={{
										display: 'flex',
										marginBottom: '15px',
										marginTop: '15px',
									}}
								>
									<h6 style={{marginTop: '8px'}}>
										예약자&nbsp;
										<span style={{color: 'red'}}>*</span>
									</h6>
									<input
										type='text'
										style={{
											width: '88%',
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
											width: '88%',
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
											width: '88%',
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
											width: '88%',
											height: '40px',
											marginLeft: '30px',
										}}
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
											width: '88%',
											height: '100px',
											marginLeft: '25px',
										}}
										className='form-control'
									></textarea>
								</div>
							</div>
							<hr />
							<div className='otherInfo'>다른 정보들</div>
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
									<p>예약날짜&nbsp;&nbsp;2022-11-25</p>
									<p>예약시간&nbsp;&nbsp;11시~16시, 5시간</p>
									<p
										style={{
											display: 'flex',
											borderBottom: '3px solid #704de4',
										}}
									>
										예약인원&nbsp;&nbsp;2명
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
											60000
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
													setBs('5');
													onSend();

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
													setBs('2');
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
