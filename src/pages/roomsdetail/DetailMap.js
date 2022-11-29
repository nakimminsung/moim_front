import React, {useEffect, useRef} from 'react';
import ChatIcon from '@material-ui/icons/Chat';
import NavigationIcon from '@material-ui/icons/Navigation';
const {kakao} = window;

const options = {
	//지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(37.56682, 126.97865), //지도의 중심좌표.
	level: 1, //지도의 레벨(확대, 축소 정도)
};

function DetailMap(props) {
	const {roomData} = props;

	// 지도를 담을 영역의 DOM 레퍼런스
	const container = useRef(null);

	// 지도생성 함수
	const mapStart = (roomData) => {
		//지도 생성 및 객체 리턴
		let map = new kakao.maps.Map(container.current, options);

		//공간 위치로 이동
		let moveLatLon = new kakao.maps.LatLng(roomData.lat, roomData.lng);
		map.panTo(moveLatLon);

		// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
		var mapTypeControl = new kakao.maps.MapTypeControl();
		// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
		// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
		map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
		// 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성합니다
		var zoomControl = new kakao.maps.ZoomControl();
		map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

		//마커가 표시 될 위치
		let markerPosition = new kakao.maps.LatLng(roomData.lat, roomData.lng);

		// 마커를 생성
		let marker = new kakao.maps.Marker({
			position: markerPosition,
		});

		// 마커를 지도 위에 표시
		marker.setMap(map);
	};

	useEffect(() => {
		mapStart(roomData);
	}, [roomData]);
	return (
		<div style={{marginTop: '100px'}}>
			<div
				style={{
					padding: '33px 30px 38px',
					borderTop: '1px solid lightgray',
				}}
			>
				<h4>
					<b>{roomData.name}</b>
				</h4>
				<p style={{color: '#656565'}}>
					{roomData.address}
					{roomData.address2}
				</p>
				<button className='mapButton'>
					<ChatIcon />
					톡하기
				</button>
				&nbsp;&nbsp;&nbsp;&nbsp;
				<button
					className='mapButton'
					onClick={() => {
						window.open(
							'https://map.kakao.com/link/to/' +
								roomData.address +
								',' +
								roomData.lat +
								',' +
								roomData.lng,
							'_blank',
						);
					}}
				>
					<NavigationIcon />
					길찾기
				</button>
			</div>
			<div
				className='map'
				style={{
					width: '100%',
					height: '50vh',
					marginTop: '10px',
					marginRight: '10px',
					border: '1px solid lightgray',
					zIndex: 0,
				}}
				ref={container}
			></div>
		</div>
	);
}

export default DetailMap;
