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
	payment,
	cancelReason,
	contentHandler2,
	submitHandler2,
}) {
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
								결제하기
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
						) : bookingList.bookingStatus === 2 ? (
							<>
								<DialogTitle
									id='alert-dialog-title'
									style={{
										borderBottom: '3px solid #704de4',
										marginBotton: '40px',
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
												marginTop: '5px',
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

export default LeftReturn;
