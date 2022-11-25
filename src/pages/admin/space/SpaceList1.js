import React, {useEffect} from 'react';
import {Person} from '@material-ui/icons';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function SpaceList1(props) {
	const {sort, searchWord, setSearchWord} = props;
	const {spaceList, setSpaceList} = props;

	const navi = useNavigate(); //공간 클릭 시 상세페이지로 이동

	const getSpaceList = () => {
		let url =
			localStorage.url +
			'/admin/spaceList?searchWord=' +
			searchWord +
			'&sort=' +
			sort;

		console.log(searchWord);
		console.log(url);

		axios.get(url).then((res) => {
			setSpaceList(res.data);

			console.log(res.data);
		});
	};

	useEffect(() => {
		//방 리스트
		getSpaceList();
	}, [sort, searchWord]);

	return (
		<div>
			<div
				className='spaceList'
				style={{
					marginTop: '10px',
					width: '100%',
					display: 'flex',
					justifyContent: 'flex-start',
					flexWrap: 'wrap',
				}}
			>
				{spaceList &&
					spaceList.map((data, idx) => (
						<div
							style={{
								border: '1px solid lightgray',
								borderRadius: '5px',
								// width: '300px',
								// marginRight: '2%',
								cursor: 'pointer',

								marginBottom: '30px',
								backgroundColor: 'white',
								boxShadow: '0px 2px 2px 1px rgba(0 0 0 / 10%)',

								width: '23%',
								// height: '100%',
								margin: '1%',
							}}
							key={idx}
							onClick={() => {
								navi('/detail/' + data.num);
							}}
						>
							<img
								alt=''
								src={data.thumbnailImage}
								style={{
									width: '100%',
									height: '200px',
									// height: '70%',
									borderRadius: '5px',
								}}
							/>
							<br />
							<div style={{color: 'gray'}}>
								<h5>
									<b style={{color: 'black'}}>{data.name}</b>
								</h5>
								<span>room tag list</span>
								<br />
								<span>
									<b
										style={{
											color: '#6f42c1',
											fontSize: '20px',
										}}
									>
										{data.weekAmPrice.toLocaleString(
											'ko-KR',
										)}
									</b>
									&nbsp;원 / 시간
								</span>
								&emsp;&emsp;
								<span>
									<Person style={{fontSize: '20px'}} /> 최대{' '}
									{data.headcount}인
								</span>
								<br />
							</div>
						</div>
					))}
			</div>
		</div>
	);
}

export default SpaceList1;
