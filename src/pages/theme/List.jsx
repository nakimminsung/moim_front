import axios from 'axios';
import React from 'react';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import RoomCard from './Card';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from '@emotion/styled/macro';
import {Box} from '@mui/material';

function List(props) {
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
	const {themeNum} = useParams();

	// theme의 space list select
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
	const handleChange = (e) => {
		setSort(e.target.value);
	};

	useEffect(() => {
		selectThemeRoomList();
	}, [sort]);

	return (
		<ListWrapper>
			<SelectDiv>
				<FormControl sx={{m: 1, minWidth: 120}} size='small'>
					<Select
						labelId='demo-select-small'
						id='demo-select-small'
						value={sort}
						onChange={handleChange}
					>
						<MenuItem value={'a.readCount desc'}>인기순</MenuItem>
						<MenuItem value={'a.weekAmPrice asc'}>
							낮은 가격순
						</MenuItem>
						<MenuItem value={'a.weekAmPrice desc'}>
							높은 가격순
						</MenuItem>
					</Select>
				</FormControl>
			</SelectDiv>
			<RoomList>
				{data &&
					data.map((item, i) => (
						<RoomCard roomData={item} key={i} roomNum={item.num} />
					))}
			</RoomList>
		</ListWrapper>
	);
}

export default List;

const ListWrapper = styled(Box)`
	padding-bottom: 50px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const SelectDiv = styled(Box)`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	margin: 20px 0;
`;
const RoomList = styled(Box)`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	width: 100%;
`;
