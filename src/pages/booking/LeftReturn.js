import React from 'react';
import {Button} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {FormControl} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import Rating from '@mui/material/Rating';
import InfoIcon from '@mui/icons-material/Info';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {useNavigate} from 'react-router-dom';

function LeftReturn({
	bookingList,
	stime,
	etime,
	calTime,
	options,
	handleClickOpen,
	open,
	handleClose,
	rating,
	setRating,
	contentHandler,
	content,
	uploadFileHandler,
	submitHandler,
	requestDate,
	cancelReason,
	contentHandler2,
	submitHandler2,
}) {
	let userNum = bookingList.userNum;
	let roomNum = bookingList.roomNum;
	let num = bookingList.num;
	const navigate = useNavigate();

	// 결제 modal checkbox
	const checkOnlyOne = (checkThis) => {
		const checkboxes = document.getElementsByName('payment');
		for (let i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i] !== checkThis) {
				checkboxes[i].checked = false;
			}
		}
	};

	// 결제 check된 값 가져오기
	let payMethod2 = '';
	function getCheckboxValue(event) {
		if (event.target.checked) {
			payMethod2 = event.target.value;
		} else {
			payMethod2 = '';
		}
	}

	// 승인 결제 후 booking status update
	const updateStatus = (e) => {
		let updateUrl = localStorage.url + `/bookingDetail/updateStatus`;
		let data = {
			num,
		};

		axios.patch(updateUrl, data).then((res) => {});
	};

	// 승인 결제
	// iamport
	const {IMP} = window;
	// 결제
	function payment(data) {
		let impCode = process.env.REACT_APP_IMP;
		IMP.init(`${impCode}`); //아임포트 관리자 콘솔에 서 확인한 '가맹점 식별코드' 입력
		if (payMethod2 === 'kakaopay') {
			IMP.request_pay(
				{
					// param
					//pg: 'html5_inicis', //pg사명 or pg사명.CID (잘못 입력할 경우, 기본 PG사가 띄워짐)
					pg: 'kakaopay',
					pay_method: 'card', //지불 방법
					merchant_uid: `mid_${new Date().getTime()}`, //가맹점 주문번호 (아임포트를 사용하는 가맹점에서 중복되지 않은 임의의 문자열을 입력)
					name: bookingList.name, //결제창에 노출될 상품명
					amount: bookingList.totalPrice, //금액
					buyer_email: jwt_decode(localStorage.getItem('token'))
						.email,
					buyer_name: jwt_decode(localStorage.getItem('token'))
						.nickname,
				},
				function (rsp) {
					let bookingDetailNum = bookingList.num;
					// callback
					if (rsp.success) {
						updateStatus(); // booking status update: 2 => 3
						// booking table insert
						let url = `http://localhost:9000/booking/insert`;
						let pg = rsp.pg_provider;
						let merchantUid = rsp.merchant_uid;
						let totalPrice = rsp.paid_amount;

						axios
							.post(url, {
								totalPrice,
								pg,
								merchantUid,
								userNum,
								roomNum,
								bookingDetailNum,
							})
							.then((res) => {
								alert('결제가 완료되었습니다.');
								navigate(`../list/${userNum}`);
							});
					} else {
						alert('결제에 실패했습니다.');
						window.location.reload();
					}
				},
			);
		} else if (payMethod2 === 'tosspay') {
			IMP.request_pay(
				{
					// param
					//pg: 'html5_inicis', //pg사명 or pg사명.CID (잘못 입력할 경우, 기본 PG사가 띄워짐)
					pg: 'tosspay',
					pay_method: 'card', //지불 방법
					merchant_uid: `mid_${new Date().getTime()}`, //가맹점 주문번호 (아임포트를 사용하는 가맹점에서 중복되지 않은 임의의 문자열을 입력)
					name: bookingList.name, //결제창에 노출될 상품명
					amount: bookingList.totalPrice, //금액
					buyer_email: jwt_decode(localStorage.getItem('token'))
						.email,
					buyer_name: jwt_decode(localStorage.getItem('token'))
						.nickname,
				},
				function (rsp) {
					let bookingDetailNum = bookingList.num;
					// callback
					if (rsp.success) {
						updateStatus(); // booking status update: 2 => 3
						// booking table insert
						let url = `http://localhost:9000/booking/insert`;
						let pg = rsp.pg_provider;
						let merchantUid = rsp.merchant_uid;
						let totalPrice = rsp.paid_amount;

						axios
							.post(url, {
								totalPrice,
								pg,
								merchantUid,
								userNum,
								roomNum,
								bookingDetailNum,
							})
							.then((res) => {
								alert('결제가 완료되었습니다.');
								navigate(`../list/${userNum}`);
							});
					} else {
						alert('결제에 실패했습니다.');
						window.location.reload();
					}
				},
			);
		} else if (payMethod2 === 'payco') {
			IMP.request_pay(
				{
					// param
					//pg: 'html5_inicis', //pg사명 or pg사명.CID (잘못 입력할 경우, 기본 PG사가 띄워짐)
					pg: 'payco',
					pay_method: 'card', //지불 방법
					merchant_uid: `mid_${new Date().getTime()}`, //가맹점 주문번호 (아임포트를 사용하는 가맹점에서 중복되지 않은 임의의 문자열을 입력)
					name: bookingList.name, //결제창에 노출될 상품명
					amount: bookingList.totalPrice, //금액
					buyer_email: jwt_decode(localStorage.getItem('token'))
						.email,
					buyer_name: jwt_decode(localStorage.getItem('token'))
						.nickname,
				},
				function (rsp) {
					let bookingDetailNum = bookingList.num;
					// callback
					if (rsp.success) {
						updateStatus(); // booking status update: 2 => 3
						// booking table insert
						let url = `http://localhost:9000/booking/insert`;
						let pg = rsp.pg_provider;
						let merchantUid = rsp.merchant_uid;
						let totalPrice = rsp.paid_amount;

						axios
							.post(url, {
								totalPrice,
								pg,
								merchantUid,
								userNum,
								roomNum,
								bookingDetailNum,
							})
							.then((res) => {
								alert('결제가 완료되었습니다.');
								navigate(`../list/${userNum}`);
							});
					} else {
						alert('결제에 실패했습니다.');
						window.location.reload();
					}
				},
			);
		} else {
			IMP.request_pay(
				{
					// param
					//pg: 'html5_inicis', //pg사명 or pg사명.CID (잘못 입력할 경우, 기본 PG사가 띄워짐)
					pg: 'html5_inicis',
					pay_method: 'card', //지불 방법
					merchant_uid: `mid_${new Date().getTime()}`, //가맹점 주문번호 (아임포트를 사용하는 가맹점에서 중복되지 않은 임의의 문자열을 입력)
					name: bookingList.name, //결제창에 노출될 상품명
					amount: bookingList.totalPrice, //금액
					buyer_email: jwt_decode(localStorage.getItem('token'))
						.email,
					buyer_name: jwt_decode(localStorage.getItem('token'))
						.nickname,
				},
				function (rsp) {
					let bookingDetailNum = bookingList.num;
					// callback
					if (rsp.success) {
						updateStatus(); // booking status update: 2 => 3
						// booking table insert
						let url = `http://localhost:9000/booking/insert`;
						let pg = rsp.pg_provider;
						let merchantUid = rsp.merchant_uid;
						let totalPrice = rsp.paid_amount;

						axios
							.post(url, {
								totalPrice,
								pg,
								merchantUid,
								userNum,
								roomNum,
								bookingDetailNum,
							})
							.then((res) => {
								alert('결제가 완료되었습니다.');
								navigate(`../list/${userNum}`);
							});
					} else {
						alert('결제에 실패했습니다.');
						window.location.reload();
					}
				},
			);
		}
	}

	return (
		<>
			<div className='BKItem'>
				<div className='payMethod2'></div>
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
							예약날짜&nbsp;&nbsp;<b>{bookingList.bookingDate}</b>
						</p>
						<div style={{display: 'flex', marginBottom: '0'}}>
							<p>
								예약시간&nbsp;&nbsp;
								<b>
									{stime}시~{Number(etime) + 1}시, {calTime}
									시간
								</b>
								&nbsp;&nbsp;
							</p>
						</div>
						<p style={{marginBottom: '0'}}>
							{options.some((item) => item.length !== 0) ? (
								<>추가옵션&nbsp;&nbsp;</>
							) : (
								<></>
							)}
							{options.map((item, idx) => (
								<>
									<p
										key={idx}
										style={{
											display: 'inline-block',
										}}
									>
										{options.some(
											(item) => item.length !== 0,
										) ? (
											<b>
												{item}
												개&nbsp;&nbsp;
											</b>
										) : (
											<></>
										)}
									</p>
								</>
							))}
						</p>
						<p
							style={{
								borderBottom: '3px solid #704de4',
								marginTop: '0',
							}}
						>
							예약인원&nbsp;&nbsp;<b>{bookingList.headCount}명</b>
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
								<b>
									{Number(
										bookingList.totalPrice,
									).toLocaleString('ko-KR')}
								</b>
							</h4>
						</div>
					</div>
					{Number(bookingList.bookingStatus) === 3 ? (
						<>
							<Button
								class='bookingBtnn'
								type='button'
								id='btn_submit'
								variant='outlined'
								onClick={handleClickOpen}
							>
								예약취소
							</Button>
						</>
					) : Number(bookingList.bookingStatus) === 1 ? (
						<>
							<Button
								class='bookingBtnn'
								type='button'
								id='btn_submit'
								variant='outlined'
								onClick={handleClickOpen}
							>
								예약취소
							</Button>
						</>
					) : Number(bookingList.bookingStatus) === 2 ? (
						<>
							<Button
								class='bookingBtnn'
								type='button'
								id='btn_submit'
								variant='outlined'
								onClick={handleClickOpen}
							>
								결제하기
							</Button>
						</>
					) : Number(bookingList.bookingStatus) === 4 ? (
						<>
							<Button
								class='bookingBtnn'
								type='button'
								id='btn_submit'
								variant='outlined'
								onClick={handleClickOpen}
							>
								이용후기작성
							</Button>
						</>
					) : (
						<>
							<Button
								class='bookingBtnn'
								type='button'
								id='btn_submit'
								variant='outlined'
							>
								예약취소가완료되었습니다.
							</Button>
						</>
					)}

					{/* 모달 */}
					<Dialog open={open} onClose={handleClose}>
						{bookingList.bookingStatus === 4 ? (
							<>
								<DialogTitle
									style={{
										backgroundColor: '#704de4',
										color: 'white',
										textAlign: 'center',
									}}
								>
									이용후기 작성
								</DialogTitle>
								<DialogContent>
									<br />
									<DialogContentText style={{width: '350px'}}>
										평점
										<Rating
											name='simple-controlled'
											style={{
												marginLeft: '30px',
											}}
											value={rating}
											onChange={(event, newValue) => {
												setRating(newValue);
											}}
										/>
									</DialogContentText>

									<br />
									<textarea
										className='form-control'
										placeholder='이용후기를 작성해주세요.'
										style={{height: '300px'}}
										onChange={contentHandler}
										value={content}
									/>
									<DialogContentText style={{color: 'red'}}>
										<InfoIcon style={{color: 'red'}} />
										이용완료일 기준 30일 이내까지 작성 및
										수정하실 수 있습니다.
									</DialogContentText>
									<br />
									<input
										type={'file'}
										className='form-control'
										onChange={uploadFileHandler}
									/>
									<DialogContentText style={{color: 'red'}}>
										<InfoIcon style={{color: 'red'}} />
										운영정책과 맞지 않는 이미지 업로드시
										무통보 삭제 될 수 있습니다.
									</DialogContentText>
								</DialogContent>
								<DialogActions style={{marginRight: '15px'}}>
									<button
										type='button'
										className='btn btn-outline-secondary'
										onClick={handleClose}
									>
										취소
									</button>
									&nbsp;&nbsp;
									<button
										type='submit'
										className='btn btn-dark'
										onClick={submitHandler}
									>
										등록
									</button>
								</DialogActions>
							</>
						) : bookingList.bookingStatus === 2 ? (
							<>
								<DialogTitle
									id='alert-dialog-title'
									style={{
										backgroundColor: '#704de4',
										marginRight: '0px',
										marginBotton: '40px',
										color: 'white',
										width: '480px',
									}}
								>
									<h4
										style={{
											marginBottom: '10px',
											marginTop: '10px',
											textAlign: 'center',
										}}
									>
										결제하시겠습니까?
									</h4>
								</DialogTitle>
								<DialogContent>
									<DialogContentText id='alert-dialog-description'>
										<span
											style={{
												marginTop: '10px',
												marginRight: '40px',
											}}
										>
											예약공간
										</span>
										<span style={{float: 'right'}}>
											{bookingList.roomName}
										</span>
										<hr />
										<span>예약날짜</span>
										<span style={{float: 'right'}}>
											{requestDate}
										</span>
										<hr />
										<span>예약시간</span>
										<span style={{float: 'right'}}>
											{stime}시~{Number(etime) + 1}시,{' '}
											{Number(etime) + 1 - stime}시간
										</span>
										<hr />
										<span>예약인원</span>
										<span style={{float: 'right'}}>
											{bookingList.headCount}명
										</span>
										<hr />
										<span>결제예정금액</span>
										<span
											style={{
												float: 'right',
												color: '#704de4',
											}}
										>
											₩
											{Number(
												bookingList.totalPrice,
											).toLocaleString('ko-KR')}
										</span>
										<hr />
										<div style={{textAlign: 'center'}}>
											<input
												checked
												type='checkbox'
												name='payment'
												value='일반결제'
												onChange={(e) => {
													checkOnlyOne(e.target);
													getCheckboxValue(e);
												}}
											/>{' '}
											일반결제&nbsp;&nbsp;
											<input
												type='checkbox'
												name='payment'
												value='kakaopay'
												onChange={(e) => {
													checkOnlyOne(e.target);
													getCheckboxValue(e);
												}}
											/>{' '}
											kakaopay&nbsp;&nbsp;
											<input
												type='checkbox'
												name='payment'
												value='payco'
												onChange={(e) => {
													checkOnlyOne(e.target);
													getCheckboxValue(e);
												}}
											/>{' '}
											payco&nbsp;&nbsp;
											<input
												type='checkbox'
												name='payment'
												value='tosspay'
												onChange={(e) => {
													checkOnlyOne(e.target);
													getCheckboxValue(e);
												}}
											/>{' '}
											tosspay
										</div>
										<InfoIcon style={{color: 'red'}} />
										&nbsp;&nbsp;
										<span style={{color: 'red'}}>
											결제전에, 환불기준과 예약내용을
											반드시 확인해주세요!
										</span>
									</DialogContentText>
								</DialogContent>
								<DialogActions>
									<Button
										onClick={handleClose}
										color='primary'
									>
										닫기
									</Button>

									<Button
										onClick={() => {
											payment();
											//navigate(`../list/${userNum}`);
											handleClose();
										}}
										color='primary'
										autoFocus
										type='button'
									>
										결제하기
									</Button>
								</DialogActions>
							</>
						) : (
							<>
								<DialogTitle
									style={{
										backgroundColor: '#704de4',
										color: 'white',
										textAlign: 'center',
									}}
								>
									예약을 취소하시겠습니까?
								</DialogTitle>
								<DialogContent>
									<br />
									<DialogContentText style={{width: '350px'}}>
										취소사유{' '}
										<span style={{color: 'red'}}>
											(필수)
										</span>
									</DialogContentText>
									<FormControl sx={{m: 1, minWidth: 120}}>
										<Select
											value={cancelReason}
											onChange={contentHandler2}
											displayEmpty
											inputProps={{
												'aria-label': 'Without label',
											}}
											style={{
												width: '350px',
											}}
										>
											<FormHelperText>
												취소 사유를 선택해 주세요.
											</FormHelperText>
											<MenuItem value={`일정 취소/변경`}>
												일정 취소/변경
											</MenuItem>
											<MenuItem value={`예약정보 오입력`}>
												예약정보 오입력
											</MenuItem>
											<MenuItem value={`다른공간 예약`}>
												다른공간 예약
											</MenuItem>
											<MenuItem value={`호스트 연락안됨`}>
												호스트 연락안됨
											</MenuItem>
											<MenuItem value={cancelReason}>
												기타(직접입력)
											</MenuItem>
										</Select>
									</FormControl>
									<br />
									<br />
									<textarea
										className='form-control'
										placeholder='취소사유를 입력해주세요.'
										style={{height: '100px'}}
										onChange={contentHandler2}
										value={cancelReason}
									/>
								</DialogContent>
								<DialogActions style={{marginRight: '15px'}}>
									<button
										type='button'
										className='btn btn-outline-secondary'
										onClick={handleClose}
									>
										취소
									</button>
									&nbsp;&nbsp;
									<button
										type='submit'
										className='btn btn-dark'
										onClick={submitHandler2}
									>
										확인
									</button>
								</DialogActions>
							</>
						)}
					</Dialog>
				</div>
			</div>
		</>
	);
}

export default LeftReturn;
