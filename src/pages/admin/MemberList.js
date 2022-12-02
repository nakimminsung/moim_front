import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Pagination from 'react-js-pagination';

function MemberList(props) {
	const {memberList, setMemberList} = props;
	const {sort, searchWord} = props;

	const getMemberList = () => {
		let url =
			localStorage.url +
			'/admin/memberList?searchWord=' +
			searchWord +
			'&sort=' +
			sort;

		console.log(url);

		axios.get(url).then((res) => {
			setMemberList(res.data);
		});
	};

	useEffect(() => {
		//멤버 리스트 가져오기
		getMemberList();
	}, [sort, searchWord]);

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
			<div style={{marginTop: '20px', width: '100%'}}>
				<div className='memberTable'>
					<table style={{width: '100%'}}>
						<thead style={{textAlign: 'center'}}>
							<tr>
								<th style={{width: '5%'}}>번호</th>
								<th style={{width: '20%'}}>이메일</th>
								<th style={{width: '8%'}}>회원명</th>
								<th style={{width: '10%'}}>회원 등급</th>
								<th style={{width: '10%'}}>가입 유형</th>
								<th style={{width: '15%'}}>회원가입일</th>
								<th style={{width: '10%'}}>활성 상태</th>
								<th style={{width: ''}}>정지/활성화</th>
								<th style={{width: ''}}>비번 초기화</th>
							</tr>
						</thead>
						<tbody>
							{memberList.length === 0 ? (
								//데이터가 없을때
								<tr>
									<td
										colSpan={9}
										style={{textAlign: 'center'}}
									>
										<h5>등록된 회원이 없습니다</h5>
									</td>
								</tr>
							) : (
								//데이터가 있을때
								// memberList &&
								memberList

									.map((row, idx) => (
										<tr key={idx}>
											<td>{idx + 1}</td>
											<td>{row.email}</td>
											<td>{row.nickname}</td>
											<td>{row.grade}</td>
											<td>
												{row.password.startsWith(
													'naver',
												)
													? '네이버'
													: row.password.startsWith(
															'kakao',
													  )
													? '카카오'
													: '일반'}
											</td>
											<td>{row.created_at}</td>
											<td>
												{row.status === 0 ? (
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
														Inactive
													</span>
												)}
											</td>
											<td>
												{row.email === 'admin' ? (
													'관리자'
												) : (
													<button
														type='button'
														className='btn btn-outline-secondary'
														value={row.idx}
														onClick={(e) => {
															//confirm alert
															if (
																window.confirm(
																	'상태를 변경하시겠습니까?',
																)
															) {
																//예
																//url에 num값 저장
																let url =
																	localStorage.url +
																	'/admin/memberActive?userNum=' +
																	e.target
																		.value;

																//Back-End로 url 넘김
																axios
																	.get(url)
																	.then(
																		(
																			res,
																		) => {
																			alert(
																				'변경 완료',
																			);
																			// window.location.reload();
																			getMemberList();
																		},
																	);
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
												)}
											</td>
											<td>
												{row.email === 'admin' ? (
													'관리자'
												) : row.password.startsWith(
														'naver',
												  ) ? (
													'소셜회원'
												) : row.password.startsWith(
														'kakao',
												  ) ? (
													'소셜회원'
												) : (
													<button
														type='button'
														className='btn btn-outline-dark'
														value={row.idx}
														onClick={(e) => {
															if (
																window.confirm(
																	'비밀번호를 초기화하시겠습니까?',
																)
															) {
																//예
																let url =
																	localStorage.url +
																	'/admin/memberPassReset?userNum=' +
																	e.target
																		.value;

																axios
																	.get(url)
																	.then(
																		(
																			res,
																		) => {
																			alert(
																				' 비번 초기화 완료',
																			);
																			window.location.reload();
																		},
																	);
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
												)}
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
			</div>
			{/* 페이지네이션 생기는 위치 */}
			<div className='pageDiv'>
				<Pagination
					activePage={page} // 현재 보고있는 페이지
					itemsCountPerPage={8} // 한 페이지에 출력할 아이템 수
					totalItemsCount={memberList.length} // 총 아이템 수
					pageRangeDisplayed={5} // 표시할 아이템 수
					prevPageText={'‹'}
					nextPageText={'›'}
					onChange={handlePageChange}
				/>
			</div>
		</div>
	);
}

export default MemberList;
