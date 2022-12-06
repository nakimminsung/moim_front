import axios from 'axios';
import React, {useEffect} from 'react';

import {Person} from '@material-ui/icons';
import RoomIcon from '@material-ui/icons/Room';
import {useNavigate} from 'react-router-dom';

function WaitSpaceList(props) {
	//승인대기 공간 리스트
	// const [waitSpace, setWaitSpace] = useState('');
	const {waitSpace, setWaitSpace} = props;

	//리스트 가져오기
	const getWaitSpace = () => {
		let url = localStorage.url + '/admin/waitSpace';

		axios.get(url).then((res) => {
			setWaitSpace(res.data);
		});
	};

	//시작할때 가져오기
	useEffect(() => {
		//getWaitSpace
		getWaitSpace();
	}, []);

	const navi = useNavigate();

	return (
		<div style={{width: '100%'}}>
			{waitSpace.length === 0 ? (
				//데이터가 없을때
				<div
					style={{
						textAlign: 'center',
						height: '120px',
						lineHeight: '120px',
					}}
				>
					<span style={{fontSize: '16px'}}>
						대기 상태의 공간이 없습니다.
					</span>
				</div>
			) : (
				waitSpace &&
				waitSpace.slice(0, 2).map((data, idx) => (
					<div
						key={idx}
						style={{
							border: '1px solid lightgray',
							marginBottom: '10px',
							display: 'flex',
							cursor: 'pointer',
						}}
						onClick={() => {
							navi('/admin/space');
						}}
					>
						<div style={{width: '180px'}}>
							<img
								alt=''
								src={
									data.thumbnailImage == null
										? ''
										: data.thumbnailImage
								}
								style={{
									width: '180px',
									height: '120px',
									opacity: '0.4',
								}}
							/>
						</div>

						<div style={{paddingLeft: '20px'}}>
							<span
								style={{fontSize: '18px', fontWeight: 'bold'}}
							>
								{data.name == null ? '' : data.name}
							</span>
							<br />
							<span style={{color: 'gray'}}>
								{data.companyName == null
									? ''
									: data.companyName}
							</span>
							<br />
							<br />
							<br />
							<span style={{fontSize: '16px'}}>
								<b
									style={{
										color: '#6f42c1',
									}}
								>
									{data.weekAmPrice.toLocaleString('ko-KR')}
								</b>
								&nbsp;원/시간
							</span>
							&emsp;&emsp;
							<span style={{color: 'gray'}}>
								<Person style={{fontSize: '20px'}} /> 최대{' '}
								{data.headcount}인{' '}
							</span>
							&emsp;
							<span style={{color: 'gray'}}>
								<RoomIcon
									style={{
										fontSize: '20px',
										// marginBottom: '5px',
									}}
								/>
								{data.address.split(' ')[1]}
							</span>
						</div>
					</div>
				))
			)}
		</div>
	);
}

export default WaitSpaceList;
