import {Button, TextField} from '@material-ui/core';
import React, {useEffect, useState} from 'react';

function SpaceTag(props) {
	const {roomNum, onchange1, onchange2} = props;
	// const roomNum = props.roomNum;
	// console.log('optionroomNum=' + roomNum);

	return (
		<div>
			<h3>공간 태그</h3>
			<div>
				<TextField
					id='tag'
					style={{margin: 8, width: '800px'}}
					placeholder='게스트들이 선호할만한 주요 특징들을 키워드로 입력해주세요'
					InputLabelProps={{
						shrink: true,
					}}
					variant='outlined'
					size='small'
					onKeyUp={onchange2}
				/>
				<Button variant='contained' color='primary' onClick={onchange1}>
					추가
				</Button>
			</div>
		</div>
	);
}

export default SpaceTag;
