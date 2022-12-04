import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import HostList from './HostList';

function HostTotalPlace(props) {
	const {hostNum} = useParams();
	const [hostInfo, setHostInfo] = useState('');

	//호스트관련 데이터 출력
	const onSelectHost = () => {
		let hostUrl = localStorage.url + '/detailReview?num=' + hostNum;

		axios.get(hostUrl).then((res) => {
			setHostInfo(res.data.host);
		});
	};
	useEffect(() => {
		onSelectHost(hostNum);
	}, []);

	return (
		<div>
			<div style={{marginTop: '40px', textAlign: 'center'}}>
				<b
					style={{
						borderBottom: '2px solid #ffd014',
						fontSize: '30px',
						paddingBottom: '5px',
					}}
				>
					{hostInfo.companyName} 호스트의 공간들
				</b>
			</div>
			<HostList />
		</div>
	);
}

export default HostTotalPlace;
