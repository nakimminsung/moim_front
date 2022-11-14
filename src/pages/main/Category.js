import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Category(props) {
	const [category, setCategory] = useState('');
	const navi = useNavigate();

	const getCategoryList = () => {
		let url = localStorage.url + '/categoryList';

		axios.get(url).then((res) => {
			// console.log(res.data);

			var x = res.data;

			setCategory(x);

			// console.log(x.length);
		});
	};

	useEffect(() => {
		//카테고리 리스트
		getCategoryList();

		//공지사항 가져오기
	}, []);

	return (
		<div className='categoryBox' style={{ textAlign: 'center' }}>
			<h2 style={{ marginBottom: '50px', fontWeight: 'bold' }}>
				어떤 공간을 찾고있나요?
			</h2>

			{/* 카테고리 아이콘 영역 */}
			<div
				className='categoryCard'
				style={{
					display: 'flex',
					justifyContent: 'center', //정렬
					gap: '40px 2.5%', //다음 행(세로) 과의 간격 px, 같은 행의 다음 열 과의 간격 %
					flexWrap: 'wrap', //줄넘김
				}}
			>
				{/* 카테고리 img + 카테고리 name 을 묶은 div 반복 구간 */}
				{category &&
					category.map((row, idx) => (
						<div
							className='categoryCardInfo'
							key={row.num}
							style={{ cursor: 'pointer', width: '80px' }}
							onClick={() => {
								navi('/categoryroomList/' + row.num);
							}}
						>
							<img
								alt=''
								src={row.categoryImg}
								style={{
									width: '70px',
									marginBottom: '10px',
								}}
							/>
							<br />
							<span style={{}}>{row.cname}</span>
						</div>
					))}
				{/* 반복구간 종료 */}
			</div>
			{/* 카테고리 아이콘 영역 종료 */}
		</div>
	);
}

export default Category;
