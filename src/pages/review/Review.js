import React from 'react';

function Review(props) {
	return (
		<div>
			<div className='searchBNum'>
				<span style={{fontSize: '13px'}}>예약 정보 검색</span>
				&nbsp;&nbsp;&nbsp;&nbsp;
				<input
					type={'text'}
					placeholder='예약번호'
					style={{border: '1px solid #dcdcdc', width: '70%'}}
				/>
				&nbsp;&nbsp;&nbsp;&nbsp;
				<button
					style={{
						width: '10%',
						height: '30px',
						backgroundColor: '#7b68ee',
						border: 'none',
						color: 'white',
					}}
				>
					검색
				</button>
			</div>
			<br />
			<br />
			dd
		</div>
	);
}

export default Review;
