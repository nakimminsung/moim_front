import {Favorite, Person, Sms} from '@material-ui/icons';
import RoomIcon from '@material-ui/icons/Room';
import axios from 'axios';
import React, {useEffect, useState} from 'react';

function SuggestRoom(props) {
	const [roomList, setRoomList] = useState('');

	const getRoomList = () => {
		let url = localStorage.url + '/roomList';

		axios.get(url).then((res) => {
			// console.log(res.data);

			var x = res.data;

			setRoomList(x);

			// console.log(x.length);
		});
	};

	useEffect(() => {
		//방 리스트
		getRoomList();
	}, []);

	return (
		<div className='themeArea' style={{textAlign: 'center'}}>
			<h3>
				<b>오늘의 추천 공간</b>
			</h3>
			<h6 style={{color: 'gray'}}>뜨기 전에 먼저 예약하세요!</h6>
			<br />

			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					flexWrap: 'wrap',
				}}
			>
				{roomList &&
					roomList.map((data, idx) => (
						<div
							style={{
								border: '1px solid lightgray',
								borderRadius: '5px',
								width: '350px',
								cursor: 'pointer',

								marginBottom: '30px',
							}}
							key={idx}
						>
							<img
								alt=''
								src={data.thumbnailImage}
								style={{
									width: '100%',
									height: '250px',
									borderRadius: '5px',
								}}
							/>
							<br />
							<div style={{color: 'gray'}}>
								<h5>
									<b style={{color: 'black'}}>{data.name}</b>
								</h5>
								<span>
									<RoomIcon
										style={{
											fontSize: '20px',
											marginBottom: '5px',
										}}
									/>
									{/* {data.address.split(' ')[1]} */}
								</span>
								<br />
								<span>room tag list</span>
								<br />
								<span>
									<b
										style={{
											color: '#6f42c1',
											fontSize: '20px',
										}}
									>
										{data.weekAmPrice.toLocaleString(
											'ko-KR',
										)}
									</b>
									&nbsp;원/시간
								</span>
								&emsp;&emsp;
								<span>
									<Person style={{fontSize: '20px'}} /> 최대{' '}
									{data.headcount}인{' '}
									<Sms style={{fontSize: '20px'}} /> 0{' '}
									<Favorite style={{fontSize: '20px'}} /> 0
								</span>
								<br />
								<br />
							</div>
						</div>
					))}
			</div>
		</div>
	);
}

export default SuggestRoom;
