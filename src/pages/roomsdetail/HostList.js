import axios from 'axios';
import React from 'react';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from '@emotion/styled/macro';
import {Box} from '@mui/material';
import Card from './Card';

function HostList(props) {
	const {hostNum} = useParams();
	const [hostInfo, setHostInfo] = useState([]);
	const [sort, setSort] = useState('readCount desc');

	// theme의 space list select
	const selectHostRoomList = () => {
		let url =
			localStorage.url +
			'/host/placelist?hostNum=' +
			hostNum +
			'&sort=' +
			sort;
		console.log(url);
		axios.get(url).then((res) => setHostInfo(res.data));
	};
	const handleChange = (e) => {
		setSort(e.target.value);
	};

	useEffect(() => {
		selectHostRoomList();
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
						<MenuItem value={'readCount desc'}>인기순</MenuItem>
						<MenuItem value={'weekAmPrice asc'}>
							낮은 가격순
						</MenuItem>
						<MenuItem value={'weekAmPrice desc'}>
							높은 가격순
						</MenuItem>
					</Select>
				</FormControl>
			</SelectDiv>
			<RoomList>
				{hostInfo &&
					hostInfo.map((item, i) => (
						<Card roomData={item} key={i} roomNum={item.num} />
					))}
			</RoomList>
		</ListWrapper>
	);
}

export default HostList;
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
