import React from 'react';

function Right({bookingList}) {
	// 날짜 요일 계산
	const days = ['일', '월', '화', '수', '목', '금', '토'];

	function leftPad(value) {
		if (value >= 10) {
			return value;
		}

		return `0${value}`;
	}

	function toStringByFormatting(source, delimiter = '-') {
		const year = source.getFullYear();
		const month = leftPad(source.getMonth() + 1);
		const day = leftPad(source.getDate());

		return [year, month, day].join(delimiter);
	}

	let requestDate = toStringByFormatting(new Date(bookingList.createdAt));
	let bookingDate = toStringByFormatting(new Date(bookingList.bookingDate));
	//console.log(requestDate);
	let requestDay = days[new Date(bookingList.createdAt).getDay()];
	let bookingDay = days[new Date(bookingList.bookingDate).getDay()];

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
	let options = new Array();
	let option = bookingList.roomOption;
	options = option.split(',');
	return (
		<>
			<div className='BKItem'>
				<div className='bdInfo'>
					<div
						style={{
							display: 'flex',
							borderBottom: '3px solid #704de4',
						}}
					>
						<h4>예약 내용</h4>

						<p
							style={{
								marginLeft: 'auto',
							}}
						>
							예약번호 : {bookingList.num}
						</p>
					</div>
					<div
						style={{
							display: 'flex',
							marginLeft: '30px',
							marginTop: '10px',
						}}
					>
						<p>신청일</p>
						<p style={{marginLeft: 'auto'}}>
							{requestDate}&nbsp;({requestDay})
						</p>
					</div>
					<div
						style={{
							display: 'flex',
							marginLeft: '30px',
						}}
					>
						<p>예약공간</p>
						<p style={{marginLeft: 'auto'}}>
							{bookingList.roomName}
						</p>
					</div>
					<div
						style={{
							display: 'flex',
							marginLeft: '30px',
						}}
					>
						<p>예약내용</p>
						<p style={{marginLeft: 'auto'}}>
							{bookingDate}&nbsp;({bookingDay})&nbsp;{stime}
							&nbsp;~
							{etime},&nbsp;{calTime}시간
						</p>
					</div>
					<div
						style={{
							display: 'flex',
							marginLeft: '30px',
						}}
					>
						<p>예약인원</p>
						<p style={{marginLeft: 'auto'}}>
							{bookingList.headCount}명
						</p>
					</div>
					{options.some((item) => item.length !== 0) ? (
						<>
							<div
								style={{
									display: 'flex',
									marginLeft: '30px',
								}}
							>
								<p>추가옵션</p>
								<p style={{marginLeft: 'auto'}}>
									{bookingList.roomOption}
								</p>
							</div>
						</>
					) : (
						<></>
					)}
					<div
						style={{
							display: 'flex',
							marginLeft: '30px',
						}}
					>
						<p>요청사항</p>
						<p style={{marginLeft: 'auto'}}>
							{bookingList.request !== null ? (
								<>{bookingList.request}</>
							) : (
								<>없음</>
							)}
						</p>
					</div>
					{/* 예약자 정보 */}
					<div
						style={{
							display: 'flex',
							borderBottom: '3px solid #704de4',
							marginTop: '30px',
						}}
					>
						<h4>예약자 정보</h4>
					</div>
					<div
						style={{
							display: 'flex',
							marginLeft: '30px',
						}}
					>
						<p>예약자명</p>
						<p style={{marginLeft: 'auto'}}>{bookingList.name}</p>
					</div>
					<div
						style={{
							display: 'flex',
							marginLeft: '30px',
						}}
					>
						<p>연락처</p>
						<p style={{marginLeft: 'auto'}}>{bookingList.phone}</p>
					</div>
					<div
						style={{
							display: 'flex',
							marginLeft: '30px',
						}}
					>
						<p>이메일</p>
						<p style={{marginLeft: 'auto'}}>{bookingList.email}</p>
					</div>
					{/* 환불규정 */}
					<div
						style={{
							display: 'flex',
							borderBottom: '3px solid #704de4',
							marginTop: '30px',
						}}
					>
						<h4>환불규정 안내</h4>
					</div>
					<span style={{color: 'red', marginLeft: '30px'}}>
						이용당일(첫 날) 이후에 환불 관련 사항은 호스트에게 직접
						문의하셔야합니다.
					</span>
					<br />
					<span style={{marginLeft: '30px'}}>
						결제 후 2시간 이내에는 100% 환불이 가능합니다.(단,
						이용시간 전까지만 가능)
					</span>
					<br />
					<br />
					<div
						style={{
							display: 'flex',
							marginLeft: '30px',
						}}
					>
						<p>
							<b>이용 8일전</b>
						</p>
						<p style={{marginLeft: 'auto'}}>총 금액의 100%환불</p>
					</div>
					<div
						style={{
							display: 'flex',
							marginLeft: '30px',
						}}
					>
						<p>
							<b>이용 7일전</b>
						</p>
						<p style={{marginLeft: 'auto'}}>총 금액의 90%환불</p>
					</div>
					<div
						style={{
							display: 'flex',
							marginLeft: '30px',
						}}
					>
						<p>
							<b>이용 6일전</b>
						</p>
						<p style={{marginLeft: 'auto'}}>총 금액의 80%환불</p>
					</div>
					<div
						style={{
							display: 'flex',
							marginLeft: '30px',
						}}
					>
						<p>
							<b>이용 5일전</b>
						</p>
						<p style={{marginLeft: 'auto'}}>총 금액의 70%환불</p>
					</div>
					<div
						style={{
							display: 'flex',
							marginLeft: '30px',
						}}
					>
						<p>
							<b>이용 4일전</b>
						</p>
						<p style={{marginLeft: 'auto'}}>총 금액의 50%환불</p>
					</div>
					<div
						style={{
							display: 'flex',
							marginLeft: '30px',
						}}
					>
						<p>
							<b>이용 3일전 ~ 당일</b>
						</p>
						<p style={{marginLeft: 'auto'}}>환불불가</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default Right;
