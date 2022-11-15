import {SearchRounded} from '@material-ui/icons';
import axios from 'axios';
import React, {useEffect, useState} from 'react';

function MemberManagement(props) {
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
			{/* 검색 */}
			<div
				className='memberSearch'
				style={{
					width: '100%',
					// border: '1px solid gray',
					border: 'none',
					borderRadius: '10px',
					backgroundColor: 'white',
					boxShadow: '0px 2px 2px 1px rgba(0 0 0 / 10%)',
				}}
			>
				<SearchRounded
					style={{
						fontSize: '30px',
						marginLeft: '10px',
						marginRight: '20px',
						cursor: 'pointer',
						color: 'gray',
					}}
				/>
				<input
					type={'text'}
					className='searchContainer'
					style={{
						width: '90%',
						height: '60px',

						outline: 'none',
						border: 'none',
						// backgroundColor: 'rgba(240, 242, 245)',
						backgroundColor: 'white',
					}}
					placeholder='게스트의 이름 또는 이메일을 입력해주세요'
				/>
			</div>
			<div
				className='memberList'
				style={{marginTop: '20px', width: '100%'}}
			>
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

export default MemberManagement;
