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
import jwt_decode from 'jwt-decode';

function LikeList(props) {
	const [likeListInfo, setLikeListInfo] = useState([]);
	const [sort, setSort] = useState('readCount desc');

	// theme의 space list select
	const selectLikeRoomList = () => {
		let userNum = jwt_decode(localStorage.getItem('token')).idx;
		let url =
			localStorage.url + '/likeList?userNum=' + userNum + '&sort=' + sort;

		axios.get(url).then((res) => setLikeListInfo(res.data));
	};

	const handleChange = (e) => {
		setSort(e.target.value);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		selectLikeRoomList();
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
				{likeListInfo.length == 0 ? (
					<h4
						style={{
							height: '300px',
							width: '100%',
							lineHeight: '300px',
							textAlign: 'center',
						}}
					>
						<b>현재 찜한 공간이 없습니다.</b>
					</h4>
				) : (
					likeListInfo &&
					likeListInfo.map((item, i) => (
						<Card roomData={item} key={i} num={item.num} />
					))
				)}
			</RoomList>
		</ListWrapper>
	);
}

export default LikeList;
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
