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
								<th style={{width: '30%'}}>이메일</th>
								<th style={{width: '15%'}}>호스트명</th>
								<th>회원가입일</th>
								<th>경고 누적</th>
								<th style={{width: '10%'}}>기타</th>
							</tr>
						</thead>
						<tbody>
							{hostList.length === 0 ? (
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
								hostList.map((row, idx) => (
									<tr key={idx}>
										<td>{idx + 1}</td>
										<td>{row.email}</td>
										<td>{row.companyName}</td>
										<td>{row.createdAt}</td>
										<td>{row.warningCount}</td>
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

export default HostList;
