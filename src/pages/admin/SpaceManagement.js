import {SearchRounded} from '@material-ui/icons';
import React from 'react';

function SpaceManagement(props) {
	return (
		<div>
			<div
				className='spaceSearch'
				style={{
					width: '100%',
					// border: '1px solid gray',
					border: 'none',
					borderRadius: '10px',
					backgroundColor: 'white',
					boxShadow: '0px 2px 2px 1px rgba(0 0 0 / 10%)',
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
						width: '90%',
						height: '60px',
						marginTop: '3px',
						outline: 'none',
						border: 'none',
						// backgroundColor: 'rgba(240, 242, 245)',
						backgroundColor: 'white',
					}}
					placeholder='공간 이름 혹은 호스트명을 입력해주세요'
				/>
			</div>
		</div>
	);
}

export default SpaceManagement;
