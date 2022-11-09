import {Menu, SearchRounded} from '@material-ui/icons';
import React from 'react';
import {NavLink} from 'react-router-dom';
import mlogo from '../../asset/logo/m_logo.png';
import './Header.css';

function header(props) {
	return (
		<header className='layHeader'>
			<div style={{display: 'flex', justifyContent: 'space-around'}}>
				<div
					className='logo'
					style={{
						paddingLeft: '30px',
						width: '300px',
					}}
				>
					<NavLink to={'/'} className='logoLink'>
						<span className='logo_span' style={{cursor: 'pointer'}}>
							<img className='headerLogo' alt='' src={mlogo} />
							<b
								style={{
									fontSize: '40px',
								}}
							>
								MoiM
							</b>
						</span>
					</NavLink>
				</div>

				<div className='headerSearch'>
					<SearchRounded
						style={{
							fontSize: '40px',
							marginTop: '7px',
							marginLeft: '10px',
							marginRight: '20px',
							cursor: 'pointer',
							color: 'gray',
						}}
					/>
					<input
						type={'text'}
						className='searchBox'
						placeholder='지역, 공간유형, 공간명으로 찾아보세요'
					/>
				</div>

				<div className='headerRight'>
					<span style={{width: '200px', fontSize: '18px'}}>
						<NavLink to={'/'}>내 공간 등록하기</NavLink>
					</span>
					&emsp;&emsp;
					<NavLink to={'/'}>
						<Menu
							style={{
								fontSize: '36px',
								marginTop: '8px',
								cursor: 'pointer',
							}}
						/>
					</NavLink>
				</div>
			</div>
		</header>
	);
}

export default header;
