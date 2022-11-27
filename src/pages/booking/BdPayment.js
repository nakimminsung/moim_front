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
}) {
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

	// 결제 modal checkbox
	const checkOnlyOne = (checkThis) => {
		const checkboxes = document.getElementsByName('payment');
		for (let i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i] !== checkThis) {
				checkboxes[i].checked = false;
			}
		}
	};
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
					<div style={{display: 'flex'}}>
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
							<div style={{textAlign: 'center'}}>
								<input
									checked
									type='checkbox'
									name='payment'
									value='일반결제'
									onChange={(e) => checkOnlyOne(e.target)}
								/>{' '}
								일반결제&nbsp;&nbsp;
								<input
									type='checkbox'
									name='payment'
									value='kakaopay'
									onChange={(e) => checkOnlyOne(e.target)}
								/>{' '}
								kakaopay&nbsp;&nbsp;
								<input
									type='checkbox'
									name='payment'
									value='payco'
									onChange={(e) => checkOnlyOne(e.target)}
								/>{' '}
								payco&nbsp;&nbsp;
								<input
									type='checkbox'
									name='payment'
									value='tosspay'
									onChange={(e) => checkOnlyOne(e.target)}
								/>{' '}
								tosspay
							</div>
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
									//navigate(`../list/${userNum}`);
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
