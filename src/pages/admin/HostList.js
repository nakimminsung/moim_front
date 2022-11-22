import axios from 'axios';
import React, {useEffect} from 'react';

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
								<th>활성 상태</th>
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
								hostList.map((row, idx) => (
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
														alert('취소하셨습니다');
													}
												}}
											>
												차단 해제
											</button>
										</td>
										<td>
											<button
												type='button'
												className='btn btn-dark'
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
														alert('취소하셨습니다');
													}
												}}
											>
												초기화
											</button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default HostList;
