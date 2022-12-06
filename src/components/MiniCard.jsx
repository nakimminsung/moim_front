import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import {CardActionArea} from '@mui/material';
import {useState} from 'react';
import axios from 'axios';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

export default function MiniCard(props) {
	const [data, setData] = useState('');
	const navi = useNavigate();
	const selectRoomData = () => {
		let url = localStorage.url + '/room/detail?num=' + props.num;
		axios.get(url).then((res) => {
			setData(res.data);
		});
	};
	useEffect(() => {
		selectRoomData();
	}, []);
	return (
		<CardWrapper
			onClick={() => {
				navi('/detail/' + props.num);
				window.location.reload();
			}}
		>
			<CardActionArea>
				<CardContent
					component='img'
					image={data.thumbnailImage}
					alt=''
				/>
			</CardActionArea>
		</CardWrapper>
	);
}

const CardWrapper = styled(Card)`
	margin-bottom: 10px;
	@media (max-width: 1920px) {
		width: 100px;
		height: 100px;
	}
	@media (max-width: 1680px) {
		width: 100px;
		height: 100px;
	}
	@media (max-width: 1000px) {
		width: 70px;
		height: 70px;
	}
	@media (max-width: 900px) {
		width: 70px;
		height: 70px;
	}
`;
const CardContent = styled(CardMedia)`
	@media (max-width: 1920px) {
		width: 100px;
		height: 100px;
	}
	@media (max-width: 1680px) {
		width: 100px;
		height: 100px;
	}
	@media (max-width: 1000px) {
		width: 70px;
		height: 70px;
	}
	@media (max-width: 900px) {
		width: 70px;
		height: 70px;
	}
`;
