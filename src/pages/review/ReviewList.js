import React, {useState} from 'react';
import QNA from './QNA';
import Review from './Review';
import './Review.css';

function ReviewList(props) {
	const [show, setShow] = useState(1);
	return (
		<div className='reviewQnaGuest' style={{width: '100%'}}>
			<div style={{width: '100%', textAlign: 'center'}}>
				<h3>
					{show === 1 ? <b>이용후기관리</b> : <b> Q & A 관리 </b>}
				</h3>
				<br />
				<div className='input-group' style={{height: '40px'}}>
					<span
						className='reviewGuest'
						style={{
							color: show === 1 ? 'white' : '#949494',
							backgroundColor: show === 1 ? '#7B68EE' : '#ebebeb',
							lineHeight: '40px',
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
							lineHeight: '40px',
						}}
						onClick={() => {
							setShow(2);
						}}
					>
						Q&A
					</span>
				</div>
			</div>
			<br />

			{show === 1 ? <Review /> : <QNA />}
		</div>
	);
}

export default ReviewList;
