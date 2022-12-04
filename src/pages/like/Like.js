import React from 'react';
import LikeList from './LikeList';

function Like(props) {
	return (
		<div>
			<div style={{marginTop: '40px', textAlign: 'center'}}>
				<b
					style={{
						fontSize: '30px',
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
