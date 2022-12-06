import axios from 'axios';
import React, {useEffect, useState} from 'react';

function PopularHostSpace(props) {
	//인기있는 공간 리스트
	const [popularSpace, setPopularSpace] = useState('');

	//리스트 가져오기
	const getPopularSpace = () => {
		let url = localStorage.url + '/admin/popularSpace';

		axios.get(url).then((res) => {
			setPopularSpace(res.data);
		});
	};

	//시작할때 가져오기
	useEffect(() => {
		//getReviewList
		getPopularSpace();
	}, []);

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>순위</th>
						<th>호스트명</th>
						<th>공간 이름</th>
						<th>조회수</th>
					</tr>
				</thead>
				<tbody>
					{popularSpace &&
						popularSpace.map((data, idx) => (
							<tr key={idx}>
								<td>{idx + 1}</td>
								<td>{data.companyName}</td>
								<td>{data.name}</td>
								<td>{data.readCount}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}

export default PopularHostSpace;
