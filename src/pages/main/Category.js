import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

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
		<div className='categoryBox' style={{textAlign: 'center'}}>
			<h2 style={{marginBottom: '50px'}}>
				<b>어떤 공간을 찾고있나요?</b>
			</h2>

			{/* 카테고리 아이콘 영역 */}
			<div
				className='categoryCard'
				style={{
					display: 'flex',
					justifyContent: 'space-between', //정렬
					gap: '40px 1%', //다음 행(세로) 과의 간격 px, 같은 행의 다음 열 과의 간격 %
					flexWrap: 'wrap', //줄넘김

					width: '100%',
				}}
			>
				{/* 카테고리 img + 카테고리 name 을 묶은 div 반복 구간 */}
				{category &&
					category.map((row, idx) => (
						<CategoryObject
							className='categoryCardInfo'
							key={row.num}
							style={{
								cursor: 'pointer',
							}}
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
									minWidth: '70px',
								}}
							/>
							<br />
							<span style={{}}>{row.cname}</span>
						</CategoryObject>
					))}
				{/* 반복구간 종료 */}
			</div>
			{/* 카테고리 아이콘 영역 종료 */}
		</div>
	);
}

export default Category;

const CategoryObject = styled.div`
	@media (max-width: 1920px) {
		width: 9%;
	}
	@media (max-width: 1680px) {
		width: 9%;
	}
	@media (max-width: 1000px) {
		width: 17%;
	}
	@media (max-width: 900px) {
		width: 17%;
	}
`;
