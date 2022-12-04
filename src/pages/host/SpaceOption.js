import {Button, TextField} from '@material-ui/core';
import axios from 'axios';
import React, {useState} from 'react';
import styled from 'styled-components';

function SpaceOption(props) {
	const {
		roomNum,
		photoUploadEvent3,
		optionButton,
		NameRef,
		PriceRef,
		oimageUrl,
		onload,
	} = props;
	// console.log('optionroomNum=' + roomNum);
	localStorage.url = 'http://localhost:9000';
	let imageUrl = localStorage.url + '/image/';
	return (
		<div style={{marginTop: '20px', width: '100%'}}>
			<table style={{width: '100%'}}>
				<thead style={{textAlign: 'center'}}>
					<tr style={{backgroundColor: '#efefef'}}>
						<th style={{width: '25%'}}>사진</th>
						<th style={{width: '25%'}}>이름</th>
						<th style={{width: '25%'}}>가격</th>
						<th style={{width: '25%'}}>버튼</th>
					</tr>
				</thead>
				<tbody>
					<td style={{textAlign: 'center'}}>
						<label style={{cursor: 'pointer'}}>
							{!onload && <div>파일첨부</div>}
							<input
								type='file'
								id='roption1'
								style={{
									visibility: 'hidden',
									display: 'none',
								}}
								onChange={photoUploadEvent3}
								required
								onClick={() => {
									document.getElementById('roption1').click();
								}}
							/>
						</label>
						<img
							alt=''
							src={imageUrl + oimageUrl}
							style={{maxWidth: '150px'}}
						/>
					</td>
					<td>
						<TextField
							id='roption2'
							style={{margin: 8, width: '400px'}}
							placeholder='옵션을 입력해주세요'
							InputLabelProps={{
								shrink: true,
							}}
							variant='outlined'
							size='small'
							inputRef={NameRef}
						/>
					</td>
					<td>
						<TextField
							id='roption3'
							type='number'
							style={{margin: 8, width: '400px'}}
							placeholder='가격을 입력해주세요'
							InputLabelProps={{
								shrink: true,
							}}
							variant='outlined'
							size='small'
							inputRef={PriceRef}
						/>
					</td>
					<td style={{textAlign: 'center'}}>
						<Button
							variant='contained'
							color='primary'
							onClick={optionButton}
						>
							추가
						</Button>
					</td>
				</tbody>
			</table>
		</div>
	);
}

export default SpaceOption;

const IcoRequired = styled.span`
	vertical-align: top;
	color: #ff3a48;
	font-size: 20px;
`;

const BtnBox = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	margin-left: 10px;
	overflow: hidden;
	width: 154px;
	line-height: 50px;
`;

const BtnLabel = styled.label`
	cursor: pointer;
	display: block;
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
