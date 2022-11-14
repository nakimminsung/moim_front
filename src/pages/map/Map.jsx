import React, {useEffect, useState} from 'react';
import TopMenu from './TopMenu';
import Title from './Title';
import List from './/List';
import Content from './Content';
import styled from '@emotion/styled/macro';
import {Box} from '@mui/material';
import {useParams} from 'react-router-dom';
import axios from 'axios';

function Map(props) {
	const [themeData, setThemeData] = useState('');
	const [roomData, setRoomData] = useState([]);
	const [sort, setSort] = useState('readCount desc');
	const [roomName, setRoomName] = useState('');
	const [headCount, setHeadCount] = useState('');
	const [address, setAddress] = useState('');
	const {themeNum} = useParams();

	// 테마 데이터 select
	const selectTheme = () => {
		let url = localStorage.url + '/theme/data?themeNum=' + themeNum;
		axios.get(url).then((res) => setThemeData(res.data));
	};
	// 테마의 공간 리스트 select
	const selectThemeRoomList = () => {
		let url =
			localStorage.url +
			'/theme/list?themeNum=' +
			themeNum +
			'&sort=' +
			sort +
			'&headCount=' +
			headCount +
			'&address=' +
			address +
			'&name=' +
			roomName;
		axios.get(url).then((res) => setRoomData(res.data));
		console.log(roomData);
	};

	useEffect(() => {
		selectTheme();
		selectThemeRoomList();
	}, [sort, roomName, address, headCount]);

	return (
		<Wrapper>
			<Top>
				<Title themeData={themeData} />
				<MenuDiv>
					<TopMenu
						roomName={roomName}
						setRoomName={setRoomName}
						address={address}
						setAddress={setAddress}
						headCount={headCount}
						setHeadCount={setHeadCount}
						roomData={roomData}
						sort={sort}
						setSort={setSort}
					/>
				</MenuDiv>
			</Top>
			<Bottom>
				<ListDiv>
					<List roomData={roomData} />
				</ListDiv>
				<ContentDiv>
					<Content roomData={roomData} />
				</ContentDiv>
			</Bottom>
		</Wrapper>
	);
}

export default Map;

const Wrapper = styled(Box)``;
const Top = styled(Box)`
	height: 16vh;
	position: fixed;
	top: 0;
	z-index: 15;
	background-color: white;
	display: flex;
	flex-direction: column;
	width: 100%;
	background-color: #fff;
`;
const MenuDiv = styled(Box)`
	padding: 10px;
`;
const Bottom = styled(Box)`
	display: flex;
	justify-content: space-between;
	height: 100%;
	padding-top: 16vh;
`;
const ListDiv = styled(Box)`
	@media (max-width: 1920px) {
		width: 20%;
	}
	@media (max-width: 1680px) {
		width: 25%;
	}
	@media (max-width: 767px) {
		width: 45%;
	}
	height: 84vh;
`;
const ContentDiv = styled(Box)`
	@media (max-width: 1920px) {
		width: 80%;
	}
	@media (max-width: 1680px) {
		width: 75%;
	}
	@media (max-width: 767px) {
		width: 55%;
	}
	height: 84vh;
	position: fixed;
	right: 0;
	top: 15vh;
`;
