import styled from '@emotion/styled/macro';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Box, Rating} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import React, {useEffect, useState} from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import {Card, CardActionArea, CardContent, Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button';

function QNA(props) {
	const [memberQna, setMemberQna] = useState([]);
	const [sort, setSort] = useState('order by writeday desc');

	// theme의 space list select
	const selectHostRoomList = () => {
		let userNum = jwt_decode(localStorage.getItem('token')).idx;
		let url =
			localStorage.url +
			'/reviewQna/qnaList?userNum=' +
			userNum +
			'&sort=' +
			sort;
		console.log(url);
		axios.get(url).then((res) => setMemberQna(res.data));
	};

	const handleChange = (e) => {
		setSort(e.target.value);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
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
						<MenuItem value={'order by writeday desc'}>
							최신순
						</MenuItem>
						<MenuItem
							value={
								'and answerContent is not null order by writeday asc'
							}
						>
							답글있음
						</MenuItem>
						<MenuItem
							value={
								'and answerContent is null order by writeday asc'
							}
						>
							답글없음
						</MenuItem>
					</Select>
				</FormControl>
			</SelectDiv>
			{memberQna.length == 0 ? (
				<h5
					style={{
						height: '300px',
						width: '100%',
						lineHeight: '300px',
						textAlign: 'center',
					}}
				>
					<b>현재 등록된 Q&A가 없습니다.</b>
				</h5>
			) : (
				<table>
					<thead>
						<tr>
							<th>번호</th>
							<th>문의내용</th>
						</tr>
					</thead>
				</table>
			)}
		</ListWrapper>
	);
}

export default QNA;
const ListWrapper = styled(Box)`
	padding-bottom: 50px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
`;
const SelectDiv = styled(Box)`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	align-items: flex-start;
`;
const ImageDiv = styled(Box)`
	overflow: hidden;
`;

const Space = styled(Typography)`
	display: flex;
	align-items: center;
	position: relative;
	right: 5px;
`;

const ImageBox = styled(Box)`
	transform: scale(1);
	-webkit-transform: scale(1);
	-moz-transform: scale(1);
	-ms-transform: scale(1);
	-o-transform: scale(1);
	transition: all 0.3s ease-in-out; /* 부드러운 모션을 위해 추가*/
	:hover {
		transform: scale(1.1);
		-webkit-transform: scale(1.1);
		-moz-transform: scale(1.1);
		-ms-transform: scale(1.1);
		-o-transform: scale(1.1);
	}
`;
