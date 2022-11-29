import React from 'react';
import LikeList from './LikeList';

function Like(props) {
	return (
		<div>
			<div style={{marginTop: '30px', textAlign: 'center'}}>
				<b
					style={{
						borderBottom: '2px solid #ffd014',
						fontSize: '30px',
						paddingBottom: '5px',
					}}
				>
					찜한 공간
				</b>
			</div>
			<LikeList />
		</div>
	);
}

export default Like;
