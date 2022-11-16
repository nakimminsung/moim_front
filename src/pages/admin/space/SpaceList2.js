import React, {useEffect, useState} from 'react';
import {Favorite, Person, Sms} from '@material-ui/icons';
import axios from 'axios';
import RoomIcon from '@material-ui/icons/Room';

function SpaceList2(props) {
	const [spaceList, setSpaceList] = useState('');

	const getSpaceList = () => {
		let url = localStorage.url + '/spaceList'; //메인페이지에서 사용한 roomList와 동일

		axios.get(url).then((res) => {
			// console.log(res.data);

			var x = res.data;

			setSpaceList(x);

			// console.log(x.length);
		});
	};

	useEffect(() => {
		//방 리스트
		getSpaceList();
	}, []);
	return (
		<div>
			<div
				className='spaceList'
				style={{
					marginTop: '20px',
					width: '100%',
					display: 'flex',

					justifyContent: 'space-between',
					flexWrap: 'wrap',
				}}
			>
				{spaceList &&
					spaceList.map((data, idx) => (
						<div
							style={{
								border: '1px solid lightgray',
								borderRadius: '5px',
								width: '49%',
								cursor: 'pointer',

								marginBottom: '15px',
								backgroundColor: 'white',
								boxShadow: '0px 2px 2px 1px rgba(0 0 0 / 10%)',

								display: 'flex',
								padding: '10px 10px 10px',
							}}
							key={idx}
						>
							{/* 방 이미지 */}
							<div>
								<img
									alt=''
									src={data.thumbnailImage}
									style={{
										width: '250px',
										height: '200px',
										borderRadius: '5px',
										marginRight: '20px',
									}}
								/>
							</div>

							{/* 방 정보 */}
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
									{data.address.split(' ')[1]}
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

export default SpaceList2;
