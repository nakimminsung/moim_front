import React from 'react';
import ReportList from './ReportList';

function ReportManagement(props) {
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
					// value={sort}
					// onChange={handleChange}
				>
					<option value={'order by num desc'}>최신순</option>
					<option value={'where '}>호스트 신고</option>
					<option value={''}>게스트 신고</option>
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
