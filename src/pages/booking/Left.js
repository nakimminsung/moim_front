import React, {useState} from 'react';
import {Button} from '@mui/material';

function Left({bookingList}) {
	// 옵션
	let options = new Array();
	let option = bookingList.roomOption;
	options = option.split(',');
	console.log('ss' + options);
	// 시간 배열에서 뽑아오기, 요일계산
	let stime;
	let etime = new Array();
	let calTime;

	let str = bookingList.bookingTime;
	let arr = str.split(',');
	console.log('arr' + arr);
	let _stime = arr[0];
	console.log(_stime);
	let _etime = arr[arr.length - 1];

	stime = _stime;
	etime = _etime;
	calTime = _etime - _stime;
	console.log(stime);
	console.log(calTime);

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
									{stime}시~{Number(etime) + 1}시,{' '}
									{Number(etime) + 1 - stime}시간
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
								// onClick={handleClickOpen}
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
								// onClick={handleClickOpen}
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
								// onClick={handleClickOpen}
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
								// onClick={handleClickOpen}
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
								// onClick={handleClickOpen}
							>
								예약취소가완료되었습니다.
							</Button>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default Left;
