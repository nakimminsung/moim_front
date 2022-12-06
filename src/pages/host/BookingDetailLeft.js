import React, {useEffect, useRef} from 'react';
import NavigationIcon from '@material-ui/icons/Navigation';
import ChatIcon from '@material-ui/icons/Chat';
const {kakao} = window;
const options2 = {
	//지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(37.56682, 126.97865), //지도의 중심좌표.
	level: 1, //지도의 레벨(확대, 축소 정도)
};

function BookingDetailLeft({bookingList}) {
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

	// // 시간 배열에서 뽑아오기, 요일계산
	// let stime;
	// let etime = new Array();
	// let calTime;

	// let str = bookingList.bookingTime;
	// let arr = str.split(',');
	// console.log('arr' + arr);
	// let _stime = arr[0];
	// console.log(_stime);
	// let _etime = arr[arr.length - 1];

	// stime = _stime;
	// etime = _etime;
	// calTime = _etime - _stime;
	// console.log(stime);
	// console.log(calTime);
	// let options = new Array();
	// let option = bookingList.roomOption;
	// options = option.split(',');
	//////////////지도(성민이 상세페이지 코드)//////////////
	//지도를 담을 영역의 DOM 레퍼런스
	const container = useRef(null);

	// 지도생성 함수
	const mapStart = (bookingList) => {
		console.log(bookingList.address);
		//지도 생성 및 객체 리턴
		let map = new kakao.maps.Map(container.current, options2);

		//공간 위치로 이동
		let moveLatLon = new kakao.maps.LatLng(
			bookingList.lat,
			bookingList.lng,
		);
		map.panTo(moveLatLon);

		// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
		var mapTypeControl = new kakao.maps.MapTypeControl();
		// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
		// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
		map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
		// 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성합니다
		var zoomControl = new kakao.maps.ZoomControl();
		map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

		//마커가 표시 될 위치
		let markerPosition = new kakao.maps.LatLng(
			bookingList.lat,
			bookingList.lng,
		);

		// 마커를 생성
		let marker = new kakao.maps.Marker({
			position: markerPosition,
		});

		// 마커를 지도 위에 표시
		marker.setMap(map);
	};

	useEffect(() => {
		mapStart(bookingList);
	}, [bookingList]);
	return (
		<div>
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
								{bookingDate}
								&nbsp; ({bookingDay})
							</p>
						</div>
						<div
							style={{
								display: 'flex',
								marginLeft: '30px',
							}}
						>
							<p>예약시간</p>
							<div style={{marginLeft: 'auto'}}>
								<p>{bookingList.bookingTime}(시)</p>
							</div>
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
					</div>
					{/*  */}
					{bookingList.roomOption == 0 ? null : (
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
					)}
					{/*  */}
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
					{/* 장소 정보 */}
					<div className='BdRoomInfo'>
						<div
							style={{
								display: 'flex',
								borderBottom: '3px solid #704de4',
								marginTop: '30px',
							}}
						>
							<h4>장소 정보</h4>
						</div>
					</div>
					<div style={{marginLeft: '30px'}}>
						<h5>
							<b>{bookingList.roomName}</b>
						</h5>
						<p>{bookingList.address}</p>
						<p>{bookingList.address2}</p>
						<div style={{display: 'flex'}}>
							<button
								className='mapButton'
								style={{marginRight: '20px'}}
							>
								<ChatIcon />
								톡하기
							</button>
							<button
								className='mapButton'
								onClick={() => {
									window.open(
										'https://map.kakao.com/link/to/' +
											bookingList.address +
											',' +
											bookingList.lat +
											',' +
											bookingList.lng,
										'_blank',
									);
								}}
							>
								<NavigationIcon />
								길찾기
							</button>
						</div>
						<div
							className='map'
							style={{
								width: '100%',
								height: '50vh',
								marginTop: '30px',
								marginRight: '10px',
								marginBottom: '30px',
								border: '1px solid lightgray',
								zIndex: 0,
							}}
							ref={container}
						></div>
					</div>
				</div>
			</>
		</div>
	);
}

export default BookingDetailLeft;
