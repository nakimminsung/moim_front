import React, {useEffect, useState} from 'react';
import Menu from './Menu';
import Title from './Title';
import List from './List';
import Content from './Content';
import styled from '@emotion/styled/macro';
import {Box} from '@mui/material';
import {useParams} from 'react-router-dom';
import axios from 'axios';

function Map(props) {
	const [themeData, setThemeData] = useState('');
	const [roomData, setRoomData] = useState([]);
	const [sort, setSort] = useState('a.readCount desc');
	const [roomName, setRoomName] = useState('');
	const [headCount, setHeadCount] = useState(1);
	const [address, setAddress] = useState('');
	const [payment, setPayment] = useState('');
	const [sprice, setSprice] = useState('0');
	const [eprice, setEprice] = useState('500000');
	const [stime, setStime] = useState('0');
	const [etime, setEtime] = useState('24');
	const [facility, setFacility] = useState('');
	const [holiday, setHoliday] = useState('');
	const {themeNum} = useParams();

	// 테마 데이터 select
	const selectTheme = () => {
		let url = localStorage.url + '/theme/data?themeNum=' + themeNum;
		axios.get(url).then((res) => setThemeData(res.data));
	};
	// 테마의 공간 리스트 select
	const selectThemeRoomList = () => {
		let selectUrl = localStorage.url + '/theme/list';
		let facilityCount = facility.length;
		setSprice(sprice ? sprice : 0);
		setEprice(eprice ? eprice : 500000);
		setStime(stime ? stime : 0);
		setEtime(etime ? etime : 24);
		setHoliday(holiday ? holiday : 99);
		let selectData = {
			themeNum,
			sort,
			headCount,
			address,
			roomName,
			payment,
			sprice,
			eprice,
			facility,
			facilityCount,
			holiday,
			stime,
			etime,
		};
		console.log(selectUrl);
		console.log(selectData);
		axios.post(selectUrl, selectData).then((res) => setRoomData(res.data));
	};

	useEffect(() => {
		selectTheme();
		selectThemeRoomList();
	}, [
		sort,
		roomName,
		address,
		headCount,
		sprice,
		eprice,
		facility,
		payment,
		holiday,
		stime,
		etime,
	]);

	return (
		<Wrapper>
			<Top>
				<Title themeData={themeData} />
				<MenuDiv>
					<Menu
						setRoomName={setRoomName}
						address={address}
						setAddress={setAddress}
						headCount={headCount}
						setHeadCount={setHeadCount}
						roomData={roomData}
						sort={sort}
						setSort={setSort}
						payment={payment}
						setPayment={setPayment}
						sprice={sprice}
						eprice={eprice}
						setSprice={setSprice}
						setEprice={setEprice}
						setFacility={setFacility}
						setHoliday={setHoliday}
						setStime={setStime}
						setEtime={setEtime}
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
	@media (max-width: 1000px) {
		height: 24vh;
	}
	@media (max-width: 900px) {
		height: 24vh;
	}
`;
const MenuDiv = styled(Box)`
	padding: 10px;
`;
const Bottom = styled(Box)`
	display: flex;
	justify-content: space-between;
	height: 100%;
	padding-top: 16vh;
	@media (max-width: 1000px) {
		padding-top: 24vh;
	}
	@media (max-width: 900px) {
		padding-top: 24vh;
	}
`;
const ListDiv = styled(Box)`
	@media (max-width: 1920px) {
		width: 20%;
	}
	@media (max-width: 1680px) {
		width: 25%;
	}
	@media (max-width: 1000px) {
		width: 40%;
		height: 76vh;
	}
	@media (max-width: 900px) {
		width: 40%;
		height: 76vh;
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
	@media (max-width: 1000px) {
		width: 60%;
		height: 76vh;
	}
	@media (max-width: 900px) {
		width: 60%;
		height: 76vh;
	}
	height: 84vh;
	position: fixed;
	right: 0;
	top: 15vh;
`;
