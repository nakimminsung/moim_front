import {Button} from '@material-ui/core';
import {CloseOutlined} from '@material-ui/icons';
import axios from 'axios';
import React, {useState} from 'react';
import styled from 'styled-components';

function SpaceImages(props) {
	const {roomNum, photoUploadEvent2} = props;
	// console.log('optionroomNum=' + roomNum);
	localStorage.url = 'http://localhost:9000';

	return (
		<div>
			<div className='previewimg'>
				<div>
					<BtnBox>
						<BtnLabel>
							<div>파일첨부</div>
							<input
								type='file'
								id='filephoto2'
								multiple
								style={{
									visibility: 'hidden',
									display: 'none',
								}}
								onChange={photoUploadEvent2}
								required
								onClick={() => {
									document
										.getElementById('filephoto2')
										.click();
								}}
							/>
						</BtnLabel>
					</BtnBox>
				</div>
				<br />
			</div>
		</div>
	);
}

export default SpaceImages;

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
