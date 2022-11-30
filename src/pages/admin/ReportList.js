import axios from 'axios';
import React, {useEffect} from 'react';
import ReportDetail from './ReportDetail';

function ReportList(props) {
	const {sort, reportList, setReportList} = props;

	//신고 DB list 가져오기
	const getReportList = () => {
		let url = localStorage.url + '/admin/reportList?sort=' + sort;

		axios.get(url).then((res) => {
			setReportList(res.data);
		});
	};

	useEffect(() => {
		//리스트 가져오기
		getReportList();
	}, [sort]); //상위 컴포넌트에서 sort 값이 바뀔때마다

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
						{reportList.length === 0 ? (
							//데이터가 없을때
							<tr>
								<td colSpan={7} style={{textAlign: 'center'}}>
									<h5>등록된 게시글이 없습니다</h5>
								</td>
							</tr>
						) : (
							reportList &&
							reportList.map((row, idx) => (
								<tr style={{verticalAlign: 'middle'}} key={idx}>
									<td>{idx + 1}</td>
									<td>{row.type}</td>
									<td>
										{row.roomNum != null
											? '공간 상세정보'
											: row.QnANum != null
											? 'QnA'
											: ''}
									</td>
									<td>{row.nickname}</td>
									<td>{row.companyName}</td>
									<td>{row.writeday}</td>
									<td>
										<ReportDetail num={row.num} />
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default ReportList;
