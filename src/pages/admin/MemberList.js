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
					<table>
						<thead style={{textAlign: 'center'}}>
							<tr>
								<th>번호</th>
								<th>이메일</th>
								<th>회원명</th>
								<th>회원가입일</th>
								<th>정보수정일</th>
								<th>기타</th>
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
										<td>{row.created_at}</td>
										<td>{row.updated_at}</td>
										<td>공란</td>
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
