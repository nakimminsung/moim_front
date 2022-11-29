import React from 'react';
import ReportDetail from './ReportDetail';

function ReportList(props) {
	return (
		<div>
			<div
				className='reportTable'
				style={{width: '100%', marginTop: '20px'}}
			>
				<table style={{width: '100%'}}>
					<thead>
						<tr>
							<th style={{width: '5%'}}>번호</th>
							<th style={{width: '15%'}}>신고 유형</th>
							<th style={{width: '15%'}}>접수 경로</th>
							<th style={{width: '20%'}}>신고 유저</th>
							<th style={{width: '20%'}}>대상 호스트</th>
							<th style={{width: '15%'}}>접수 일자</th>
							<th style={{width: '10%'}}>비고</th>
						</tr>
					</thead>
					<tbody>
						{/* 반복 구간 */}
						<tr>
							<td>1</td>
							<td>1</td>
							<td>1</td>
							<td>1</td>
							<td>1</td>
							<td>1</td>
							<td>
								<ReportDetail />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default ReportList;
