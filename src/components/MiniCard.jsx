import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import {CardActionArea} from '@mui/material';
import {useState} from 'react';
import axios from 'axios';
import {useEffect} from 'react';

export default function MiniCard(props) {
	const [data, setData] = useState('');
	const selectRoomData = () => {
		let url = localStorage.url + '/room/detail?num=' + props.num;
		axios.get(url).then((res) => setData(res.data));
	};
	useEffect(() => {
		selectRoomData();
	}, []);
	return (
		<Card sx={{maxWidth: 70}} style={{marginBottom: '10px'}}>
			<CardActionArea>
				<CardMedia
					component='img'
					height='70'
					image={data.thumbnailImage}
					alt=''
				/>
			</CardActionArea>
		</Card>
	);
}
