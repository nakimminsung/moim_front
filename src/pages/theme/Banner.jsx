import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import RoomIcon from '@mui/icons-material/Room';
import List from './List';
import './Banner.css';

function Banner(props) {
	const [data, setData] = useState('');
	const {num} = useParams();
	const navi = useNavigate();

	const selectTheme = () => {
		let url = localStorage.url + '/theme/data?num=' + num;
		console.log(url);
		axios.get(url).then((res) => setData(res.data));
	};

	useEffect(() => {
		selectTheme();
	}, []);

	return (
		<>
			<div
				style={{
					maxWidth: '1200px',
					margin: '0 auto',
					minHeight: '1000px',
				}}
			>
				<div
					style={{
						backgroundImage: `url(${data.bannerImage})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: '100% auto',
						backgroundPosition: 'center',
						width: '100%',
						height: '400px',
						padding: '10% 35px 30px 35px',
						marginBottom: '10px',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
					}}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<span
							style={{
								display: 'block',
								color: 'white',
								fontSize: '40px',
							}}
						>
							{data.description}
						</span>
						<div
							style={{
								width: '40px',
								height: '5px',
								backgroundColor: 'yellow',
								opacity: '0.8',
								margin: '20px auto 30px',
							}}
						/>
						<span style={{fontSize: '20px', color: 'white'}}>
							{data.title}
						</span>
					</div>
					<div style={{display: 'flex', justifyContent: 'flex-end'}}>
						<div
							style={{
								width: '150px',
								height: '45px',
								border: '2px solid white',
								textAlign: 'center',
								lineHeight: '45px',
								borderRadius: '50px',
								cursor: 'pointer',
							}}
							onClick={() => {
								navi('/map/' + num);
							}}
						>
							<span style={{color: 'white', fontSize: '30p'}}>
								<RoomIcon />
								지도로 보기
							</span>
						</div>
					</div>
				</div>
				<List />
			</div>
		</>
	);
}

export default Banner;
