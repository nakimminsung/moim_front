import {SearchRounded} from '@material-ui/icons';
import MemberList from './MemberList';

function MemberManagement(props) {
	return (
		<div>
			{/* 검색 */}
			<div
				className='memberSearch'
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
					onClick={() => {
						// 온클릭
					}}
				/>
				<input
					type={'text'}
					className='searchContainer'
					style={{
						width: '90%',
						height: '60px',

						outline: 'none',
						border: 'none',
						// backgroundColor: 'rgba(240, 242, 245)',
						backgroundColor: 'white',
					}}
					placeholder='게스트의 이름 또는 이메일을 입력해주세요'
					// value={search}
					// onChange={onChangeSearch}
				/>
			</div>
			<div>
				{/* 게스트 정보 가져오기 */}
				<MemberList />
			</div>
		</div>
	);
}

export default MemberManagement;
