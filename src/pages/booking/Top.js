import React from 'react';
import styled from 'styled-components';
import RateReviewIcon from '@mui/icons-material/RateReview';
import Button from '@mui/material/Button';
import PaymentIcon from '@mui/icons-material/Payment';
import {useNavigate} from 'react-router-dom';

function Top({bookingList}) {
	const imgUrl = 'http://localhost:9000/image/';
	const navigate = useNavigate();

	return (
		<>
			<RoomImage
				backgroundImage={`url(${imgUrl}${bookingList.thumbnailImage})`}
				className='bkTop'
			>
				<RoomInfo>{bookingList.roomName}</RoomInfo>
				<RoomInfo>
					{bookingList.bookingStatus === 1 ? (
						<>예약 승인 대기 중입니다.</>
					) : bookingList.bookingStatus === 2 ? (
						<>
							결제 대기중 입니다.
							<br />
							<br />
							<Button variant='contained'>
								<PaymentIcon />
								&nbsp; 결제하기
							</Button>
						</>
					) : bookingList.bookingStatus === 3 ? (
						<>예약이 확정되었습니다.</>
					) : bookingList.bookingStatus === 4 ? (
						<>
							이용이 완료되었습니다.
							<br />
							<br />
							<Button variant='contained'>
								<RateReviewIcon />
								&nbsp; 이용후기 작성
							</Button>
						</>
					) : (
						<>예약 취소가 완료되었습니다.</>
					)}
				</RoomInfo>
			</RoomImage>
		</>
	);
}

export default Top;

const RoomImage = styled.div`
	position: relative;
	color: rgba(255, 255, 255, 1);
	background-color: transparent;
	padding: 50px;
	display: grid;
	text-align: center;
	justify-content: center;
	align-items: center;
	height: 300px;
	background-image: ${(props) => props.backgroundImage};
	background-size: cover;
	background-repeat: no-repeat;
	::before {
		position: absolute;
		content: '';
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
	}
`;

const RoomInfo = styled.h2`
	font-weight: bold;
	color: white;
	z-index: 100;
`;
