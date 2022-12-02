import React, {useEffect, useState} from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {SmsOutlined} from '@material-ui/icons';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import DeatilBooking from './DeatilBooking';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import jwt_decode from 'jwt-decode';
import ReportInsert from './ReportInsert';

function DatailFunction(props) {
	const [btnLike, setBtnLike] = useState('');
	const {num} = useParams();
	const [roomData, setRoomData] = useState('');
	const [facility, setFacility] = useState([]);
	const [category, setCategory] = useState('');
	const token = localStorage.getItem('token');

	//룸관련 데이터 출력
	const onSelectData = () => {
		let url = localStorage.url + '/detailInfo?num=' + num;
		axios.get(url).then((res) => {
			setRoomData(res.data.roomData);
			setCategory(res.data.category);
			setFacility(res.data.facility);
		});
	};

	//로그인시 찜목록 리스트 하트 체크(false=찜 존재(채워진 하트)/true=찜 없음(비워진 하트))
	useEffect((e) => {
		onSelectData(num);
		if (token) {
			let userNum = jwt_decode(localStorage.getItem('token')).idx;
			let likeUrl =
				localStorage.url +
				'/detailLike?num=' +
				num +
				'&userNum=' +
				userNum;

			axios.get(likeUrl).then((res) => {
				console.log('likenum' + res.data.num);
				if (res.data.num != undefined) {
					setBtnLike(false);
				} else {
					setBtnLike(true);
				}
			});
		} else {
			setBtnLike(true);
		}
	}, []);

	//하트 누르기
	const clickedToggle = () => {
		if (token) {
			setBtnLike((prev) => !prev);

			if (btnLike) {
				let insertLikeUrl = localStorage.url + '/detail/insertLike';
				let userNum = jwt_decode(localStorage.getItem('token')).idx;

				axios.post(insertLikeUrl, {userNum, num}).then((res) => {
					alert('찜목록에 추가되었습니다');
				});
			} else {
				let deleteLikeUrl = localStorage.url + '/detail/deleteLike';
				let userNum = jwt_decode(localStorage.getItem('token')).idx;
				axios.post(deleteLikeUrl, {userNum, num}).then((res) => {
					alert('찜목록에서 삭제되었습니다');
				});
			}
		} else {
			alert('로그인해주세요');
		}
	};
	return (
		<div className='priceBanner'>
			<div className='priceEvent'>
				<b style={{fontSize: '13px'}}>세부공간 선택 </b>
				<span
					style={{
						float: 'right',
					}}
				>
					<div style={{display: 'flex'}}>
						<span>
							<SmsOutlined
								style={{
									marginBottom: '5px',
									marginRight: '-2px',
								}}
							/>
						</span>
						&nbsp;&nbsp;
						<span
							onClick={clickedToggle}
							toggle={btnLike}
							style={{
								color: btnLike === false ? '#704de4' : 'black',
								cursor: 'pointer',
							}}
						>
							{btnLike === false ? (
								<FavoriteIcon style={{marginBottom: '6px'}} />
							) : (
								<FavoriteBorderIcon
									style={{marginBottom: '6px'}}
								/>
							)}
						</span>
						&nbsp;
						{/* 911, 신고하기, report */}
						<div style={{marginTop: '-7px'}}>
							<ReportInsert roomNum={num} />
						</div>
					</div>
				</span>
			</div>
			<div
				style={{
					textAlign: 'center',
					paddingTop: '30px',
					paddingBottom: '20px',
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
				</label>
				<span style={{float: 'right', paddingRight: '20px'}}>
					<b style={{color: '#704de4'}}>
						₩{Number(roomData.weekAmPrice).toLocaleString('ko-KR')}
					</b>
					<span style={{fontSize: '12px'}}>/시간</span>
				</span>
			</div>
			<hr />
			<div>
				<div className='detailPriceInfo'>
					<div className='detailPriceImg' style={{padding: '14px'}}>
						<img
							alt=''
							src={roomData.thumbnailImage}
							style={{height: '200px', width: '100%'}}
						/>
					</div>

					<div style={{padding: '14px'}}>
						<div className='spaceInfo'>
							<span>
								<ArrowRightIcon />
								공간유형 :{' '}
							</span>
							<span>{category[0]}</span>
						</div>
						<div className='spaceInfo'>
							<span>
								<ArrowRightIcon />
								예약시간 :{' '}
							</span>
							<span>최소 1시간</span>
						</div>
						<div className='spaceInfo'>
							<span>
								<ArrowRightIcon />
								수용인원 :{' '}
							</span>
							<span>최대 {roomData.headcount}명</span>
						</div>
						<div style={{padding: '5px '}}>
							<span>
								<ArrowRightIcon />
								부가서비스
							</span>
							<div className='facilityItem'>
								{facility &&
									facility.map((item, idx) => (
										<div
											key={idx}
											style={{
												textAlign: 'center',
												width: '25%',
											}}
										>
											<img
												alt=''
												src={item.imageUrl}
												width='35'
												height={35}
											/>
											&nbsp;&nbsp;
											<p
												style={{
													fontSize: '12px',
													marginLeft: '-8px',
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
		</div>
	);
}

export default DatailFunction;
