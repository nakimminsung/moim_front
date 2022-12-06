import axios from 'axios';
import React, {PureComponent, useEffect, useState} from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';

function MemberChart(props) {
	//월 별 호스트 정보
	const [hostInfo, setHostInfo] = useState([]);

	//월 별 게스트 정보
	const [memberInfo, setMemberInfo] = useState([]);

	//리스트 가져오기
	const getHostInfo = () => {
		let url = localStorage.url + '/admin/getHostInfo';

		axios.get(url).then((res) => {
			setHostInfo(res.data);
		});
	};

	//리스트 가져오기
	const getMemberInfo = () => {
		let url = localStorage.url + '/admin/getMemberInfo';

		axios.get(url).then((res) => {
			setMemberInfo(res.data);
		});
	};

	//시작할때 가져오기
	useEffect(() => {
		getHostInfo();
		getMemberInfo();
	}, []);

	const data = [
		{
			name: '7월',
			게스트: 5,
			호스트: 7,
		},
		{
			name: '8월',
			게스트: 7,
			호스트: 3,
		},
		{
			name: '9월',
			게스트: 3,
			호스트: 5,
		},
		{
			name: '10월',
			게스트: 1,
			호스트: 7,
		},
		{
			name: '11월',
			게스트: 5,
			호스트: 2,
		},
		{
			name: '12월',
			게스트: 4,
			호스트: 8,
		},
	];

	return (
		<div className='memberChartBox'>
			<ResponsiveContainer width='100%' aspect={2.3 / 1}>
				<LineChart
					width={500}
					height={300}
					data={data}
					margin={{
						top: 5,
						right: 30,
						left: -30,
						// bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='name' />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line
						type='monotone'
						dataKey='호스트'
						stroke='#8884d8'
						activeDot={{r: 8}}
					/>
					<Line type='monotone' dataKey='게스트' stroke='#82ca9d' />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}

export default MemberChart;
