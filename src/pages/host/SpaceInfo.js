import {Button, TextField} from '@material-ui/core';
import React, {useState} from 'react';

function SpaceInfo(props) {
	const {roomNum, onchange3, onchange4} = props;
	// console.log('optionroomNum=' + roomNum);
	localStorage.url = 'http://localhost:9000';

	return (
		<div>
			<h3>시설안내</h3>
			<div>
				<TextField
					id='info'
					style={{margin: 8, width: '800px'}}
					placeholder='게스트들이 선호할만한 주요 특징들을 키워드로 입력해주세요'
					InputLabelProps={{
						shrink: true,
					}}
					variant='outlined'
					size='small'
					onKeyUp={onchange4}
				/>
				<Button variant='contained' color='primary' onClick={onchange3}>
					추가
				</Button>
			</div>
		</div>
	);
}

export default SpaceInfo;
