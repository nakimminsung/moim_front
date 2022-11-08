import {Button} from '@material-ui/core';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './SpaceList.css';

function SpaceList(props) {
	localStorage.url = 'http://localhost:9000';
	const [spacelist, setSpacelist] = useState([]);

	const list = () => {
		let listUrl = localStorage.url + '/host/list';
		console.log(listUrl);
		axios.get(listUrl).then((res) => {
			setSpacelist(res.data);
			// console.log(11);
		});
	};

	useEffect(() => {
		list();
	}, []);

	const navi = useNavigate();

	const addButtonEvent = () => {
		let addUrl = localStorage.url + '/host/spaceadd';
		// console.log(addUrl);
		navi(`/host/addform`);
	};

	return (
		<div className='roomlist'>
			<div className='btn_wrap'>
				<Button
					variant='outlined'
					color='primary'
					className='btn_newadd'
					style={{border: '1px solid blueviolet'}}
					onClick={addButtonEvent}
				>
					<h5>
						<b style={{color: 'blueviolet'}}>새 공간 등록하기</b>
					</h5>
				</Button>
			</div>
			<br />
			<br />
			<div className='spacelist'>
				{spacelist.map((r, i) => (
					<div key={i}>
						<b>{r.name}</b>
						<br />
						<b>{r.num}</b>
						<br />
						<b>{r.writeday}</b>
						<br />
						<img
							alt=''
							src={r.thumbnailImage}
							style={{width: '200px'}}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default SpaceList;
