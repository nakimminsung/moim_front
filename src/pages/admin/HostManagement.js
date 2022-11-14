import {SearchRounded} from '@material-ui/icons';
import axios from 'axios';
import React, {useEffect, useState} from 'react';

function HostManagement(props) {
	const [hostList, setHostList] = useState('');

	const getHostList = () => {
		let url = localStorage.url + '/admin/hostList';

		console.log(url);

		axios.get(url).then((res) => {
			// console.log(res.data);

			var x = res.data;

			setHostList(x);

			// console.log(x.length);
		});
	};

	useEffect(() => {
		//멤버 리스트 가져오기
		getHostList();
	}, []);

	return (
		<div>
			{/* 검색 */}
			<div
				className='hostSearch'
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
						marginTop: '3px',
						outline: 'none',
						border: 'none',
						// backgroundColor: 'rgba(240, 242, 245)',
						backgroundColor: 'white',
					}}
					placeholder='호스트의 이름 또는 이메일을 입력해주세요'
				/>
			</div>
			<div
				className='hostList'
				style={{marginTop: '20px', width: '100%'}}
			>
				<table className='table table-bordered'>
					<thead style={{textAlign: 'center'}}>
						<tr>
							<th>번호</th>
							<th>이메일</th>
							<th>호스트명</th>
							<th>회원가입일</th>
							<th>경고 누적</th>
							<th>기타</th>
						</tr>
					</thead>
					<tbody>
						{/* 카테고리 img + 카테고리 name 을 묶은 div 반복 구간 */}
						{hostList &&
							hostList.map((row, idx) => (
								<tr key={idx}>
									<td style={{textAlign: 'center'}}>
										{idx + 1}
									</td>
									<td>{row.email}</td>
									<td style={{textAlign: 'center'}}>
										{row.companyName}
									</td>
									<td style={{textAlign: 'center'}}>
										{row.createdAt}
									</td>
									<td style={{textAlign: 'center'}}>
										{row.warningCount}
									</td>
									<td style={{textAlign: 'center'}}>공란</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default HostManagement;
