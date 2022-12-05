import axios from 'axios';
import React, {useEffect, useState} from 'react';

function ReviewTag(props) {
	const [tagList, setTagList] = useState([]);

	//리뷰 리스트 가져오기
	const getTagList = () => {
		let url = localStorage.url + '/tagList?num=' + props.num;
		console.log('urlurlurlurlurlurl' + url);
		axios.get(url).then((res) => {
			console.log(res.data);

			setTagList(res.data);
		});
	};

	useEffect(() => {
		getTagList();
	}, []);

	return (
		<div style={{marginBottom: '10px'}}>
			{tagList &&
				tagList.slice(0, 2).map((data, idx) => (
					<span
						style={{
							marginRight: '5px',
							padding: '5px',
							border: '1.5px solid #6f42c1',
							borderRadius: '20px',
							color: '#6f42c1',
							fontSize: '12px',
						}}
					>
						#{data.tname}
					</span>
				))}
		</div>
	);
}

export default ReviewTag;
