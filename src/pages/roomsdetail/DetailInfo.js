import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Link} from 'react-scroll';
import DetailReview from './DetailReview';

function DetailInfo(props) {
	const {num} = useParams();
	const [roomData, setRoomData] = useState('');
	const [holiday, setHoliday] = useState('');
	const [roomInfo, setRoomInfo] = useState('');
	const [roomPre, setRoomPre] = useState('');
	let [btnActive, setBtnActive] = useState('');

	//룸관련 데이터 출력
	const onSelectData = () => {
		let url = localStorage.url + '/detailInfo?num=' + num;
		axios.get(url).then((res) => {
			setRoomData(res.data.roomData);
			setHoliday(res.data.holiday);
			setRoomInfo(res.data.roomInfo);
			setRoomPre(res.data.pre);
		});
	};

	useEffect((e) => {
		onSelectData(num);
	}, []);

	const cssActive = (e) => {
		setBtnActive(() => {
			return e.target.value;
		});
	};

	return (
		<div>
			<br />
			<div
				className='input-group detail-memu'
				style={{width: '100%', position: 'sticky', top: '60px'}}
			>
				<Link
					to='1'
					spy={true}
					value={1}
					offset={-110}
					onClick={cssActive}
					className={
						'detailMenu' + (btnActive === 1 ? ' active' : '')
					}
				>
					공간소개{btnActive}
				</Link>

				<Link
					to='2'
					spy={true}
					value={2}
					offset={-120}
					onClick={cssActive}
					className={
						'detailMenu' + (btnActive === 2 ? ' active' : '')
					}
				>
					시설안내
				</Link>
				<Link
					to='3'
					spy={true}
					value={3}
					offset={-120}
					onClick={cssActive}
					className={
						'detailMenu' + (btnActive === 3 ? ' active' : '')
					}
				>
					유의사항
				</Link>
				<Link
					to='4'
					spy={true}
					value={4}
					offset={-120}
					onClick={cssActive}
					className={
						'detailMenu' + (btnActive === 4 ? ' active' : '')
					}
				>
					환불정책
				</Link>
				<Link
					to='5'
					spy={true}
					value={5}
					offset={-120}
					onClick={cssActive}
					className={
						'detailMenu' + (btnActive === 5 ? ' active' : '')
					}
				>
					Q&A
				</Link>
				<Link
					to='6'
					spy={true}
					value={6}
					offset={-120}
					onClick={cssActive}
					className={
						'detailMenu' + (btnActive === 6 ? ' active' : '')
					}
				>
					이용후기
				</Link>
			</div>
			<div id='1' style={{width: '100%', marginTop: '40px'}}>
				<b style={{borderBottom: '2px solid #ffd014'}}>공간소개</b>
				<br />
				<br />
				<pre
					style={{
						fontFamily: 'normal',
						color: '#656565',
						fontSize: '15px',
					}}
				>
					{roomData.fullIntroduction}
				</pre>
				<br />
				<span
					style={{
						fontFamily: 'normal',
						color: '#656565',
						fontSize: '15px',
						marginRight: '20%',
					}}
				>
					<span style={{color: 'black'}}>영업시간: </span>
					{roomData.stime} ~ {roomData.etime}시
				</span>
				<span
					style={{
						fontFamily: 'normal',
						color: '#656565',
						fontSize: '15px',
					}}
				>
					<span style={{color: 'black'}}>휴무일: </span>
					&nbsp;&nbsp;
					{holiday === 1
						? '월'
						: holiday === 2
						? '화'
						: holiday === 3
						? '수'
						: holiday === 4
						? '목'
						: holiday === 5
						? '금'
						: holiday === 6
						? '토'
						: '없음'}
				</span>
				{/* 주차,계단,엘베 옵션 */}
				<div className='mainFigure'>
					<figure className='fceFigure'>
						<img
							alt=''
							src='https://github.com/MoiM-Project/data/blob/main/icon/KakaoTalk_20221111_155826855.png?raw=true'
						/>
						<figcaption>
							{roomData.floor > 0
								? '지상' + roomData.floor + '층'
								: roomData.floor === 0
								? '지상1층'
								: '지하' + roomData.floor + '층'}
						</figcaption>
					</figure>
					<figure className='fceFigure'>
						<img
							alt=''
							src='https://github.com/MoiM-Project/data/blob/main/icon/KakaoTalk_20221111_155826945.png?raw=true'
						/>
						<figcaption>
							{roomData.parking === 0
								? '주차불가'
								: roomData.parking + '대가능'}
						</figcaption>
					</figure>
					<figure className='fceFigure'>
						<img
							alt=''
							src='https://github.com/MoiM-Project/data/blob/main/icon/KakaoTalk_20221111_155826780.png?raw=true'
						/>
						<figcaption>
							엘베{roomData.elevator === 0 ? '없음' : '있음'}
						</figcaption>
					</figure>
				</div>
			</div>

			<div id='2' style={{marginTop: '100px'}}>
				<b style={{borderBottom: '2px solid #ffd014'}}>시설안내</b>
				<br />
				<br />
				{roomInfo &&
					roomInfo.map((row, idx) => (
						<div
							style={{
								fontFamily: 'normal',
								color: '#656565',
								fontSize: '15px',
								width: '100%',
							}}
							key={idx}
						>
							<span style={{color: 'black'}}>
								{idx + 1}.&nbsp;{' '}
							</span>
							{row}
							<br />
							<br />
						</div>
					))}
			</div>

			<div id='3' style={{marginTop: '100px'}}>
				<b style={{borderBottom: '2px solid #ffd014'}}>
					예약시 주의사항
				</b>
				<br />
				<br />
				{roomPre &&
					roomPre.map((row, idx) => (
						<div
							style={{
								fontFamily: 'normal',
								color: '#656565',
								fontSize: '15px',
								width: '100%',
							}}
							key={idx}
						>
							<span style={{color: 'black'}}>
								{idx + 1}.&nbsp;{' '}
							</span>
							{row}
						</div>
					))}
			</div>

			<div
				id='4'
				style={{
					fontFamily: 'normal',
					fontSize: '15px',
					marginTop: '120px',
				}}
			>
				<b style={{borderBottom: '2px solid #ffd014'}} id='4'>
					환불규정 안내
				</b>
				<br />
				<br />

				<span style={{color: 'red'}}>
					이용당일(첫 날) 이후에 환불 관련 사항은 호스트에게 직접
					문의하셔야합니다.
				</span>
				<br />
				<span>
					결제 후 2시간 이내에는 100% 환불이 가능합니다.(단, 이용시간
					전까지만 가능)
				</span>
				<br />
				<br />
				<span>
					<b>이용 8일전</b>&nbsp;&nbsp;
					<span>총 금액의 100%환불</span>
				</span>
				<br />
				<br />
				<span>
					<b>이용 7일전</b>&nbsp;&nbsp;
					<span>총 금액의 90%환불</span>
				</span>
				<br />
				<br />
				<span>
					<b>이용 6일전</b>&nbsp;&nbsp;
					<span>총 금액의 80%환불</span>
				</span>
				<br />
				<br />
				<span>
					<b>이용 5일전</b>&nbsp;&nbsp;
					<span>총 금액의 70%환불</span>
				</span>
				<br />
				<br />
				<span>
					<b>이용 4일전</b>&nbsp;&nbsp;
					<span>총 금액의 50%환불</span>
				</span>
				<br />
				<br />
				<span>
					<b>이용 3일전 ~ 당일</b>&nbsp;&nbsp;
					<span>환불 불가</span>
				</span>
			</div>
			<DetailReview />
		</div>
	);
}

export default DetailInfo;
