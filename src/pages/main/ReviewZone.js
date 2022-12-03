import {Rating} from '@mui/material';
import axios from 'axios';
import React, {useEffect, useState} from 'react';

function ReviewZone(props) {
	const [review, setReview] = useState('');

	const getReviewList = () => {
		let url = localStorage.url + '/reviewList';

		axios.get(url).then((res) => {
			var s = res.data;
			// console.log(s);
			setReview(s);
		});
	};

	useEffect(() => {
		//getReviewList
		getReviewList();
	}, []);

	return (
		<div className='reviewArea' style={{textAlign: 'center'}}>
			<h2>
				<b>리뷰 ZONE</b>
			</h2>
			<h6 style={{color: 'gray', fontWeight: '500'}}>
				이용자들의 생생한 후기를 만나보세요!
			</h6>
			<br />

			{/* 리스트 전체 div */}
			<div
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between',
					flexWrap: 'wrap',
				}}
			>
				{review &&
					review.map((data, idx) => (
						<div
							style={{
								width: '24%',
								border: '1px solid lightgray',
								borderRadius: '5px',
								// width: '350px',
								cursor: 'pointer',
								// marginLeft: '22px',
								// marginRight: '22px',
								marginBottom: '20px',
							}}
							key={idx}
						>
							<img
								alt=''
								src={data.reviewImageUrl}
								style={{
									width: '100%',
									minHeight: '200px',
									maxHeight: '250px',
									borderRadius: '5px',
								}}
							/>
							<br />
							<span
								style={{
									borderRadius: '20px',
									border: '1px solid #6f42c1',
									color: '#6f42c1',
									fontSize: '12px',
									fontWeight: 'bold',
									padding: '3px 3px 3px 3px',
								}}
							>
								태그1
							</span>
							<br />
							<span>
								<b>지상 3층 커먼스튜디오 2호점</b>
								{/* roomNum 에 해당하는 roomName을 가져와야됨 */}
							</span>
							<br />
							<span>3,500 원/시간</span>
							<br />

							<Rating
								name='half-rating-read'
								style={{
									color: '#704de4',
								}}
								value={data.rating}
								precision={1}
								readOnly
							/>
							<br />
							<span>{data.content}</span>
						</div>
					))}
			</div>
			{/* 리스트 전체 div */}
		</div>
	);
}

export default ReviewZone;
