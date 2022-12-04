import {Button, TextField} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

function SpaceTag(props) {
	const {roomNum, onchange1, onchange2} = props;
	// const roomNum = props.roomNum;
	// console.log('optionroomNum=' + roomNum);

	return (
		<div style={{display: 'flex', alignItems: 'center'}}>
			<TextField
				id='tag'
				style={{marginTop: '5px', width: '100%'}}
				placeholder='게스트들이 선호할만한 주요 특징들을 키워드로 입력해주세요'
				InputLabelProps={{
					shrink: true,
				}}
				variant='outlined'
				size='small'
				onKeyUp={onchange2}
			/>
			<BtnBox>
				<BtnLabel>
					<div onClick={onchange1}>추가</div>
				</BtnLabel>
			</BtnBox>
		</div>
	);
}

export default SpaceTag;
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
