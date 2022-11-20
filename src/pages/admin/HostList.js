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

		console.log(url + '출력완료');

		axios.get(url).then((res) => {
			// setHostList(res.data);
			console.log(res.data);
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
								<th style={{width: '30%'}}>이메일</th>
								<th style={{width: '15%'}}>호스트명</th>
								<th>회원가입일</th>
								<th>경고 누적</th>
								<th style={{width: '10%'}}>기타</th>
							</tr>
						</thead>
						<tbody>
							{/* 카테고리 img + 카테고리 name 을 묶은 div 반복 구간 */}
							{hostList &&
								hostList.map((row, idx) => (
									<tr key={idx}>
										<td>{idx + 1}</td>
										<td>{row.email}</td>
										<td>{row.companyName}</td>
										<td>{row.createdAt}</td>
										<td>{row.warningCount}</td>
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

export default HostList;
