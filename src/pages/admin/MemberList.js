import axios from 'axios';
import React, {useEffect} from 'react';

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

		axios.get(url).then((res) => {
			setMemberList(res.data);
		});
	};

	useEffect(() => {
		//멤버 리스트 가져오기
		getMemberList();
	}, [sort, searchWord]);

	return (
		<div>
			<div style={{marginTop: '20px', width: '100%'}}>
				<div className='memberTable'>
					<table style={{width: '100%'}}>
						<thead style={{textAlign: 'center'}}>
							<tr>
								<th style={{width: '5%'}}>번호</th>
								<th style={{width: '30%'}}>이메일</th>
								<th style={{width: '10%'}}>회원명</th>
								<th style={{width: '10%'}}>회원 등급</th>
								<th style={{width: '15%'}}>회원가입일</th>
								<th style={{width: '10%'}}>활성 상태</th>
								<th style={{width: ''}}>활성 여부</th>
								<th style={{width: ''}}>비번 초기화</th>
							</tr>
						</thead>
						<tbody>
							{memberList.length === 0 ? (
								//데이터가 없을때
								<tr>
									<td
										colSpan={6}
										style={{textAlign: 'center'}}
									>
										<h5>등록된 회원이 없습니다</h5>
									</td>
								</tr>
							) : (
								//데이터가 있을때
								// memberList &&
								memberList.map((row, idx) => (
									<tr key={idx}>
										<td>{idx + 1}</td>
										<td>{row.email}</td>
										<td>{row.nickname}</td>
										<td>{row.grade}</td>
										<td>{row.created_at}</td>
										<td>{row.status}</td>
										<td>
											<button
												type='button'
												className='btn btn-secondary'
											>
												상태 변경
											</button>
										</td>
										<td>
											<button
												type='button'
												className='btn btn-dark'
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

export default MemberList;
