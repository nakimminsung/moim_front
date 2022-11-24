import React, {useState} from 'react';
import {Button} from '@mui/material';
//dialogue 관련
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {FormControl} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import Rating from '@mui/material/Rating';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';

function Left({bookingList}) {
	const [rating, setRating] = React.useState(0); // 별점
	const [content, setContent] = useState('');
	const [uploadFile, setUploadFile] = useState('');
	const [cancelReason, setCancelReason] = useState('');

	let userNum = bookingList.userNum;
	let roomNum = bookingList.roomNum;
	let num = bookingList.num;
	console.log('ss' + num);

	const contentHandler = (e) => {
		e.preventDefault();
		setContent(e.target.value);
		// console.log('noticeTitle' + e.target.value);
	};

	const contentHandler2 = (e) => {
		e.preventDefault();
		setCancelReason(e.target.value);
		console.log(e.target.value);
	};

	const uploadFileHandler = (e) => {
		e.preventDefault();
		setUploadFile(e.target.files[0]);
		// console.log('uploadFile' + e.target.files[0]);
	};

	//modal submit 이벤트 (이용완료 - 리뷰작성)
	const submitHandler = (e) => {
		e.preventDefault();

		// BackEnd로 보낼 url
		let url = localStorage.url + '/review/insert';

		const formData = new FormData();
		formData.append('content', content);
		formData.append('rating', rating);
		formData.append('uploadFile', uploadFile);
		formData.append('userNum', userNum);
		formData.append('roomNum', roomNum);

		axios({
			method: 'post',
			url: url, //BackEnd로 보낼 url
			data: formData,
			headers: {'Content-Type': 'multipart/form-data'},
		}).then((res) => {
			console.log('res.data=' + res.data);
			alert('등록이 완료되었습니다.');

			//성공하고 비워주기
			setRating('');
			setContent('');
			setUploadFile([]);

			//성공하고 화면 리로드
			window.location.reload();
		});

		//성공하고 modal 창 닫기
		setOpen(false);
	};

	// 예약취소
	const submitHandler2 = (e) => {
		e.preventDefault();

		let updateUrl = localStorage.url + `/bookingDetail/update`;
		console.log(updateUrl);
		console.log('num' + num);
		let data = {
			num,
			cancelReason,
		};
		console.log(data);
		axios.patch(updateUrl, data).then((res) => {
			alert('예약이 취소되었습니다.');
			window.location.reload();
		});

		//성공하고 modal 창 닫기
		setOpen(false);
	};

	// 옵션
	let options = new Array();
	let option = bookingList.roomOption;
	options = option.split(',');
	// 시간 배열에서 뽑아오기, 요일계산
	let stime;
	let etime = new Array();
	let calTime;

	let str = bookingList.bookingTime;
	let arr = str.split(',');
	let _stime = arr[0];
	let _etime = arr[arr.length - 1];

	stime = _stime;
	etime = _etime;
	calTime = _etime - _stime;

	//modal dialogue : OPEN / CLOSE
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);

		//값 비워주기
		setRating('');
		setContent('');
		setUploadFile([]);
	};

	// modal select
	const [age, setAge] = React.useState('');

	const handleChange = (event) => {
		setAge(event.target.value);
	};

	return (
		<>
			<div className='BKItem'>
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
								class='bookingBtn'
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
								class='bookingBtn'
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
								class='bookingBtn'
								type='button'
								id='btn_submit'
								variant='outlined'
								onClick={handleClickOpen}
							>
								예약취소
							</Button>
						</>
					) : Number(bookingList.bookingStatus) === 4 ? (
						<>
							<Button
								class='bookingBtn'
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
								class='bookingBtn'
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
										등록
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

export default Left;
