import React, {useEffect, useRef} from 'react';
const {kakao} = window;

const options = {
	//지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(37.56682, 126.97865), //지도의 중심좌표.
	level: 10, //지도의 레벨(확대, 축소 정도)
};

function Content(props) {
	const {roomData} = props;

	// 지도를 담을 영역의 DOM 레퍼런스
	const container = useRef(null);

	// 지도생성 함수
	const mapStart = (roomData) => {
		//지도 생성 및 객체 리턴
		let map = new kakao.maps.Map(container.current, options);

		// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
		var mapTypeControl = new kakao.maps.MapTypeControl();
		// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
		// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
		map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
		// 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성합니다
		var zoomControl = new kakao.maps.ZoomControl();
		map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

		// 클러스터러 객체 생성 및 지도에 넣기
		let clusterer = new kakao.maps.MarkerClusterer({
			map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
			averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
			minLevel: 2, // 클러스터 할 최소 지도 레벨
			disableClickZoom: true, // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
		});

		// marker image setting
		let imageSrc = 'https://img.icons8.com/glyph-neue/512/marker.png';
		let imageSize = new kakao.maps.Size(40, 40);
		let imageOption = {offset: new kakao.maps.Point(27, 69)};
		let markerImage = new kakao.maps.MarkerImage(
			imageSrc,
			imageSize,
			imageOption,
		);

		// 마커 생성
		// let markers = down.positions.map((position, i) => {
		let markers = roomData.map((position, i) => {
			let marker = new kakao.maps.Marker({
				image: markerImage, // 마커이미지 설정
				position: new kakao.maps.LatLng(
					parseFloat(position.lat),
					parseFloat(position.lng),
				),
			});
			let content =
				'<div class="card" style="width:300px; z-index:20; margin:-2px;">' +
				`    <img class="card-img-top" src="${position.thumbnailImage}" alt='' style="width:300px; height:180px;" />` +
				`    <div class="card-body" style="width:300px; height:130px; display:flex; flex-direction:column; justify-content:space-between; padding:10px;">` +
				`        <h4 class="card-title" style="font-weight:600">${position.name}</h4>` +
				`        <div style="width:300px; height:200px; display:flex; align-items:center;">` +
				`            <i class='fas fa-map-marker-alt' style='font-size:20px; color:gray; margin-right:5px;'></i>` +
				`            <span class="card-text" style="color:gray;">${
					position.address.split(' ')[1]
				}</span>` +
				`        </div>` +
				`        <p style="margin:0; color:gray;"><b style='color:#9b4de3; font-size:20px; font-weight:600;'>${Number(
					position.weekAmPrice,
				).toLocaleString()}</b> 원/시간</p>` +
				`    </div>` +
				'</div>';

			let infowindow = new kakao.maps.InfoWindow({
				content: content, // 인포윈도우에 표시할 내용
			});
			// 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
			// 이벤트 리스너로는 클로저를 만들어 등록합니다
			// for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
			kakao.maps.event.addListener(
				marker,
				'click',
				makeOverListener(map, marker, infowindow),
			);
			kakao.maps.event.addListener(
				marker,
				'mouseout',
				makeOutListener(infowindow),
			);
			return marker;
		});
		// 클러스터러에 마커들을 추가합니다
		clusterer.addMarkers(markers);

		// 인포윈도우 관련 이벤트
		// 인포윈도우를 표시하는 클로저를 만드는 함수입니다
		function makeOverListener(map, marker, infowindow) {
			return function () {
				infowindow.open(map, marker);
			};
		}
		// 인포윈도우를 닫는 클로저를 만드는 함수입니다
		function makeOutListener(infowindow) {
			return function () {
				infowindow.close();
			};
		}

		// 클러스터러 클릭 이벤트
		kakao.maps.event.addListener(
			clusterer,
			'clusterclick',
			function (cluster) {
				// 현재 지도 레벨에서 1레벨 확대한 레벨
				var level = map.getLevel() - 1;
				// 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
				map.setLevel(level, {anchor: cluster.getCenter()});
			},
		);
		return () => {};
	};
	useEffect(() => {
		mapStart(roomData);
	}, [roomData]);

	return (
		<>
			<div
				className='map'
				style={{
					width: '100%',
					height: '85vh',
					marginTop: '10px',
					marginRight: '10px',
				}}
				ref={container}
			/>
		</>
	);
}
export default Content;
