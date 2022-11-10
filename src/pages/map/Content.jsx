import React, {useEffect, useState} from 'react';

const {kakao} = window;

function Content(props) {
	const [map, setMap] = useState(null);

	//처음 지도 그리기
	useEffect(() => {
		const container = document.getElementById('map');
		const options = {center: new kakao.maps.LatLng(33.450701, 126.570667)};
		const kakaoMap = new kakao.maps.Map(container, options);
		setMap(kakaoMap);
		console.log(map);
	}, []);
	return (
		<div
			style={{
				width: '100%',
				display: 'inline-block',
				marginLeft: '5px',
				marginRight: '5px',
			}}
		>
			<div id='map' style={{width: '99%', height: '500px'}}></div>
		</div>
	);
}

export default Content;
