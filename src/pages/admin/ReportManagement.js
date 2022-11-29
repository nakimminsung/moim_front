import React, {useState} from 'react';
import ReportList from './ReportList';

function ReportManagement(props) {
	const [sort, setSort] = useState('order by num desc');

	//Select Option 에 따른 값 변경 (set Sort)
	const handleChange = (e) => {
		console.log(e.target.value);
		setSort(e.target.value);
	};

	return (
		<div style={{width: '100%'}}>
			<div
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<b style={{marginTop: '10px'}}>조회된 게시글 : 개</b>
				<select
					style={{
						width: '100px',
						height: '37px',
						borderRadius: '5px',
					}}
					value={sort}
					onChange={handleChange}
				>
					<option value={'order by num desc'}>최신순</option>
					<option value={'where status = "신고 접수"'}>
						신고 접수
					</option>
					<option value={'where status = "처리 완료"'}>
						처리 완료
					</option>
				</select>
			</div>

			<div style={{width: '100%'}}>
				{/* 신고 목록 */}
				<ReportList />
			</div>
		</div>
	);
}

export default ReportManagement;
