import {Box, Button} from '@material-ui/core';
import {Checkbox} from '@mui/material';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import Toggle from './Toggle';

function SpaceList(props) {
	localStorage.url = 'http://localhost:9000';

	let imageUrl = localStorage.url + '/image/';

	const [checked, setChecked] = useState(0);

	const [spacelist, setSpacelist] = useState([]);

	const list = () => {
		let listUrl = localStorage.url + '/host/list';
		console.log(listUrl);
		axios.get(listUrl).then((res) => {
			setSpacelist(res.data);
			// console.log(11);
		});
	};

	const updateStaus = (idx, checked) => {
		let statusUrl =
			localStorage.url +
			'/host/status?num=' +
			idx +
			'&hideStatus=' +
			checked;
		console.log(statusUrl);
		// console.log('checked' + checked);
		axios.patch(statusUrl).then((res) => {});
	};

	useEffect(() => {
		list();
	}, []);

	const navi = useNavigate();

	return (
		<RoomList>
			<BtnWrap>
				<BtnNewAdd
					variant='outlined'
					color='primary'
					className='btn_newadd'
					style={{border: '1px solid blueviolet'}}
					onClick={() => navi(`/host/addform`)}
				>
					<h5>
						<b style={{color: 'blueviolet'}}>새 공간 등록하기</b>
					</h5>
				</BtnNewAdd>
			</BtnWrap>
			<br />
			<br />
			<div className='spacelist'>
				{spacelist.map((r, i) => (
					<div key={i} className='boxspace'>
						<div className='inner'>
							<div className='img_box'>
								<img
									alt=''
									src={`${imageUrl + r.thumbnailImage}`}
									// src={r.thumbnailImage}
									style={{width: '200px'}}
								/>
								<span className='close'></span>
								<span className='label'></span>
							</div>
							<div className='info_area'>
								<p className='title_space'>{r.name}</p>
								<ul className='state_list'>
									<li className='date'>공간번호 {r.num}</li>
									<li className='date'>
										등록일 {r.writeday}
									</li>
									<li className='btn'>
										<Toggle
											checked={checked}
											setChecked={setChecked}
											updateStaus={updateStaus}
											num={r.num}
										/>
									</li>
								</ul>
							</div>
							<div className='btn_btnarea'></div>
						</div>
					</div>
				))}
			</div>
		</RoomList>
	);
}

export default SpaceList;

const RoomList = styled.div`
	background-color: #efefef;
`;
const BtnWrap = styled(Box)`
	display: flex;
	justify-content: center;
`;
const BtnNewAdd = styled(Button)`
	width: 850px;
	height: 60px;
`;
