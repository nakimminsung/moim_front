import React from 'react';

function SuggestRoom(props) {
	return (
		<div className='themeArea' style={{textAlign: 'center'}}>
			<h3>
				<b>오늘의 추천 공간</b>
			</h3>
			<h6 style={{color: 'gray'}}>뜨기 전에 먼저 예약하세요!</h6>
			<br />

			<div style={{display: 'flex', justifyContent: 'space-around'}}>
				<div
					style={{
						border: '1px solid lightgray',
						borderRadius: '5px',
						width: '30%',
					}}
				>
					<img
						alt=''
						src=''
						style={{width: '100%', height: '300px'}}
					/>
					<br />
					<p>
						<b>room name</b>
					</p>
					<p>room place</p>
					<p>room tag list</p>
					<span>room Price</span>&emsp;&emsp;&emsp;
					<span>max inwon / review / wish</span>
				</div>

				<div
					style={{
						border: '1px solid lightgray',
						borderRadius: '5px',
						width: '30%',
					}}
				>
					<img
						alt=''
						src=''
						style={{
							width: '100%',
							height: '300px',
						}}
					/>
					<br />
					<p>
						<b>room name</b>
					</p>
					<p>room place</p>
					<p>room tag list</p>
					<span>room Price</span>&emsp;&emsp;&emsp;
					<span>max inwon / review / wish</span>
				</div>

				<div
					style={{
						border: '1px solid lightgray',
						borderRadius: '5px',
						width: '30%',
					}}
				>
					<img
						alt=''
						src=''
						style={{width: '100%', height: '300px'}}
					/>
					<br />
					<p>
						<b>room name</b>
					</p>
					<p>room place</p>
					<p>room tag list</p>
					<span>room Price</span>&emsp;&emsp;&emsp;
					<span>max inwon / review / wish</span>
				</div>
			</div>
		</div>
	);
}

export default SuggestRoom;
