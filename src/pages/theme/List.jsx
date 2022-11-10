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
	const {num} = useParams();
	const [data, setData] = useState([]);
	const [sort, setSort] = useState('num');

	const selectThemeRoomList = () => {
		let url = localStorage.url + '/theme/list?num=' + num + '&sort=' + sort;
		console.log(url);
		axios.get(url).then((res) => setData(res.data));
	};

	const handleChange = (e) => {
		setSort(e.target.value);
		console.log(sort);
	};

	useEffect(() => {
		selectThemeRoomList();
	}, [sort]);

	return (
		<ListWrapper>
			<SelectDiv style={{}}>
				<FormControl sx={{m: 1, minWidth: 120}} size='small'>
					<Select
						labelId='demo-select-small'
						id='demo-select-small'
						defaultValue={'num'}
						onChange={handleChange}
					>
						<MenuItem value={'num'}>최신순</MenuItem>
						<MenuItem value={'readCount'}>인기순</MenuItem>
						<MenuItem value={'weekAmPrice'}>가격순</MenuItem>
					</Select>
				</FormControl>
			</SelectDiv>
			{data.map((item, i) => (
				<RoomCard roomData={item} key={i} roomNum={item.num} />
			))}
		</ListWrapper>
	);
}

export default List;

const ListWrapper = styled(Box)`
	padding-bottom: 50px;
`;
const SelectDiv = styled(Box)`
	display: flex;
	justify-content: flex-end;
	margin-bottom: 10px;
`;
