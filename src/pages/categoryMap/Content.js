import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import { RemovableCustomOverlayStyle, Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import './Overlay.css';
import styled from 'styled-components';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';

const { kakao } = window;


const position = new kakao.maps.LatLng(37.56682, 126.97865); //지도의 중심좌표.

const options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: position,
    level: 9, //지도의 레벨(확대, 축소 정도)
};

function Test(props) {
    const [tagData, setTagData] = useState([]);
    const [imageData, setImageData] = useState([]);
    const [reviewCount, setReviewCount] = useState('');
    const [likeCount, setLikeCount] = useState('');
    const { roomData, roomNum } = props;
    const navi = useNavigate();
    console.log({ roomData });

    // room tag list select function
    const selectTagList = (num) => {
        let url = localStorage.url + '/tag/list?num=' + num;
        console.log(url);
        axios.get(url).then((res) => {
            setTagData(res.data.tagData);
            setImageData(res.data.roomImageData);
            setReviewCount(res.data.reviewCount);
            setLikeCount(res.data.likeCount);
        });
    };

    // image prev, next button option
    const show = document.getElementById('show');
    const btnShow = () => {
        show.style.display = 'block';
    };
    const btnHidden = () => {
        show.style.display = 'none';
    };

    // image zoom
    const img = document.getElementById('image');
    const zoomIn = () => {
        img.style.transform = 'scale(1.2)';
        img.style.zIndex = 1;
        img.style.transition = 'all 0.5s';
    };
    const zoomOut = () => {
        img.style.transform = 'scale(1)';
        img.style.zIndex = 0;
        img.style.transition = 'all 0.5s';
    };

    useEffect(() => {
        selectTagList(roomNum);
    }, []);


    // 카카오맵 설정
    const location = useLocation()
    useEffect(() => {
        const container = document.getElementById('myMap');
        const options = {
            center: new kakao.maps.LatLng(37.56682, 126.97865),
            level: 8,
        };
        mapRef.current = new kakao.maps.Map(container, options);
    }, [location]);

    const mapRef = useRef();

    useEffect(() => {
        const overlayInfos = roomData.map(info => {
            return {
                title: info.name,
                lat: parseFloat(info.lat),
                lng: parseFloat(info.lng),
                img: info.thumbnailImage,
                price: info.holiAmPrice,
                region: info.address,
                desc: info.fullIntroduction,
                num: info.num,
                headcount: info.headcount,
            };
        });
        overlayInfos.forEach(el => {
            let like = Math.random() * 100
            const likeFloor = Math.floor(like)
            let rev = Math.random() * 100
            const revFloor = Math.floor(rev)

            let marker = new kakao.maps.Marker({
                map: mapRef.current,
                position: new kakao.maps.LatLng(el.lat, el.lng),
                title: el.title,
                // image: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
            });

            let content =
                '<div class="overlayWrap">' +
                `    <a href="/detail/${el.num}">` +
                `        <img class="overlayImg" src=${el.img}>` +
                `    </a>` +
                '    <div class="accommInfoWrap">' +
                `        <h1 class="accommName">${el.title}</h1>` +
                `        <i class='fas fa-map-marker-alt' style='float:left; margin-right:5px'></i>` +
                `        <p class="accommRegion">${el.region}</p>` +
                `        <p class="accommDesc">${el.desc}</p>` +

                `    <div class="priceWrap" style="">` +
                `<div class="price">` +
                `        <span class="accommPrice" style="width:90px">${Number(el.price).toLocaleString()}</span>` +
                `        <span style="font-size:10px;">원/시간</span>` +
                `</div>` +
                `            <div class="iconWrap" style="">` +
                `           <i class='fas fa-user-alt' style='font-size:20px;'></i>` +
                `           ${el.headcount}` +
                `           <i class='fas fa-comment-dots' style='font-size:20px'></i>` +
                `           ${likeFloor}` +
                `           <i class='fas fa-heart' style='font-size:20px'></i>` +
                `           ${revFloor}` +
                '        </div>' +
                '    </div>' +
                '</div>' +
                '</div>';
            let position = new kakao.maps.LatLng(el.lat, el.lng);

            let customOverlay = new kakao.maps.CustomOverlay({
                position: position,
                content: content,
            });

            kakao.maps.event.addListener(marker, 'click', function () {
                customOverlay.setMap(mapRef.current);
            });

            kakao.maps.event.addListener(mapRef.current, 'click', function () {
                setTimeout(function () {
                    customOverlay.setMap(null);
                });
            });

            // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
            // kakao.maps.event.addListener(marker, 'mouseout', function () {
            //     setTimeout(function () {
            //         customOverlay.setMap();
            //     });
            // });

        });
    }, [roomData]);

    return (
        <div
            id="myMap"
            style={{
                width: '100%',
                height: '100%',
            }}
        />
    );
};

export default Test;