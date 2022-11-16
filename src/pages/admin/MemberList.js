import axios from 'axios';
import React, {useEffect, useState} from 'react';

function MemberList(props) {
	const [memberList, setMemberList] = useState('');

	const getMemberList = () => {
		let url = localStorage.url + '/admin/memberList';

		// console.log(url);

		axios.get(url).then((res) => {
			// console.log(res.data);

			var x = res.data;

			setMemberList(x);

			// console.log(x.length);
		});
	};

	useEffect(() => {
		//멤버 리스트 가져오기
		getMemberList();
	}, []);

	return (
		<div>
			<div style={{marginTop: '20px', width: '100%'}}>
				<br />
				<p>
					<b>총 게스트 회원 : </b>
				</p>
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
							{/* 카테고리 img + 카테고리 name 을 묶은 div 반복 구간 */}
							{memberList &&
								memberList.map((row, idx) => (
									<tr key={idx}>
										<td>{idx + 1}</td>
										<td>{row.email}</td>
										<td>{row.nickname}</td>
										<td>{row.created_at}</td>
										<td>{row.updated_at}</td>
										<td>공란</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default MemberList;
