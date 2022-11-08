import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './booking.css';

function BookingDetail() {
	const [roomData, setRoomData] = useState('');
	const navi = useNavigate();
	//const { num } = useParams();
	const {num} = 1;
	const url = `http://localhost:9000/room/detail?num=1`;

	const selectRoomData = () => {
		axios.get(url).then((res) => {
			setRoomData(res.data);
		});
	};

	useEffect(() => {
		selectRoomData();
	}, []);

	return (
		<div style={{background: '#f0f0f1'}}>
			<div className='bookingTop'>
				<h1>예약하기</h1>
			</div>
			<div className='bdContainer'>
				<div class='dbItem'>
					<div className='bdSpace'>
						<div
							style={{
								display: 'flex',
								borderBottom: '3px solid #704de4',
							}}
						>
							<h4>예약공간</h4>
							<h4 style={{marginLeft: 'auto', color: '#704de4'}}>
								₩60000
							</h4>
						</div>

						<div className='bdSpaceInfo'>
							<img
								alt=''
								// src={require(`./img/404.png`)}
								src={roomData.thumbnailImage}
								width='100'
								height={100}
							/>
							<div>
								<h3>{roomData.name}</h3>
								<h5>{roomData.fullIntroduction}</h5>
							</div>
						</div>
						<hr />
						<p>공간유형&nbsp;&nbsp;&nbsp;파티룸</p>
						<p>예약유형&nbsp;&nbsp;&nbsp;최소2명~최대12명</p>
						<p>추가인원&nbsp;&nbsp;&nbsp;3명 초과시 10,000원/인</p>
						<div style={{display: 'flex', flexWrap: 'wrap'}}>
							<div style={{display: 'flex'}}>
								<img
									alt=''
									src={require(`./img/beer.png`)}
									width='30'
									height={30}
								/>
								&nbsp;&nbsp;
								<p>주류반입 가능</p>
							</div>
							&nbsp;&nbsp;&nbsp;
							<div style={{display: 'flex'}}>
								<img
									alt=''
									src={require(`./img/beer.png`)}
									width='30'
									height={30}
								/>
								&nbsp;&nbsp;
								<p>주류반입 가능</p>
							</div>
							&nbsp;&nbsp;&nbsp;
							<div style={{display: 'flex'}}>
								<img
									alt=''
									src={require(`./img/beer.png`)}
									width='30'
									height={30}
								/>
								&nbsp;&nbsp;
								<p>주류반입 가능</p>
							</div>
							&nbsp;&nbsp;&nbsp;
							<div style={{display: 'flex'}}>
								<img
									alt=''
									src={require(`./img/beer.png`)}
									width='30'
									height={30}
								/>
								&nbsp;&nbsp;
								<p>주류반입 가능</p>
							</div>
							&nbsp;&nbsp;&nbsp;
							<div style={{display: 'flex'}}>
								<img
									alt=''
									src={require(`./img/beer.png`)}
									width='30'
									height={30}
								/>
								&nbsp;&nbsp;
								<p>주류반입 가능</p>
							</div>
							&nbsp;&nbsp;&nbsp;
							<div style={{display: 'flex'}}>
								<img
									alt=''
									src={require(`./img/beer.png`)}
									width='30'
									height={30}
								/>
								&nbsp;&nbsp;
								<p>주류반입 가능</p>
							</div>
							&nbsp;&nbsp;&nbsp;
							<div style={{display: 'flex'}}>
								<img
									alt=''
									src={require(`./img/beer.png`)}
									width='30'
									height={30}
								/>
								&nbsp;&nbsp;
								<p>주류반입 가능</p>
							</div>
							&nbsp;&nbsp;&nbsp;
							<div style={{display: 'flex'}}>
								<img
									alt=''
									src={require(`./img/beer.png`)}
									width='30'
									height={30}
								/>
								&nbsp;&nbsp;
								<p>주류반입 가능</p>
							</div>
							&nbsp;&nbsp;&nbsp;
							<div style={{display: 'flex'}}>
								<img
									alt=''
									src={require(`./img/beer.png`)}
									width='30'
									height={30}
								/>
								&nbsp;&nbsp;
								<p>주류반입 가능</p>
							</div>
						</div>
					</div>

					<div className='bdInfo'>
						<div
							style={{
								display: 'flex',
								borderBottom: '3px solid #704de4',
							}}
						>
							<h4>예약정보</h4>
						</div>
						<div style={{display: 'flex'}}>
							<p>예약날짜</p>
							<p style={{marginLeft: 'auto'}}>2022-11-08</p>
						</div>
						<div style={{display: 'flex'}}>
							<p>예약인원</p>
							<p style={{marginLeft: 'auto'}}>2명</p>
						</div>
					</div>
					<hr />
					<div className='bdOption'>
						<h4>추가옵션선택</h4>
						<div className='bdSpaceInfo'>
							<img
								alt=''
								src={require(`./img/404.png`)}
								width='100'
								height={100}
							/>
							<div>
								<h3>바베큐</h3>
								<h5>30,000 / 수량 1개</h5>
							</div>
						</div>
					</div>

					<div className='bdUserInfo'>
						<div
							style={{
								display: 'flex',
								borderBottom: '3px solid #704de4',
							}}
						>
							<h4>예약자정보</h4>
							<h5 style={{marginLeft: 'auto', color: 'red'}}>
								*필수입력
							</h5>
						</div>
						<div style={{display: 'flex'}}>
							<h4>예약자</h4>
							<input
								type='text'
								style={{
									width: '400px',
									height: '30px',
									marginTop: '10px',
									marginLeft: '30px',
								}}
							/>
						</div>
						<div style={{display: 'flex'}}>
							<h4>연락처</h4>
							<input
								type='text'
								style={{
									width: '400px',
									height: '30px',
									marginTop: '10px',
									marginLeft: '30px',
								}}
								placeholder='010-0000-0000'
							/>
						</div>
						<div style={{display: 'flex'}}>
							<h4>이메일</h4>
							<input
								type='text'
								style={{
									width: '400px',
									height: '30px',
									marginTop: '10px',
									marginLeft: '30px',
								}}
							/>
						</div>
						<div style={{display: 'flex'}}>
							<h4>사용목적</h4>
							<input
								type='text'
								style={{
									width: '400px',
									height: '30px',
									marginTop: '10px',
									marginLeft: '20px',
								}}
							/>
						</div>
						<div style={{display: 'flex'}}>
							<h4>요청사항</h4>
							<input
								type='text'
								style={{
									width: '400px',
									height: '30px',
									marginTop: '10px',
									marginLeft: '20px',
								}}
							/>
						</div>
					</div>
					<hr />
					<div className='otherInfo'>다른 정보들</div>
				</div>
				<div class='dbItem'>결제예정금액</div>
			</div>
		</div>
	);
}

export default BookingDetail;
