import React, {useEffect, useState} from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {SmsOutlined} from '@material-ui/icons';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
function DatailPrice(props) {
	const [btnLike, setBtnLike] = useState(false);
	const {num} = useParams();
	const navi = useNavigate();
	const [roomData, setRoomData] = useState('');

	//룸관련 데이터 출력
	const onSelectData = () => {
		let url = localStorage.url + '/detailInfo?num=' + num;
		axios.get(url).then((res) => {
			setRoomData(res.data.roomData);
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
						fontSize: '15px',
					}}
				>
					<span style={{paddingRight: '10px'}}>
						<SmsOutlined />
					</span>
					<span
						onClick={clickedToggle}
						toggle={btnLike}
						style={{
							color: btnLike ? '#704de4' : 'black',
						}}
					>
						{btnLike ? (
							<FavoriteIcon style={{marginBottom: '3px'}} />
						) : (
							<FavoriteBorderIcon />
						)}
					</span>
					<span>
						<img
							alt=''
							src='https://github.com/MoiM-Project/data/blob/main/icon/black.png?raw=true'
							style={{
								width: '23px',
								height: '23px',
								marginLeft: '8px',
								marginBottom: '5px',
							}}
						/>
					</span>
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
			<hr />
			<div></div>
		</div>
	);
}

export default DatailPrice;
