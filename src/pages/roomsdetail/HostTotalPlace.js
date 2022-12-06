import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import HostList from './HostList';

function HostTotalPlace(props) {
	const {hostNum} = useParams();
	const [hostName, setHostName] = useState('');

	//호스트관련 데이터 출력
	const getNameHost = () => {
		let hostUrl = localStorage.url + '/host/hostName?num=' + hostNum;
		//console.log(hostUrl);
		axios.get(hostUrl).then((res) => {
			//console.log(res.data);
			setHostName(res.data);
		});
	};
	useEffect(() => {
		getNameHost();
	}, []);

	return (
		<div style={{paddingBottom: '70px'}}>
			<div style={{textAlign: 'center'}}>
				<b
					style={{
						borderBottom: '2px solid #ffd014',
						fontSize: '30px',
						paddingBottom: '5px',
					}}
				>
					{hostName}의 공간들
				</b>
			</div>
			<HostList />
		</div>
	);
}

export default HostTotalPlace;
