import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import RoomIcon from '@mui/icons-material/Room';
import './Banner.css';
import styled from '@emotion/styled/macro';
import {Box, Typography} from '@mui/material';

function Banner(props) {
	const [data, setData] = useState('');
	const {num} = useParams();
	const navi = useNavigate();

	const selectTheme = () => {
		let url = localStorage.url + '/theme/data?num=' + num;
		console.log(url);
		axios.get(url).then((res) => setData(res.data));
	};

	useEffect(() => {
		selectTheme();
	}, []);

	return (
		<BannerWrapper>
			<Card
				style={{
					backgroundImage: `url(${data.bannerImage})`,
				}}
			>
				<Info>
					<Title>{data.description}</Title>
					<Line />
					<SubTitle>{data.title}</SubTitle>
				</Info>
				<MapButtonDiv>
					<MapButton
						onClick={() => {
							navi('/map/' + num);
						}}
					>
						<MapButtonTitle>
							<RoomIcon />
							지도로 보기
						</MapButtonTitle>
					</MapButton>
				</MapButtonDiv>
			</Card>
		</BannerWrapper>
	);
}

export default Banner;

const BannerWrapper = styled(Box)`
	margin: 0 auto;
`;
const Card = styled(Box)`
	background-repeat: no-repeat;
	background-size: 100% auto;
	background-position: center;
	width: 100%;
	height: 400px;
	padding: 10% 35px 30px 35px;
	margin-bottom: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;
const Info = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const Title = styled(Typography)`
	display: block;
	color: white;
	font-size: 40px;
`;
const Line = styled(Box)`
	width: 40px;
	height: 5px;
	background-color: yellow;
	opacity: 0.8;
	margin: 20px auto 30px;
`;
const SubTitle = styled(Typography)`
	font-size: 20px;
	color: white;
`;
const MapButtonDiv = styled(Box)`
	display: flex;
	justify-content: flex-end;
`;
const MapButton = styled(Box)`
	width: 150px;
	height: 45px;
	border: 2px solid white;
	text-align: center;
	line-height: 45px;
	border-radius: 50px;
	cursor: pointer;
`;
const MapButtonTitle = styled(Box)`
	color: white;
	font-size: 30p;
`;
