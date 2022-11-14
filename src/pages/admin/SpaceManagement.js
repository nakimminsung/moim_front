import {SearchRounded} from '@material-ui/icons';
import React from 'react';

function SpaceManagement(props) {
	return (
		<div>
			<div
				className='spaceSearch'
				style={{
					width: '1000px',
					border: '1px solid gray',
					borderRadius: '10px',
				}}
			>
				<SearchRounded
					style={{
						fontSize: '30px',
						marginLeft: '10px',
						marginRight: '20px',
						cursor: 'pointer',
						color: 'gray',
					}}
				/>
				<input
					type={'text'}
					className='seacrhContainer'
					style={{
						width: '800px',
						height: '60px',
						marginTop: '3px',
						outline: 'none',
						border: 'none',
						backgroundColor: 'rgba(240, 242, 245)',
					}}
					placeholder='공간 이름 혹은 호스트명을 입력해주세요'
				/>
			</div>
		</div>
	);
}

export default SpaceManagement;
