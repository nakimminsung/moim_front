import {Button, TextField} from '@material-ui/core';
import React, {useState} from 'react';
import styled from 'styled-components';

function SpaceWarning(props) {
	const {roomNum, onchange5, onchange6} = props;
	// console.log('optionroomNum=' + roomNum);
	localStorage.url = 'http://localhost:9000';
	return (
		<div style={{display: 'flex', alignItems: 'center'}}>
			<TextField
				id='precautions'
				style={{marginTop: '5px', width: '100%'}}
				placeholder='게스트들이 예약 시 확인해야 하는 주의사항을 상세하게 입력해주세요'
				InputLabelProps={{
					shrink: true,
				}}
				variant='outlined'
				size='small'
				onKeyUp={onchange6}
			/>
			<BtnBox>
				<BtnLabel>
					<div onClick={onchange5}>추가</div>
				</BtnLabel>
			</BtnBox>
		</div>
	);
}

export default SpaceWarning;
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
