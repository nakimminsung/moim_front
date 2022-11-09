import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Theme(props) {
	const [data, setData] = useState([]);
	const [now, setNow] = useState(1);
	const max = 4;
	const navi = useNavigate();

	const getThemeList = () => {
		let url = localStorage.url + '/main/theme';
		console.log(url);
		axios.get(url).then((res) => setData(res.data));
	};

	const moreButton = () => {
		setNow(now + 1);
	};

	useEffect(() => {
		getThemeList();
	}, []);

	return (
		<div
			style={{
				maxWidth: '1200px',
				margin: '0 auto',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<b
					style={{
						fontSize: '30px',
						display: 'block',
						textAlign: 'center',
						marginBottom: '10px',
					}}
				>
					기획전
				</b>
				<span
					style={{
						fontSize: '15px',
						textAlign: 'center',
						marginBottom: '30px',
					}}
				>
					지금 딱 내가 찾는 공간!
				</span>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
					justifyContent: 'space-between',
				}}
			>
				{data &&
					data.map((item, i) => (
						<>
							{i < max * now ? (
								<div
									key={i}
									style={{
										backgroundImage: `url(${item.bannerImage})`,
										width: '49%',
										height: '150px',
										cursor: 'pointer',
										opacity: 0.9,
										padding: '20px',
										marginBottom: '25px',
									}}
									onClick={() => {
										navi('/theme/' + item.num);
									}}
								>
									<span
										style={{
											display: 'block',
											fontSize: '30px',
											color: 'white',
											fontWeight: '1000',
										}}
									>
										{item.title}
									</span>
									<span
										style={{
											color: 'white',
											fontSize: '15px',
										}}
									>
										{item.description}
									</span>
								</div>
							) : (
								''
							)}
						</>
					))}
				{parseInt(data.length / max) + 1 !== now ? (
					<div
						style={{
							border: '1px solid #a0a0a0',
							width: '100%',
							height: '60px',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							cursor: 'pointer',
						}}
						onClick={() => {
							moreButton();
						}}
					>
						더보기
					</div>
				) : (
					''
				)}
			</div>
		</div>
	);
}

export default Theme;
