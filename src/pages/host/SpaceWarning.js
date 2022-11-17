import {Button, TextField} from '@material-ui/core';
import React, {useState} from 'react';

function SpaceWarning(props) {
	const {roomNum, onchange5, onchange6} = props;
	// console.log('optionroomNum=' + roomNum);
	localStorage.url = 'http://localhost:9000';
	return (
		<div>
			<h3>예약시 주의사항</h3>
			<div>
				<TextField
					id='precautions'
					style={{margin: 8, width: '800px'}}
					placeholder='게스트들이 예약 시 확인해야 하는 주의사항을 상세하게 입력해주세요'
					InputLabelProps={{
						shrink: true,
					}}
					variant='outlined'
					size='small'
					onKeyUp={onchange6}
				/>
				<Button variant='contained' color='primary' onClick={onchange5}>
					추가
				</Button>
			</div>
		</div>
	);
}

export default SpaceWarning;
