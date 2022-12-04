import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Tag from './Tag';
import styled from 'styled-components';

function RoomList(props) {
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

	const deleteThemeRoom = (num) => {
		let url =
			localStorage.url +
			'/theme/delete/room?roomNum=' +
			num +
			'&themeNum=' +
			themeNum;
		alert('삭제되었습니다');
		axios.delete(url).then((res) => {
			selectThemeRoomList();
		});
	};

	const linkSpace = (e) => {
		navi('/detail/' + e);
	};

	useEffect(() => {
		selectThemeRoomList();
	}, []);

	return (
		<Table size='small' aria-label='purchases'>
			{data.length === 0 ? (
				''
			) : (
				<TableHead>
					<TableRow>
						<StyledTableCell align='center'>
							<b>공간명</b>
						</StyledTableCell>
						<StyledTableCell align='center'>
							<b>태그</b>
						</StyledTableCell>
						<StyledTableCell align='center'>
							<b>주소</b>
						</StyledTableCell>
						<StyledTableCell align='center'>
							<b>인원제한</b>
						</StyledTableCell>
						<StyledTableCell align='center'>
							<b>운영시간</b>
						</StyledTableCell>
						<StyledTableCell align='center'>
							<b>가격</b>
						</StyledTableCell>
						<StyledTableCell align='center'>
							<b>메뉴</b>
						</StyledTableCell>
					</TableRow>
				</TableHead>
			)}
			<TableBody>
				{data.map((item, i) => (
					<TableRow key={i}>
						<TableCell component='th' scope='row' align='center'>
							<span
								num={item.num}
								onClick={(e) => linkSpace(e.target.num)}
								style={{
									cursor: 'pointer',
									textDecoration: 'underline',
								}}
							>
								{item.name}
							</span>
						</TableCell>
						<TableCell component='th' scope='row' align='center'>
							<Tag num={item.num} />
						</TableCell>
						<TableCell>
							{item.address + ' ' + item.address2}
						</TableCell>
						<TableCell align='center'>
							{item.headcount + '명'}
						</TableCell>
						<TableCell align='center'>
							{item.stime + '시 ~ ' + item.etime + '시'}
						</TableCell>
						<TableCell align='center'>
							{item.weekAmPrice.toLocaleString('ko-KR') + '원'}
						</TableCell>
						<TableCell align='center'>
							<RoomDeleteBtn
								value={item.num}
								onClick={(e) => deleteThemeRoom(e.target.value)}
							>
								삭제
							</RoomDeleteBtn>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

export default RoomList;

const StyledTableCell = styled(TableCell)`
	background-color: gray;
	> b {
		color: white;
		font-size: 15px;
	}
`;
const RoomDeleteBtn = styled.button`
	background-color: black;
	color: white;
	border-radius: 5px;
`;
