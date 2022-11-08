import {SearchOutlined, SearchRounded} from '@material-ui/icons';
import React from 'react';
import mlogo from '../../asset/logo/m_logo.png';

function header(props) {
	return (
		<header className='layHeader'>
			<div style={{display: 'flex', justifyContent: 'start'}}>
				<div
					className='logo'
					style={{
						paddingLeft: '50px',
						width: '400px',
						border: '1px solid gray',
					}}
				>
					<img
						className='headerLogo'
						alt=''
						src={mlogo}
						style={{width: '60px', marginTop: '-30px'}}
					/>
					<span style={{fontSize: '48px', fontWeight: 'bold'}}>
						MoiM
					</span>
				</div>
				<div
					className='headerSearch'
					style={{
						verticalAlign: 'middle',
						marginTop: '15px',
						width: '400px',
						height: '50px',

						backgroundColor: '#d5d5d5',
						display: 'flex',
						justifyContent: 'start',
						borderRadius: '100px',
					}}
				>
					<SearchRounded
						style={{
							fontSize: '40px',
							marginTop: '7px',
							marginLeft: '10px',
						}}
					/>
					<input
						type={'text'}
						className='form-control'
						style={{
							width: '320px',
							backgroundColor: '#d5d5d5',
							outline: 'none',
						}}
					/>
				</div>
			</div>
		</header>
	);
}

export default header;
