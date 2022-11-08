import React, {useState} from 'react';
import './Review.css';

function ReviewList(props) {
	const [show, setShow] = useState(1);
	return (
		<div style={{width: '100%'}}>
			<div className='input-group'>
				<span
					className='reviewGuest'
					style={{
						color: show === 1 ? 'white' : '#949494',
						backgroundColor: show === 1 ? '#7B68EE' : '#ebebeb',
					}}
					onClick={() => {
						setShow(1);
					}}
				>
					이용후기
				</span>
				<span
					className='reviewGuest'
					style={{
						color: show === 2 ? 'white' : '#949494',
						backgroundColor: show === 2 ? '#7B68EE' : '#ebebeb',
					}}
					onClick={() => {
						setShow(2);
					}}
				>
					Q&A
				</span>
			</div>
			<br />
			<br />
		</div>
	);
}

export default ReviewList;
