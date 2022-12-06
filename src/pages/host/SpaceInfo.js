import {Button, TextField} from '@material-ui/core';
import React, {useState} from 'react';
import styled from 'styled-components';

function SpaceInfo(props) {
	const {roomNum, onchange3, onchange4} = props;
	// console.log('optionroomNum=' + roomNum);
	localStorage.url = 'http://localhost:9000';

	return (
		<div style={{display: 'flex', alignItems: 'center'}}>
			<TextField
				id='info'
				style={{marginTop: '5px', width: '100%'}}
				placeholder='이용 가능한 시설에 대해 최대한 상세하게 입력해주세요.'
				InputLabelProps={{
					shrink: true,
				}}
				variant='outlined'
				size='small'
				onKeyUp={onchange4}
			/>
			<BtnBox>
				<BtnLabel>
					<div onClick={onchange3}>추가</div>
				</BtnLabel>
			</BtnBox>
		</div>
	);
}

export default SpaceInfo;
const BtnBox = styled.div`
	margin-left: 10px;
	overflow: hidden;
	width: 154px;
	line-height: 50px;
`;

const BtnLabel = styled.label`
	cursor: pointer;
	background-color: #704de4;
	border: 0;
	color: #fff;
	text-align: center;
	border-radius: 0;
	width: 100%;
	height: 100%;
	font-size: 20px;
	line-height: 50px;
`;
