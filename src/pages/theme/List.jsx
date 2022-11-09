import axios from 'axios';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {useParams} from 'react-router-dom';
import RoomCard from './RoomCard';

function List(props) {
	const {num} = useParams();
	const [data, setData] = useState([]);

	const selectThemeRoomList = () => {
		let url = localStorage.url + '/theme/list?num=' + num;
		console.log(url);
		axios.get(url).then((res) => setData(res.data));
	};

	useEffect(() => {
		selectThemeRoomList();
	}, []);

	return (
		<div style={{width: '100%'}}>
			{data.map((item, i) => (
				<RoomCard roomData={item} key={i} roomNum={item.num} />
			))}
		</div>
	);
}

export default List;
