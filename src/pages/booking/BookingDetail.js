import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Top from './Top';
import Right from './Right';
import Left from './Left';
import jwt_decode from 'jwt-decode';

function BookingDetail() {
	const {bookingDetailNum} = useParams();
	const [bookingList, setBookingList] = useState([]);

	const url = `http://localhost:9000/bookingDetail/detail?bookingDetailNum=${bookingDetailNum}`;
	const token = localStorage.getItem('token');

	const getBookingList = () => {
		axios.get(url).then((res) => {
			console.log(res.data);
			setBookingList(res.data);
		});
	};

	useEffect(() => {
		getBookingList();
	}, []);

	return (
		<>
			{token ? (
				<>
					{Number(bookingList.userNum) ===
					Number(jwt_decode(token).idx) ? (
						<>
							<div>
								<Top bookingList={bookingList} />
							</div>
							<div className='BKContainer'>
								<Right />
								<Left />
							</div>
						</>
					) : (
						<>
							<p>다른 회원의 정보에 접근할 권한이 없습니다</p>
						</>
					)}
				</>
			) : (
				<>
					<p>로그인 후 이용해 주세요</p>
				</>
			)}
		</>
	);
}

export default BookingDetail;
