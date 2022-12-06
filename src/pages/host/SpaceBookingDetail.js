import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import BookingDetailLeft from './BookingDetailLeft';
import BookingDetailRight from './BookingDetailRight';
import BookingDetailTop from './BookingDetailTop';
import './SpaceBookingDetail.css';

function SpaceBookingDetail(props) {
	const {bookingDetailNum} = useParams();
	const [bookingList, setBookingList] = useState([]);

	const hostNum = sessionStorage.num;
	console.log(hostNum);

	const url = `http://localhost:9000/host/bookingdetail?bookingDetailNum=${bookingDetailNum}`;
	console.log(url);

	const getBookingList = () => {
		axios.get(url).then((res) => {
			console.log(res.data);
			setBookingList(res.data);
		});
	};
	console.log(bookingList);

	useEffect(() => {
		getBookingList();
	}, []);

	return (
		<>
			<div>
				{bookingList && (
					<>
						<div>
							<BookingDetailTop bookingList={bookingList} />
						</div>
						<div className='BKContainer1'>
							<BookingDetailLeft bookingList={bookingList} />
							<BookingDetailRight bookingList={bookingList} />
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default SpaceBookingDetail;
