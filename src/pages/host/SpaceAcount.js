import React, {useState} from 'react';
import Acount1 from './Acount1';
import Acount2 from './Acount2';

function SpaceAcount(props) {
	const [show, setShow] = useState(1);
	const hostNum = 1;
	return (
		<div>
			<div className='reviewQnaGuest' style={{width: '100%'}}>
				<div style={{width: '100%', textAlign: 'center'}}>
					<h4>
						정산 예정 내역
						{/* {show === 1 ? <b>정산 예정</b> : <b> 정산 완료 </b>} */}
					</h4>
					<br />
					<div className='input-group' style={{paddingLeft: '17%'}}>
						<span
							className='reviewGuest'
							style={{
								color: show === 1 ? 'white' : '#949494',
								backgroundColor:
									show === 1 ? '#7B68EE' : '#ebebeb',
							}}
							onClick={() => {
								setShow(1);
							}}
						>
							정산 예정
						</span>
						<span
							className='reviewGuest'
							style={{
								color: show === 2 ? 'white' : '#949494',
								backgroundColor:
									show === 2 ? '#7B68EE' : '#ebebeb',
							}}
							onClick={() => {
								setShow(2);
							}}
						>
							정산 완료
						</span>
					</div>
				</div>
				<br />

				{show === 1 ? (
					<Acount1 hostNum={hostNum} />
				) : (
					<Acount2 hostNum={hostNum} />
				)}
			</div>
		</div>
	);
}

export default SpaceAcount;
