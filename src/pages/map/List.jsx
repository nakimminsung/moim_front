import React from 'react';
import {useEffect, useState} from 'react';
import styled from '@emotion/styled/macro';
import {Box} from '@mui/material';
import Card from './Card';
import axios from 'axios';
import {useParams} from 'react-router-dom';

function List(props) {
	const [data, setData] = useState([]);
	const {num} = useParams();
	const {sort} = props;

	const selectThemeRoomList = () => {
		let url = localStorage.url + '/theme/list?num=' + num + '&sort=' + sort;
		console.log(url);
		axios.get(url).then((res) => setData(res.data));
	};

	useEffect(() => {
		selectThemeRoomList();
	}, [sort]);

	return (
		<RoomList>
			{data &&
				data.map((item, i) => (
					<Card roomData={item} key={i} roomNum={item.num} />
				))}
		</RoomList>
	);
}

export default List;

const RoomList = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	background-color: #f5f5f5;
`;
