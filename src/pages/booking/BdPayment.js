import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InfoIcon from '@mui/icons-material/Info';
import Button from '@material-ui/core/Button';
import Checkbox from '@mui/material/Checkbox';
import './booking.css';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import CloseIcon from '@mui/icons-material/Close';

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

function BdPayment({
	name,
	phone,
	email,
	date,
	stime,
	etime,
	price,
	optionInsertList,
	optionPrice,
	head,
	totalPrice,
	roomData,
	payment,
	onSend,
	roomOption,
	userNum,
	roomNum,
}) {
	console.log('email' + email);
	// 모달
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		let emailReg =
			/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

		// 필수정보 체크
		if (name && phone && email !== '') {
			// 이메일 체크
			if (emailReg.test(email) === false) {
				alert('이메일 형식으로 입력해 주세요');
				return;
			} else {
				setOpen(true);
			}
		} else {
			alert('필수 정보를 입력해주세요');
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

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
	let payMethod = '';
	function getCheckboxValue(event) {
		if (event.target.checked) {
			payMethod = event.target.value;
		} else {
			payMethod = '';
		}
		document.getElementById('payMethod').innerText = payMethod;
	}

	// iamport
	const {IMP} = window;

	// 결제
	function payment(data) {
		let impCode = process.env.REACT_APP_IMP;
		IMP.init(`${impCode}`); //아임포트 관리자 콘솔에 서 확인한 '가맹점 식별코드' 입력
		if (payMethod === 'kakaopay') {
			IMP.request_pay(
				{
					// param
					//pg: 'html5_inicis', //pg사명 or pg사명.CID (잘못 입력할 경우, 기본 PG사가 띄워짐)
					pg: 'kakaopay',
					pay_method: 'card', //지불 방법
					merchant_uid: `mid_${new Date().getTime()}`, //가맹점 주문번호 (아임포트를 사용하는 가맹점에서 중복되지 않은 임의의 문자열을 입력)
					name: roomData.name, //결제창에 노출될 상품명
					amount: totalPrice, //금액
					buyer_email: jwt_decode(localStorage.getItem('token'))
						.email,
					buyer_name: jwt_decode(localStorage.getItem('token'))
						.nickname,
				},
				function (rsp) {
					// console.log(rsp);

					let maxNumUrl = `http://localhost:9000/bookingDetail/getMaxNum`;

					axios.get(maxNumUrl).then((res) => {
						let bookingDetailNum = res.data.num + 1; // 마지막 데이터 들어가게 하려고 +1 함(지금 결제된거 들어가게 하려고)

						// callback
						if (rsp.success) {
							onSend(3, roomOption); //3: 예약확정
							// booking table insert
							let url = `http://localhost:9000/booking/insert`;
							let pg = rsp.pg_provider;
							let merchantUid = rsp.merchant_uid;
							let totalPrice = rsp.paid_amount;
							console.log('roomNum' + roomNum);
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
								});
						} else {
							alert('결제에 실패했습니다.');
							window.location.reload();
						}
					});
				},
			);
		} else if (payMethod === 'tosspay') {
			IMP.request_pay(
				{
					// param
					pg: 'tosspay', //pg사명 or pg사명.CID (잘못 입력할 경우, 기본 PG사가 띄워짐)
					pay_method: 'card', //지불 방법
					merchant_uid: `mid_${new Date().getTime()}`, //가맹점 주문번호 (아임포트를 사용하는 가맹점에서 중복되지 않은 임의의 문자열을 입력)
					name: roomData.name, //결제창에 노출될 상품명
					amount: totalPrice, //금액
					buyer_email: jwt_decode(localStorage.getItem('token'))
						.email,
					buyer_name: jwt_decode(localStorage.getItem('token'))
						.nickname,
				},
				function (rsp) {
					// console.log(rsp);

					let maxNumUrl = `http://localhost:9000/bookingDetail/getMaxNum`;

					axios.get(maxNumUrl).then((res) => {
						// console.log(res.data);
						let bookingDetailNum = res.data.num + 1; // 마지막 데이터 들어가게 하려고 +1 함(지금 결제된거 들어가게 하려고)
						// callback
						if (rsp.success) {
							onSend(3, roomOption); //3: 예약확정
							// booking table insert
							let url = `http://localhost:9000/booking/insert`;
							let pg = rsp.pg_provider;
							let merchantUid = rsp.merchant_uid;
							console.log('sss');
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
								});
						} else {
							alert('결제에 실패했습니다.');
							window.location.reload();
						}
					});
				},
			);
		} else if (payMethod === 'payco') {
			IMP.request_pay(
				{
					// param
					pg: 'payco', //pg사명 or pg사명.CID (잘못 입력할 경우, 기본 PG사가 띄워짐)
					pay_method: 'card', //지불 방법
					merchant_uid: `mid_${new Date().getTime()}`, //가맹점 주문번호 (아임포트를 사용하는 가맹점에서 중복되지 않은 임의의 문자열을 입력)
					name: roomData.name, //결제창에 노출될 상품명
					amount: totalPrice, //금액
					buyer_email: jwt_decode(localStorage.getItem('token'))
						.email,
					buyer_name: jwt_decode(localStorage.getItem('token'))
						.nickname,
				},
				function (rsp) {
					// console.log(rsp);

					let maxNumUrl = `http://localhost:9000/bookingDetail/getMaxNum`;

					axios.get(maxNumUrl).then((res) => {
						// console.log(res.data);
						let bookingDetailNum = res.data.num + 1; // 마지막 데이터 들어가게 하려고 +1 함(지금 결제된거 들어가게 하려고)
						// callback
						if (rsp.success) {
							onSend(3, roomOption); //3: 예약확정
							// booking table insert
							let url = `http://localhost:9000/booking/insert`;
							let pg = rsp.pg_provider;
							let merchantUid = rsp.merchant_uid;

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
								});
						} else {
							alert('결제에 실패했습니다.');
							window.location.reload();
						}
					});
				},
			);
		} else {
			IMP.request_pay(
				{
					// param
					pg: 'html5_inicis', //pg사명 or pg사명.CID (잘못 입력할 경우, 기본 PG사가 띄워짐)
					pay_method: 'card', //지불 방법
					merchant_uid: `mid_${new Date().getTime()}`, //가맹점 주문번호 (아임포트를 사용하는 가맹점에서 중복되지 않은 임의의 문자열을 입력)
					name: roomData.name, //결제창에 노출될 상품명
					amount: totalPrice, //금액
					buyer_email: jwt_decode(localStorage.getItem('token'))
						.email,
					buyer_name: jwt_decode(localStorage.getItem('token'))
						.nickname,
				},
				function (rsp) {
					// console.log(rsp);

					let maxNumUrl = `http://localhost:9000/bookingDetail/getMaxNum`;

					axios.get(maxNumUrl).then((res) => {
						// console.log(res.data);
						let bookingDetailNum = res.data.num + 1; // 마지막 데이터 들어가게 하려고 +1 함(지금 결제된거 들어가게 하려고)
						// callback
						if (rsp.success) {
							onSend(3, roomOption); //3: 예약확정
							// booking table insert
							let url = `http://localhost:9000/booking/insert`;
							let pg = rsp.pg_provider;
							let merchantUid = rsp.merchant_uid;

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
								});
						} else {
							alert('결제에 실패했습니다.');
							window.location.reload();
						}
					});
				},
			);
		}
	}

	return (
		<>
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
						예약날짜&nbsp;&nbsp;<b>{date}</b>
					</p>
					<div style={{display: 'flex'}}>
						<p>
							예약시간&nbsp;&nbsp;
							<b>
								{stime}시~{Number(etime) + 1}시,{' '}
								{Number(etime) + 1 - stime}시간
							</b>
							&nbsp;&nbsp;
						</p>
						<p
							style={{
								marginLeft: 'auto',
								color: '#704de4',
							}}
						>
							<b>₩{price.toLocaleString('ko-KR')}</b>
						</p>
					</div>
					<div
						style={{
							display: 'flex',
							// flexWrap: 'wrap',
							width: '250px',
						}}
					>
						{optionInsertList.some((elem) => elem.count > 0) ? (
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
											display: 'inline-block',
											flexWrap: 'wrap',
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
						{optionInsertList.some((elem) => elem.count > 0) ? (
							<p
								style={{
									marginLeft: 'auto',
									color: '#704de4',
								}}
							>
								<b>₩{optionPrice.toLocaleString('ko-KR')}</b>
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
						예약인원&nbsp;&nbsp;<b>{head}명</b>
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
							<b>{Number(totalPrice).toLocaleString('ko-KR')}</b>
						</h4>
					</div>
				</div>

				<Button
					class='bookingBtnn'
					type='button'
					id='btn_submit'
					variant='outlined'
					onClick={handleClickOpen}
				>
					예약신청하기
				</Button>

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
							backgroundColor: '#704de4',
							marginRight: '0px',
							marginBotton: '40px',
							color: 'white',
							width: '480px',
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
							<span style={{float: 'right'}}>{date}</span>
							<hr />
							<span>예약시간</span>
							<span style={{float: 'right'}}>
								{stime}시~{Number(etime) + 1}시,{' '}
								{Number(etime) + 1 - stime}시간
							</span>
							<hr />
							<span>예약인원</span>
							<span style={{float: 'right'}}>{head}명</span>
							<hr />
							<span>결제예정금액</span>
							<span
								style={{
									float: 'right',
									color: '#704de4',
								}}
							>
								₩{Number(totalPrice).toLocaleString('ko-KR')}
							</span>
							<hr />
							{roomData.payment === '바로결제' ? (
								<>
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
										<label for='check_btn'>
											일반결제&nbsp;&nbsp;
										</label>
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
								</>
							) : (
								<></>
							)}

							<br />
							{roomData.payment === '바로결제' ? (
								<>
									<InfoIcon style={{color: 'red'}} />
									&nbsp;&nbsp;
									<span style={{color: 'red'}}>
										결제전에, 환불기준과 예약내용을 반드시
										확인해주세요!
									</span>
								</>
							) : (
								<></>
							)}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color='primary'>
							닫기
						</Button>
						{roomData.payment === '바로결제' ? (
							<Button
								onClick={() => {
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
									onSend(1); // 승인대기 1번
									//navigate(`../list/${userNum}`);
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
		</>
	);
}

export default BdPayment;
