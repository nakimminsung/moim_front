import React from 'react';
import {useParams} from 'react-router-dom';

function DetailReview(props) {
	const {num} = useParams();

	return (
		<div>
			<div id='6' style={{marginTop: '100px'}}>
				<b style={{borderBottom: '2px solid #ffd014'}}>
					이용후기 개 • 평균평점 점
				</b>
				<br />
				<br />
			</div>
			<div style={{marginTop: '100px'}}>
				<b style={{borderBottom: '2px solid #ffd014'}}>
					호스트의 다른 공간
				</b>
				<br />
				<br />
			</div>
		</div>
	);
}

export default DetailReview;
