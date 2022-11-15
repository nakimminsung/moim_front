import React, {useEffect, useState} from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {SmsOutlined} from '@material-ui/icons';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import DeatilBooking from './DeatilBooking';
function DatailPrice(props) {
	const [btnLike, setBtnLike] = useState(false);
	const {num} = useParams();
	const [roomData, setRoomData] = useState('');
	const [facility, setFacility] = useState([]);
	const [category, setCategory] = useState('');

	//룸관련 데이터 출력
	const onSelectData = () => {
		let url = localStorage.url + '/detailInfo?num=' + num;
		axios.get(url).then((res) => {
			setRoomData(res.data.roomData);
			setCategory(res.data.category);
			setFacility(res.data.facility);
		});
	};

	useEffect((e) => {
		onSelectData(num);
	}, []);

	//하트 누르기
	const clickedToggle = () => {
		setBtnLike((prev) => !prev);
	};
	return (
		<div className='priceBanner' style={{width: '100%'}}>
			<div className='priceEvent'>
				<b style={{fontSize: '13px'}}>세부공간 선택 </b>
				<span
					style={{
						float: 'right',
					}}
				>
					<span>
						<SmsOutlined
							style={{marginBottom: '5px', marginRight: '-2px'}}
						/>
					</span>
					&nbsp;&nbsp;
					<span
						onClick={clickedToggle}
						toggle={btnLike}
						style={{
							color: btnLike ? '#704de4' : 'black',
						}}
					>
						{btnLike ? (
							<FavoriteIcon style={{marginBottom: '6px'}} />
						) : (
							<FavoriteBorderIcon style={{marginBottom: '6px'}} />
						)}
					</span>
					&nbsp;
					<span
						class='material-symbols-outlined'
						style={{fontSize: 'xx-large'}}
					>
						e911_emergency
					</span>
				</span>
			</div>
			<div
				style={{
					textAlign: 'center',
					paddingTop: '40px',
					paddingBottom: '30px',
				}}
			>
				{roomData.payment === '바로결제' ? (
					<h6>
						<b>결제 후 바로 예약확정</b>
					</h6>
				) : (
					<h6>
						<b>호스트 승인 후 예약확정</b>
					</h6>
				)}

				<span className='smallContent'>
					<span>빠르고 확실한 예약을 위해 MoiM에서</span>
					<br />
					<span>온라인 결제를 진행하세요.</span>
				</span>
			</div>
			<div style={{paddingLeft: '20px'}}>
				<label style={{cursor: 'pointer'}}>
					<input type={'radio'} checked />
					<b> 공간 예약 </b>{' '}
					<span>
						<b style={{color: '#704de4'}}>
							₩{roomData.weekAmPrice}
						</b>
						<span style={{fontSize: '12px'}}>/시간</span>
					</span>
				</label>
			</div>
			<hr />
			<div className='detailPriceInfo'>
				<div className='detailPriceImg'>
					<img
						alt=''
						src={roomData.thumbnailImage}
						style={{height: '180px', width: '100%'}}
					/>
				</div>
				<br />
				<div>
					<div>
						<span>공간유형 : </span>
						<span>{category[0]}</span>
					</div>
					<div>
						<span>예약시간 : </span>
						<span>최소 1시간</span>
					</div>
					<div>
						<span>수용인원 : </span>
						<span>최대 {roomData.headcount}명</span>
					</div>
					<div>
						<span>부가서비스</span>
						<div className='facilityItem'>
							{facility &&
								facility.map((item, idx) => (
									<div
										key={idx}
										style={{
											textAlign: 'center',
											width: '33%',
										}}
									>
										<img
											alt=''
											src={item.imageUrl}
											width='30'
											height={30}
										/>
										&nbsp;&nbsp;
										<p
											style={{
												fontSize: '12px',
												marginRight: '17px',
											}}
										>
											{item.fname}
										</p>
									</div>
								))}
						</div>
					</div>
				</div>

				<DeatilBooking />
			</div>
		</div>
	);
}

export default DatailPrice;
