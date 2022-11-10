import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Link} from 'react-scroll';

function DetailInfo(props) {
	const {num} = useParams();
	const navi = useNavigate();
	const [roomData, setRoomData] = useState('');
	const [holiday, setHoliday] = useState('');
	const [roomInfo, setRoomInfo] = useState('');
	const [roomPre, setRoomPre] = useState('');

	//룸관련 데이터 출력
	const onSelectData = () => {
		let url = localStorage.url + '/detailroom?num=' + num;
		axios.get(url).then((res) => {
			console.log(res.data.tag);
			setRoomData(res.data.roomData);
			setHoliday(res.data.holiday);
			setRoomInfo(res.data.roomInfo);
			setRoomPre(res.data.pre);
		});
	};

	useEffect(() => {
		onSelectData(num);
	}, []);

	return (
		<div>
			<br id='1' />
			<div
				className='input-group'
				style={{width: '100%', position: 'sticky', top: '60px'}}
			>
				<Link to='1' spy={true} className='detailMenu'>
					<button>공간소개</button>
				</Link>
				<Link to='2' spy={true} className='detailMenu'>
					<button>시설안내</button>
				</Link>
				<Link to='3' spy={true} className='detailMenu'>
					<button>유의사항</button>
				</Link>
				<Link to='4' spy={true} className='detailMenu'>
					<button>환불정책</button>
				</Link>
				<Link to='5' spy={true} className='detailMenu'>
					<button>Q&A</button>
				</Link>
				<Link to='6' spy={true} className='detailMenu'>
					<button>이용후기</button>
				</Link>
			</div>
			<br />
			<br />
			<div style={{width: '49.8%'}}>
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
			</div>
			<br />
			{/* 영업시간 */}
			<div
				style={{
					fontFamily: 'normal',
					color: '#656565',
					fontSize: '15px',
				}}
			>
				<span>
					<span style={{color: 'black'}}>영업시간 </span>
					{roomData.stime} ~ {roomData.etime}시
				</span>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<span>
					<span style={{color: 'black'}}>휴무일</span>
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
			</div>
			<br id='2' />
			<br />
			<br />
			<br />
			<br />
			<div>
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
								width: '49.8%',
							}}
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
			<br id='3' />
			<br />
			<br />
			<br />
			<br />
			<div>
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
								width: '49.8%',
							}}
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
			<br id='4' />
			<br />
			<br />
			<br />
			<br />
			<div
				style={{
					fontFamily: 'normal',
					fontSize: '15px',
					width: '49.8%',
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
				<br />
				<br />
			</div>
		</div>
	);
}

export default DetailInfo;
