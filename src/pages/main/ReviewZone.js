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
			<h3>
				<b>리뷰 ZONE</b>
			</h3>
			<h6 style={{color: 'gray'}}>
				이용자들의 생생한 후기를 만나보세요!
			</h6>

			{/* 리스트 전체 div */}
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-around',
				}}
			>
				{review &&
					review.map((data, idx) => (
						<div
							style={{
								border: '1px solid lightgray',
								borderRadius: '5px',
								width: '350px',
								cursor: 'pointer',
								// marginLeft: '22px',
								// marginRight: '22px',
								marginBottom: '30px',
							}}
							key={idx}
						>
							<img
								alt=''
								src={data.reviewImageUrl}
								style={{
									width: '100%',
									height: '300px',
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
							<span style={{color: '#6f42c1'}}>
								★x{data.rating}
							</span>
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
