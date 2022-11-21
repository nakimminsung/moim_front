import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

function HostTotalPlace(props) {
	const {hostNum} = useParams();
	const [hostInfo, setHostInfo] = useState([]);
	//호스트관련 데이터 출력
	const onSelectHost = () => {
		let hostUrl = localStorage.url + '/detailHost?hostNum=' + hostNum;

		axios.get(hostUrl).then((res) => {
			setHostInfo(res.data.list);
		});
	};
	useEffect(() => {
		onSelectHost(hostNum);
		console.log(hostInfo);
	}, []);
	return (
		<div>
			{hostNum}
			{hostInfo &&
				hostInfo.map((item, idx) => (
					<div>
						<img alt='' src='' />

						<div>
							<h3>
								<b>{item.name}</b>
							</h3>
						</div>
					</div>
				))}
		</div>
	);
}

export default HostTotalPlace;
