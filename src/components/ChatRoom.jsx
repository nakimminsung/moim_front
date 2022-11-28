import React, {useEffect, useState} from 'react';
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import jwt_decode from 'jwt-decode';

var stompClient = null;

const ChatRoom = () => {
	const host = {name: '마포하와이', num: 1};
	const [hostData, setHostData] = useState({});
	const [privateChats, setPrivateChats] = useState(new Map());
	const [tab, setTab] = useState('CHATROOM');
	const [chatData, setChatData] = useState({
		username: localStorage.getItem('token')
			? jwt_decode(localStorage.getItem('token')).nickname
			: sessionStorage.name,
		// receivername: hostData.name,
		connected: false,
		message: '',
	});

	const connect = () => {
		let Sock = new SockJS('/chat');
		stompClient = over(Sock);
		stompClient.connect({}, onConnected, onError);
	};

	const onConnected = () => {
		setChatData({...chatData, connected: true});
		stompClient.subscribe('/chatroom/public', onMessageReceived);
		stompClient.subscribe(
			'/user/' + chatData.username + '/private',
			onPrivateMessage,
		);
		userJoin();
	};
	const userJoin = () => {
		var chatMessage = {
			senderName: chatData.username,
			status: 'JOIN',
		};
		stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
		// stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
	};

	const onMessageReceived = (payload) => {
		var payloadData = JSON.parse(payload.body);
		// eslint-disable-next-line default-case
		switch (payloadData.status) {
			case 'JOIN':
				if (!privateChats.get(payloadData.senderName)) {
					privateChats.set(payloadData.senderName, []);
					setPrivateChats(new Map(privateChats));
				}
				break;
			case 'MESSAGE':
				// publicChats.push(payloadData);
				// setPublicChats([...publicChats]);
				break;
		}
	};

	const onPrivateMessage = (payload) => {
		var payloadData = JSON.parse(payload.body);
		console.log(payloadData);
		if (privateChats.get(payloadData.senderName)) {
			privateChats.get(payloadData.senderName).push(payloadData);
			setPrivateChats(new Map(privateChats));
		} else {
			let list = [];
			list.push(payloadData);
			privateChats.set(payloadData.senderName, list);
			setPrivateChats(new Map(privateChats));
		}
	};

	const onError = (err) => {
		console.log(err);
	};

	const handleMessage = (event) => {
		const {value} = event.target;
		setChatData({...chatData, message: value});
	};

	const sendValue = () => {
		if (stompClient) {
			var chatMessage = {
				senderName: chatData.username,
				message: chatData.message,
				status: 'MESSAGE',
			};
			stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
			setChatData({...chatData, message: ''});
		}
	};

	const sendPrivateValue = () => {
		if (stompClient) {
			var chatMessage = {
				senderName: chatData.username,
				// receiverName: tab,
				receiverName: tab,
				message: chatData.message,
				status: 'MESSAGE',
			};

			if (chatData.username !== tab) {
				privateChats.get(tab).push(chatMessage);
				setPrivateChats(new Map(privateChats));
			}
			stompClient.send(
				'/app/private-message',
				{},
				JSON.stringify(chatMessage),
			);
			setChatData({...chatData, message: ''});
		}
	};

	useEffect(() => {
		connect();
	}, []);

	return (
		<div className='container'>
			<div className='chat-box'>
				<div className='member-list'>
					<ul>
						{[...privateChats.keys()].map((name, index) => (
							<li
								onClick={() => {
									setTab(name);
									console.log(name);
								}}
								className={`member ${tab === name && 'active'}`}
								key={index}
							>
								{name}
							</li>
						))}
					</ul>
				</div>
				{tab !== 'CHATROOM' && (
					<div className='chat-content'>
						<ul className='chat-messages'>
							{[...privateChats.get(tab)].map((chat, index) => (
								<li
									className={`message ${
										chat.senderName === chatData.username &&
										'self'
									}`}
									key={index}
								>
									{chat.senderName !== chatData.username && (
										<div className='avatar'>
											{chat.senderName}
										</div>
									)}
									<div className='message-data'>
										{chat.message}
									</div>
									{chat.senderName === chatData.username && (
										<div className='avatar self'>
											{chat.senderName}
										</div>
									)}
								</li>
							))}
						</ul>

						<div className='send-message'>
							<input
								type='text'
								className='input-message'
								placeholder='enter the message'
								value={chatData.message}
								onChange={handleMessage}
							/>
							<button
								type='button'
								className='send-button'
								onClick={sendPrivateValue}
							>
								send
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ChatRoom;
