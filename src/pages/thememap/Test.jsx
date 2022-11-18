import React, {useRef} from 'react';
import {Map} from 'react-kakao-maps-sdk';
const {kakao} = window;

function Test(props) {
	const mapRef = useRef();

	const setMapType = (maptype) => {
		const map = mapRef.current;
		const roadmapControl = document.getElementById('btnRoadmap');
		const skyviewControl = document.getElementById('btnSkyview');
		if (maptype === 'roadmap') {
			map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
			roadmapControl.className = 'selected_btn';
			skyviewControl.className = 'btn';
		} else {
			map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
			skyviewControl.className = 'selected_btn';
			roadmapControl.className = 'btn';
		}
	};

	const zoomIn = () => {
		const map = mapRef.current;
		map.setLevel(map.getLevel() - 1);
	};
	const zoomOut = () => {
		const map = mapRef.current;
		map.setLevel(map.getLevel() + 1);
	};
	return (
		<>
			<div />
			<div className={`map_wrap`}>
				<Map // 지도를 표시할 Container
					id='map'
					center={{
						// 지도의 중심좌표
						lat: 36.2683,
						lng: 127.6358,
					}}
					style={{
						width: '100%',
						height: '100%',
						position: 'relative',
						overflow: 'hidden',
					}}
					level={3}
					ref={mapRef}
				></Map>
				{/* 지도타입 컨트롤 div 입니다 */}
				<div className='custom_typecontrol radius_border'>
					<span
						id='btnRoadmap'
						className='selected_btn'
						onClick={() => setMapType('roadmap')}
					>
						지도
					</span>
					<span
						id='btnSkyview'
						className='btn'
						onClick={() => {
							setMapType('skyview');
						}}
					>
						스카이뷰
					</span>
				</div>
				{/* 지도 확대, 축소 컨트롤 div 입니다 */}
				<div className='custom_zoomcontrol radius_border'>
					<span onClick={zoomIn}>
						<img
							src='https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png'
							alt='확대'
						/>
					</span>
					<span onClick={zoomOut}>
						<img
							src='https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png'
							alt='축소'
						/>
					</span>
				</div>
			</div>
		</>
	);
}

export default Test;
