import axios from 'axios';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useNavigate} from 'react-router-dom';

// eslint-disable-next-line no-array-constructor
var week = new Array(
	'일요일',
	'월요일',
	'화요일',
	'수요일',
	'목요일',
	'금요일',
	'토요일',
);

function ListDetail(props) {
	const headCount = 1,
		roomName = '',
		address = '',
		payment = '',
		facility = '';
	const [data, setData] = useState([]);
	const [sort, setSort] = useState('a.readCount desc');
	const [sprice, setSprice] = useState('0');
	const [eprice, setEprice] = useState('500000');
	const [stime, setStime] = useState('0');
	const [etime, setEtime] = useState('24');
	const [holiday, setHoliday] = useState('');
	const [themeNum, setThemeNum] = useState(props.num);
	const navi = useNavigate();
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	const selectThemeRoomList = () => {
		let facilityCount = facility.length;
		setSprice(sprice ? sprice : 0);
		setEprice(eprice ? eprice : 500000);
		setStime(stime ? stime : 0);
		setEtime(etime ? etime : 24);
		setHoliday(holiday ? holiday : 99);
		let url =
			localStorage.url +
			'/theme/list?themeNum=' +
			themeNum +
			'&sort=' +
			sort;
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
		axios.post(url, selectData).then((res) => setData(res.data));
	};

	const deleteThemeRoom = (roomNum) => {
		let url =
			localStorage.url +
			'/theme/delete/room?themeNum=' +
			themeNum +
			'&roomNum=' +
			roomNum;
		axios.delete(url).then(window.location.reload());
	};

	useEffect(() => {
		selectThemeRoomList();
	}, []);

	return (
		<>
			{data &&
				data.map((item, i) => (
					<AccordionWrapper
						expanded={expanded === 'panel' + i}
						onChange={handleChange('panel' + i)}
					>
						<AccordionSummary
							aria-controls={'accordion' + i}
							id={'accordion' + i}
						>
							<RoomTitle>{item.name}</RoomTitle>
						</AccordionSummary>
						<AccordionDetails>
							<RoomDetail>
								<RoomInfo>
									<TableContainer component={Paper}>
										<Table
											sx={{minWidth: 650}}
											aria-label='simple table'
										>
											<TableBody>
												<TableRow
													key={item.name}
													sx={{
														'&:last-child td, &:last-child th':
															{border: 0},
													}}
												>
													<TableCell
														component='th'
														scope='row'
													>
														주소
													</TableCell>
													<TableCell
														component='td'
														scope='row'
													>
														{item.address +
															' ' +
															item.address2}
													</TableCell>
												</TableRow>
												<TableRow
													key={item.name}
													sx={{
														'&:last-child td, &:last-child th':
															{border: 0},
													}}
												>
													<TableCell
														component='th'
														scope='row'
													>
														인원제한
													</TableCell>
													<TableCell
														component='td'
														scope='row'
													>
														{item.headcount + '명'}
													</TableCell>
												</TableRow>
												<TableRow
													key={item.name}
													sx={{
														'&:last-child td, &:last-child th':
															{border: 0},
													}}
												>
													<TableCell
														component='th'
														scope='row'
													>
														운영시간
													</TableCell>
													<TableCell
														component='td'
														scope='row'
													>
														{item.stime +
															'시 ~ ' +
															item.etime +
															'시'}
													</TableCell>
												</TableRow>
												<TableRow
													key={item.name}
													sx={{
														'&:last-child td, &:last-child th':
															{border: 0},
													}}
												>
													<TableCell
														component='th'
														scope='row'
													>
														공휴일
													</TableCell>
													<TableCell
														component='td'
														scope='row'
													>
														{'매주 ' +
															week[item.holiday]}
													</TableCell>
												</TableRow>
												<TableRow
													key={item.name}
													sx={{
														'&:last-child td, &:last-child th':
															{border: 0},
													}}
												>
													<TableCell
														component='th'
														scope='row'
													>
														층수
													</TableCell>
													<TableCell
														component='td'
														scope='row'
													>
														{item.floor + '층'}
													</TableCell>
												</TableRow>
												<TableRow
													key={item.name}
													sx={{
														'&:last-child td, &:last-child th':
															{border: 0},
													}}
												>
													<TableCell
														component='th'
														scope='row'
													>
														주차
													</TableCell>
													<TableCell
														component='td'
														scope='row'
													>
														{item.parking + '대'}
													</TableCell>
												</TableRow>
												<TableRow
													key={item.name}
													sx={{
														'&:last-child td, &:last-child th':
															{border: 0},
													}}
												>
													<TableCell
														component='th'
														scope='row'
													>
														엘리베이터
													</TableCell>
													<TableCell
														component='td'
														scope='row'
													>
														{item.elevator
															? '가능'
															: '불가'}
													</TableCell>
												</TableRow>
												<TableRow
													key={item.name}
													sx={{
														'&:last-child td, &:last-child th':
															{border: 0},
													}}
												>
													<TableCell
														component='th'
														scope='row'
													>
														결제종류
													</TableCell>
													<TableCell
														component='td'
														scope='row'
													>
														{item.payment}
													</TableCell>
												</TableRow>
												<TableRow
													key={item.name}
													sx={{
														'&:last-child td, &:last-child th':
															{border: 0},
													}}
												>
													<TableCell
														component='th'
														scope='row'
													>
														등록일
													</TableCell>
													<TableCell
														component='td'
														scope='row'
													>
														{item.writeday}
													</TableCell>
												</TableRow>
												<TableRow
													key={item.name}
													sx={{
														'&:last-child td, &:last-child th':
															{border: 0},
													}}
												>
													<TableCell
														component='th'
														scope='row'
													>
														가격
													</TableCell>
													<TableCell
														component='td'
														scope='row'
													>
														{item.weekAmPrice.toLocaleString(
															'ko-KR',
														) + '원'}
													</TableCell>
												</TableRow>
											</TableBody>
										</Table>
									</TableContainer>
								</RoomInfo>
								<div>
									<DetailBtn
										onClick={(e) => {
											navi('/detail/' + item.num);
										}}
									>
										상세페이지
									</DetailBtn>
									<DeleteBtn
										onClick={() =>
											deleteThemeRoom(item.num)
										}
									>
										삭제하기
									</DeleteBtn>
								</div>
							</RoomDetail>
						</AccordionDetails>
					</AccordionWrapper>
				))}
		</>
	);
}

export default ListDetail;

const AccordionWrapper = styled(Accordion)`
	margin-bottom: 10px;
	background-color: white;
	opacity: 0.9;
`;
const RoomTitle = styled.b`
	font-size: 20px;
`;
const RoomDetail = styled.div`
	display: flex;
	flex-direction: column;
	> div {
		font-size: 20px;
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}
	> div > button {
		width: 50%;
	}
`;
const RoomInfo = styled.div`
	display: flex;
	flex-direction: column;
	> div {
		display: flex;
	}
`;
const DetailBtn = styled.button`
	background-color: lightgray;
`;
const DeleteBtn = styled.button`
	background-color: purple;
`;
