import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Pagination from 'react-js-pagination';

function HostList(props) {
	const {hostList, setHostList} = props;
	const {sort, searchWord} = props;

	const getHostList = () => {
		let url =
			localStorage.url +
			'/admin/hostList?searchWord=' +
			searchWord +
			'&sort=' +
			sort;

		console.log(url);

		axios.get(url).then((res) => {
			setHostList(res.data);
		});
	};

	useEffect(() => {
		//멤버 리스트 가져오기
		getHostList();
	}, [sort, searchWord]);

	//페이징 처리 - pagenation
	const [page, setPage] = useState(1);

	//한번에 보여질 아이템 수
	let items = 8;

	//페이지 변경 이벤트
	const handlePageChange = (page) => {
		setPage(page);
	};

	return (
		<div>
			<div style={{marginTop: '20px', width: '100%'}}>
				<div className='hostTable'>
					<table style={{width: '100%'}}>
						<thead style={{textAlign: 'center'}}>
							<tr>
								<th style={{width: '5%'}}>번호</th>
								<th style={{width: '20%'}}>이메일</th>
								<th style={{width: '15%'}}>호스트명</th>
								<th style={{width: '15%'}}>회원가입일</th>
								<th>경고 누적</th>
								<th style={{width: '8%'}}>활성 상태</th>
								<th>정지/활성화</th>
								<th style={{width: '10%'}}>경고 초기화</th>
								<th style={{width: '10%'}}>비번 초기화</th>
							</tr>
						</thead>
						<tbody>
							{hostList.length === 0 ? (
								//데이터가 없을때
								<tr>
									<td
										colSpan={8}
										style={{textAlign: 'center'}}
									>
										<h5>등록된 회원이 없습니다</h5>
									</td>
								</tr>
							) : (
								//데이터가 있을때
								// memberList &&
								hostList

									.map((row, idx) => (
										<tr key={idx}>
											<td>{idx + 1}</td>
											<td>{row.email}</td>
											<td>{row.companyName}</td>
											<td>{row.createdAt}</td>
											<td>{row.warningCount}</td>
											<td>
												{row.active === 0 ? (
													<span
														style={{
															padding: '5px',
															borderRadius: '5px',
															color: 'white',
															backgroundColor:
																'rgb(102, 187, 106)',
														}}
													>
														Active
													</span>
												) : (
													<span
														style={{
															padding: '5px',
															borderRadius: '5px',
															color: 'white',
															backgroundColor:
																'black',
														}}
													>
														inactive
													</span>
												)}
											</td>
											<td>
												<button
													type='button'
													className='btn btn-outline-secondary'
													value={row.num}
													onClick={(e) => {
														if (
															window.confirm(
																'상태를 변경하시겠습니까?',
															)
														) {
															//예
															let url =
																localStorage.url +
																'/admin/hostActive?hostNum=' +
																e.target.value;

															axios
																.get(url)
																.then((res) => {
																	alert(
																		'상태 변경 완료',
																	);
																	// window.location.reload();
																	getHostList();
																});
														} else {
															//아니오
															alert(
																'취소하셨습니다',
															);
														}
													}}
												>
													변경
												</button>
											</td>
											<td>
												<button
													type='button'
													className='btn btn-outline-secondary'
													value={row.num}
													onClick={(e) => {
														if (
															window.confirm(
																'경고 누적을 초기화 하시겠습니까?',
															)
														) {
															//예
															let url =
																localStorage.url +
																'/admin/hostWCount?hostNum=' +
																e.target.value;

															axios
																.get(url)
																.then((res) => {
																	alert(
																		'경고 누적 초기화 완료',
																	);
																	window.location.reload();
																});
														} else {
															//아니오
															alert(
																'취소하셨습니다',
															);
														}
													}}
												>
													초기화
												</button>
											</td>
											<td>
												<button
													type='button'
													className='btn btn-outline-dark'
													value={row.num}
													onClick={(e) => {
														if (
															window.confirm(
																'비밀번호를 초기화하시겠습니까?',
															)
														) {
															//예
															let url =
																localStorage.url +
																'/admin/hostPass?hostNum=' +
																e.target.value;

															axios
																.get(url)
																.then((res) => {
																	alert(
																		' 비번 초기화 완료',
																	);
																	window.location.reload();
																});
														} else {
															//아니오
															alert(
																'취소하셨습니다',
															);
														}
													}}
												>
													초기화
												</button>
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
						itemsCountPerPage={8} // 한 페이지에 출력할 아이템 수
						totalItemsCount={hostList.length} // 총 아이템 수
						pageRangeDisplayed={5} // 표시할 아이템 수
						prevPageText={'‹'}
						nextPageText={'›'}
						onChange={handlePageChange}
					/>
				</div>
			</div>
		</div>
	);
}

export default HostList;
