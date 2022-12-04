import React from 'react';
import {useRef, useState, useEffect} from 'react';
import * as StompJs from '@stomp/stompjs';
import jwt_decode from 'jwt-decode';
import {useParams} from 'react-router-dom';

function Chat(props) {
	const [chatList, setChatList] = useState([]);
	const [message, setMessage] = useState('');

	// const {apply_id} = useParams();
	const [memberNum, setMemberNum] = useState(1);
	const [hostNum, setHostNum] = useState(1);
	const {roomNum} = useParams();
	const client = useRef({});

	const connect = () => {
		client.current = new StompJs.Client({
			brokerURL: 'ws://localhost:9000/chat',
			onConnect: () => {
				console.log('success');
				subscribe();
			},
		});
		client.current.activate();
	};

	const publish = (message) => {
		if (!client.current.connected) return;

		client.current.publish({
			destination: '/pub/chat',
			body: JSON.stringify({
				memberNum: memberNum,
				hostNum: hostNum,
				roomNum: roomNum,
				message: message,
			}),
		});
		// console.log('roomNum: ' + roomNum);
		// console.log('memberNum: ' + memberNum);
		// console.log(message);

		setMessage('');
	};

	const subscribe = () => {
		client.current.subscribe('/sub/chat/' + roomNum, (body) => {
			const json_body = JSON.parse(body.body);
			setChatList((_chat_list) => [..._chat_list, json_body]);
			console.log(chatList);
		});
	};

	const disconnect = () => {
		client.current.deactivate();
	};

	const handleChange = (event) => {
		// 채팅 입력 시 state에 값 설정
		setMessage(event.target.value);
	};

	const handleSubmit = (event, chat) => {
		// 보내기 버튼 눌렀을 때 publish
		event.preventDefault();

		publish(chat);
	};

	useEffect(() => {
		connect();

		return () => disconnect();
	}, []);
	useEffect(() => {
		console.log(chatList);
	}, [chatList]);

	return (
		<div>
			<div className={'chat-list'}>
				{chatList.map((chat, i) => (
					<div>{chat}</div>
				))}
			</div>
			<form onSubmit={(event) => handleSubmit(event, message)}>
				<div>
					<input
						type={'text'}
						name={'chatInput'}
						onChange={handleChange}
						value={message}
					/>
				</div>
				<input type={'submit'} value={'의견 보내기'} />
			</form>
		</div>
	);
}

export default Chat;
