import axios from 'axios';
import React, {useEffect, useState} from 'react';
import ReportDetail from './ReportDetail';

import Pagination from 'react-js-pagination';

function ReportList(props) {
	const {sort, searchWord, reportList, setReportList} = props;

	//신고 DB list 가져오기
	const getReportList = () => {
		let url =
			localStorage.url +
			'/admin/reportList?sort=' +
			sort +
			'&searchWord=' +
			searchWord;

		axios.get(url).then((res) => {
			setReportList(res.data);
			// console.log(res.data);
		});
	};

	useEffect(() => {
		//리스트 가져오기
		getReportList();
	}, [sort, searchWord]); //상위 컴포넌트에서 sort 값이 바뀔때마다

	//페이징 처리 - pagenation
	const [page, setPage] = useState(1);

	//한번에 보여질 아이템 수
	let items = 10;

	//페이지 변경 이벤트
	const handlePageChange = (page) => {
		setPage(page);
	};

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
							{/* <th style={{width: '10%'}}>접수 경로</th> */}
							<th>신고 유저</th>
							<th>대상 호스트</th>
							<th>진행 상태</th>
							<th style={{width: '15%'}}>접수 일자</th>
							<th style={{width: '15%'}}>수정 일자</th>
							<th style={{width: '10%'}}>상세 내용</th>
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
							reportList

								.map((row, idx) => (
									<tr
										style={{verticalAlign: 'middle'}}
										key={idx}
									>
										<td>{idx + 1}</td>
										<td>{row.type}</td>
										{/* <td>
										{row.qnaNum != 0 ? 'Q&A' : '공간 정보'}
									</td> */}
										<td>
											{row.nickname} (
											{row.memail.length > 4
												? row.memail.substr(0, 5) +
												  '...'
												: row.memail}
											)
										</td>
										<td>
											{row.companyName} (
											{row.hemail.length > 4
												? row.hemail.substr(0, 5) +
												  '...'
												: row.hemail}
											)
										</td>
										<td>{row.status}</td>
										<td>{row.writeday.substr(0, 10)}</td>
										<td>{row.finishday}</td>
										<td>
											<ReportDetail num={row.num} />
										</td>
									</tr>
								))
								.slice(
									items * (page - 1),
									items * (page - 1) + items,
								)
						)}
					</tbody>
				</table>
			</div>

			{/* 페이지네이션 생기는 위치 */}
			<div className='pageDiv'>
				<Pagination
					activePage={page} // 현재 보고있는 페이지
					itemsCountPerPage={10} // 한 페이지에 출력할 아이템 수
					totalItemsCount={reportList.length} // 총 아이템 수
					pageRangeDisplayed={5} // 표시할 아이템 수
					prevPageText={'‹'}
					nextPageText={'›'}
					onChange={handlePageChange}
				/>
			</div>
		</div>
	);
}

export default ReportList;
