import axios from 'axios';
import React, {useEffect, useState} from 'react';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import defaultImg from './img/404.png';
import './booking.css';

function BDTop({price, roomData, date, head, num}) {
	const [facilityList, setFacilityList] = useState([]);
	const [categoryList, setCategoryList] = useState([]);
	const imgUrl = 'http://localhost:9000/image/';
	const fUrl = `http://localhost:9000/room/facility?num=${num}`;
	const cUrl = `http://localhost:9000/room/category?num=${num}`;

	const selectFacilityData = () => {
		axios.get(fUrl).then((res) => {
			setFacilityList(res.data);
		});
	};

	const selectCategoryData = () => {
		axios.get(cUrl).then((res) => {
			setCategoryList(res.data);
		});
	};

	const onErrorImg = (event) => (event.target.src = defaultImg);

	useEffect(() => {
		selectFacilityData();
		selectCategoryData();
	}, []);

	return (
		<>
			<div className='bdSpace'>
				<div
					style={{
						display: 'flex',
						borderBottom: '3px solid #704de4',
					}}
				>
					<h4>예약공간</h4>
					<h4
						style={{
							marginLeft: 'auto',
							color: '#704de4',
						}}
					>
						₩ {price.toLocaleString('ko-KR')}
					</h4>
				</div>

				<div className='bdSpaceInfo'>
					<img
						alt=''
						// src={imgUrl + roomData.thumbnailImage}
						src={roomData.thumbnailImage}
						width='200'
						height={200}
						onError={onErrorImg}
					/>
					<div
						style={{
							marginTop: '30px',
							marginLeft: '20px',
						}}
					>
						<h3>{roomData.name}</h3>
						<h6>{roomData.fullIntroduction}</h6>
					</div>
				</div>
				<hr />
				<span
					style={{
						marginLeft: '30px',
						marginRight: '50px',
					}}
				>
					<CheckOutlinedIcon />
					&nbsp; 공간유형
				</span>
				{categoryList.map((item, idx) => (
					<span key={idx}>{item.cname} </span>
				))}
				<p style={{marginLeft: '30px'}}>
					<CheckOutlinedIcon />
					&nbsp; 예약가능인원&nbsp;&nbsp;&nbsp;&nbsp; 최대&nbsp;
					{roomData.headcount}명
				</p>

				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						marginLeft: '30px',
					}}
				>
					{facilityList.map((item, idx) => (
						<>
							<div style={{display: 'flex'}} key={idx}>
								<img
									alt=''
									src={item.imageUrl}
									width='30'
									height={30}
								/>
								&nbsp;&nbsp;
								<p>{item.fname}</p>
							</div>
							&nbsp;&nbsp;&nbsp;
						</>
					))}
				</div>
			</div>

			<div className='bdInfo'>
				<div
					style={{
						display: 'flex',
						borderBottom: '3px solid #704de4',
						marginTop: '30px',
					}}
				>
					<h4>예약정보</h4>
				</div>
				<div
					style={{
						display: 'flex',
						marginLeft: '30px',
						marginTop: '10px',
					}}
				>
					<p>예약날짜</p>
					<p style={{marginLeft: 'auto'}}>{date}</p>
				</div>
				<div
					style={{
						display: 'flex',
						marginLeft: '30px',
					}}
				>
					<p>예약인원</p>
					<p style={{marginLeft: 'auto'}}>{head}명</p>
				</div>
			</div>
		</>
	);
}

export default BDTop;
