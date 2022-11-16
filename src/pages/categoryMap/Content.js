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

    // carousel
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = imageData.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) =>
            activeStep === maxSteps - 1 ? 0 : prevActiveStep + 1,
        );
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) =>
            activeStep === 0 ? maxSteps - 1 : prevActiveStep - 1,
        );
    };
    const handleStepChange = (step) => {
        setActiveStep(step);
    };


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
            };
        });
        overlayInfos.forEach(el => {
            let marker = new kakao.maps.Marker({
                map: mapRef.current,
                position: new kakao.maps.LatLng(el.lat, el.lng),
                title: el.title,
            });

            let content =
                '<div class="overlayWrap">' +
                `    <img class="overlayImg" src=${el.img}/>` +
                '    <div class="accommInfoWrap">' +
                `        <h1 class="accommName">${el.title}</h1>` +
                `        <p class="accommRegion">${el.region}</p>` +
                `        <p class="accommDesc">${el.desc}</p>` +
                `        <p class="accommPrice">${Number(
                    el.price
                ).toLocaleString()}</p>` +
                '    </div>' +
                '    <div class="overlayArrow">' +
                '</div>';

            let position = new kakao.maps.LatLng(el.lat, el.lng);

            let customOverlay = new kakao.maps.CustomOverlay({
                position: position,
                content: content,
            });

            kakao.maps.event.addListener(marker, 'click', function () {
                customOverlay.setMap(mapRef.current);
            });

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

const ImageDiv = styled(Box)`
	overflow: hidden;
`;
const ImageButtonDiv = styled(Box)``;
const PrevButton = styled(Button)`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	cursor: pointer;
	height: 200px;
	border: 0;
	background: none;
	color: white;
`;
const NextButton = styled(Button)`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	cursor: pointer;
	height: 200px;
	border: 0px;
	background: none;
	color: white;
`;
const PayInfo = styled(Typography)`
	width: 70px;
	height: 70px;
	padding-left: 18px;
	padding-right: 13px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	right: 0;
	border-radius: 1px;
	opacity: 0.9;
	z-index: 10;
	font-weight: 1000;
    word-spacing:normal;
`;
const Address = styled(Typography)`
	display: flex;
	align-items: center;
	position: relative;
	right: 5px;
`;
const TagDiv = styled(Box)`
	margin-top: 10px;
	min-height: 40px;
`;
const Tag = styled(Box)`
	margin-right: 5px;
	display: inline;
`;
const RoomInfoBottom = styled(Box)`
	display: flex;
	justify-content: space-between;
	margin-top: 10px;
`;
const PriceDiv = styled(Box)`
	display: flex;
	align-items: flex-end;
`;
const Price = styled(Typography)`
	font-size: 23px;
	margin-right: 5px;
	color: #9b4de3;
	margin-bottom: -3px;
`;
const EtcInfoDiv = styled(Box)`
	display: flex;
`;
const HeadCount = styled(Typography)`
	margin-left: 5px;
`;
const ReviewCount = styled(Typography)`
	margin-left: 5px;
`;
const LikeCount = styled(Typography)`
	margin-left: 5px;
`;
const CardWrapper = styled(Typography)`
	@media (max-width: 1920px) {
		width: 33%;
		padding: 5px;
        margin-bottom:40px;
	}
	@media (max-width: 1680px) {
		width: 33%;
		padding: 7px;
        margin-bottom:30px;
	}
	@media (max-width: 1000px) {
		width: 50%;
		padding: 5px;
	}
	@media (max-width: 900px) {
		width: 100%;
		padding-bottom: 5px;
	}
`;