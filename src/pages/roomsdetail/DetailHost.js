import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './Detail.css';

function DetailHost(props) {
	const navi = useNavigate();
	const {num} = useParams();
	const [hostInfo, setHostInfo] = useState('');
	const [roomData, setRoomData] = useState('');

	//호스트관련 데이터 출력
	const onSelectHost = () => {
		let hostUrl = localStorage.url + '/detailReview?num=' + num;

		axios.get(hostUrl).then((res) => {
			setHostInfo(res.data.host);
			setRoomData(res.data.roomData);
		});
	};
	useEffect(() => {
		onSelectHost(num);
	}, []);

	return (
		<div style={{marginBottom: '50px'}}>
			<div style={{marginTop: '100px'}}>
				<b
					style={{
						borderBottom: '2px solid #ffd014',
						fontSize: '18px',
						paddingBottom: '5px',
					}}
				>
					호스트 공간
				</b>
			</div>
			<div>
				<div>
					<table
						className='table '
						style={{
							marginTop: '20px',
							borderTop: '1.2px solid #dee2e6',
							height: '150px',
						}}
					>
						<tbody>
							<tr>
								<td
									style={{
										width: '130px',
										borderRight: 'none',
										verticalAlign: 'middle',
									}}
								>
									<img
										alt=''
										src={hostInfo.logoImage}
										className='qnaImg'
									/>
								</td>
								<td
									style={{
										verticalAlign: 'middle',
									}}
								>
									<div style={{paddingLeft: '30px'}}>
										<div>
											<b
												style={{
													color: '#704de4',
													fontSize: '13px',
												}}
											>
												HOST
											</b>
										</div>
										<b
											style={{
												fontSize: '17px',
											}}
										>
											{hostInfo.companyName}
										</b>

										<div style={{marginTop: '20px'}}>
											<button
												className='btnHost'
												onClick={() => {
													navi(
														'/hostPlace/' +
															roomData.hostNum,
													);
												}}
											>
												호스트 페이지로 이동
											</button>
										</div>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default DetailHost;
