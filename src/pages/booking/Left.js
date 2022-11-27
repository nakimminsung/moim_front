import React, {useState} from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import LeftReturn from './LeftReturn';

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

	// 승인 결제 후 booking status update
	const updateStatus = (e) => {
		let updateUrl = localStorage.url + `/bookingDetail/updateStatus`;
		let data = {
			num,
		};

		axios.patch(updateUrl, data).then((res) => {});
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

	// 날짜 계산
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
	let requestDay = days[new Date(bookingList.createdAt).getDay()];

	// 승인 결제
	// iamport
	const {IMP} = window;
	function payment(data) {
		let impCode = process.env.REACT_APP_IMP;
		IMP.init(`${impCode}`); //아임포트 관리자 콘솔에 서 확인한 '가맹점 식별코드' 입력
		IMP.request_pay(
			{
				// param
				//pg: 'html5_inicis', //pg사명 or pg사명.CID (잘못 입력할 경우, 기본 PG사가 띄워짐)
				pg: 'payco',
				pay_method: 'card', //지불 방법
				merchant_uid: `mid_${new Date().getTime()}`, //가맹점 주문번호 (아임포트를 사용하는 가맹점에서 중복되지 않은 임의의 문자열을 입력)
				name: bookingList.roomName, //결제창에 노출될 상품명
				amount: bookingList.totalPrice, //금액
				buyer_email: jwt_decode(localStorage.getItem('token')).email,
				buyer_name: jwt_decode(localStorage.getItem('token')).nickname,
			},
			function (rsp) {
				// console.log(res.data);
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
							window.location.reload();
						});
				} else {
					alert('결제에 실패했습니다.');
				}
			},
		);
	}

	return (
		<>
			<LeftReturn
				bookingList={bookingList}
				stime={stime}
				etime={etime}
				calTime={calTime}
				options={options}
				handleClickOpen={handleClickOpen}
				open={open}
				handleClose={handleClose}
				rating={rating}
				setRating={setRating}
				contentHandler={contentHandler}
				content={content}
				uploadFileHandler={uploadFileHandler}
				submitHandler={submitHandler}
				requestDate={requestDate}
				payment={payment}
				cancelReason={cancelReason}
				contentHandler2={contentHandler2}
				submitHandler2={submitHandler2}
			/>
		</>
	);
}

export default Left;
