import axios from 'axios';
import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

function WaitReportList(props) {
	//처리대기 신고 리스트
	const {waitReport, setWaitReport} = props;

	//리스트 가져오기
	const getWaitReport = () => {
		let url = localStorage.url + '/admin/waitReport';

		axios.get(url).then((res) => {
			setWaitReport(res.data);
		});
	};

	//시작할때 가져오기
	useEffect(() => {
		//getWaitSpace
		getWaitReport();
	}, []);

	const navi = useNavigate();

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>번호</th>
						<th>신고 유형</th>
						<th>접수 상태</th>
						<th>접수 일자</th>
					</tr>
				</thead>
				<tbody>
					{waitReport.length === 0 ? (
						//게시글이 없을때 (length == 0)
						<tr>
							<td colSpan={4} style={{textAlign: 'center'}}>
								<span>접수된 게시글이 없습니다.</span>
							</td>
						</tr>
					) : (
						waitReport &&
						waitReport.map((data, idx) => (
							<tr key={idx}>
								<td>{idx + 1}</td>
								<td>{data.type}</td>
								<td>{data.status}</td>
								<td>{data.writeday}</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}

export default WaitReportList;
