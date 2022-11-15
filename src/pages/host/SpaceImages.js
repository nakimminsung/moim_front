import {Button} from '@material-ui/core';
import {CloseOutlined} from '@material-ui/icons';
import axios from 'axios';
import React, {useState} from 'react';

function SpaceImages(props) {
	const {roomNum, photoUploadEvent2} = props;
	// console.log('optionroomNum=' + roomNum);
	localStorage.url = 'http://localhost:9000';

	return (
		<div>
			<div className='previewimg'>
				<div className='input-group'>
					<h3>방에 대한 사진을 등록해주세요</h3>
					<div>
						<input
							type='file'
							id='filephoto2'
							multiple
							style={{visibility: 'hidden'}}
							onChange={photoUploadEvent2}
						/>
						<span
							onClick={() => {
								document.getElementById('filephoto2').click();
							}}
						>
							<b style={{cursor: 'pointer'}}>사진 추가</b>
						</span>
					</div>
				</div>
				<br />
			</div>
		</div>
	);
}

export default SpaceImages;
