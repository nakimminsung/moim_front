// import React, { useEffect, useRef } from 'react';

// const { kakao } = window;

// const position = new kakao.maps.LatLng(37.56682, 126.97865); //지도의 중심좌표.

// const options = {
//     //지도를 생성할 때 필요한 기본 옵션
//     center: position,
//     level: 9, //지도의 레벨(확대, 축소 정도)
// };

// function Test(props) {
//     const { roomData } = props;

//     //지도를 담을 영역의 DOM 레퍼런스
//     const container = useRef(null);

//     const mapStart = () => {
//         //지도 생성 및 객체 리턴
//         let map = new kakao.maps.Map(container.current, options);
//         // 클러스터러 객체 생성 및 지도에 넣기
//         let clusterer = new kakao.maps.MarkerClusterer({
//             map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
//             averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
//             minLevel: 10, // 클러스터 할 최소 지도 레벨
//             disableClickZoom: true, // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
//         });

//         let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
//         // 마커 이미지의 이미지 크기 입니다
//         let imageSize = new kakao.maps.Size(24, 35);

//         // 마커 이미지를 생성합니다
//         let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

//         // 마커 생성
//         // let markers = down.positions.map((position, i) => {
//         let markers = roomData.map((position, i) => {
//             return new kakao.maps.Marker({
//                 position: new kakao.maps.LatLng(
//                     parseFloat(position.lat),
//                     parseFloat(position.lng),
//                 ),
//                 image: markerImage,
//             });
//         });




//         // 클러스터러에 마커들을 추가합니다
//         clusterer.addMarkers(markers);

//         // 이벤트리스너
//         kakao.maps.event.addListener(
//             clusterer,
//             'clusterclick',
//             function (cluster) {
//                 // 현재 지도 레벨에서 1레벨 확대한 레벨
//                 var level = map.getLevel() - 1;

//                 // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
//                 map.setLevel(level, { anchor: cluster.getCenter() });
//             },
//         );




//         return () => { };
//     };
//     useEffect(() => {
//         mapStart();
//     }, [roomData]);

//     return (
//         <>
//             <div
//                 className='map'
//                 style={{ width: '100%', height: '85vh' }}
//                 ref={container}
//             ></div>
//         </>
//     );
// }

// export default Test;

