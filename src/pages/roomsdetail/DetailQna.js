import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import CreateIcon from '@material-ui/icons/Create';
import DetailReview from './DetailReview';

function DetailQna(props) {
	const {num} = useParams();
	const [qna, setQna] = useState([]);

	const onSelectData = () => {
		let url = localStorage.url + '/detailReview?num=' + num;

		axios.get(url).then((res) => {
			setQna(res.data.Qna);
		});
	};
	useEffect((e) => {
		onSelectData(num);
	}, []);
	return (
		<div>
			<div id='5' style={{marginTop: '100px'}}>
				<b style={{borderBottom: '2px solid #ffd014'}}>
					Q&A ({qna.length}개)
				</b>
				<button>
					<CreateIcon />
					질문 작성하기
				</button>
				{qna &&
					qna.map((item, idx) => (
						<div>
							<div>
								<b>{item.nickname}</b>
								<p>{item.question}</p>
								<span>{item.writeday}</span>
							</div>
							<div>
								{item.answerday == null ? (
									''
								) : (
									<div>
										<b>호스트답글</b>
										<pre>{item.answer}</pre>
										<span>{item.answerday}</span>
									</div>
								)}
							</div>
						</div>
					))}
			</div>
			<DetailReview />
		</div>
	);
}

export default DetailQna;
