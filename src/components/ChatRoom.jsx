import React, {useEffect, useState} from 'react';
import {over} from 'stompjs';
import SockJS from 'sockjs-client';

var stompClient = null;

const ChatRoom = () => {
	// 개인 채팅
	// object 형태의 객체들의 배열을 담아야 함
	const [privateChats, setPrivateChats] = useState(new Map());

	// 오픈 채팅
	// 오픈 채팅의 경우 방이 하나이기 때문에 채팅창 리스트만 담으면 되므로 []
	// const [publicChats, setPublicChats] = useState([]);

	// 채팅방 이름
	const [tab, setTab] = useState('CHATROOM');

	// 채팅 데이터
	const [userData, setUserData] = useState({
		username: '',
		receivername: '',
		connected: false,
		message: '',
	});

	// 소켓 연결
	const connect = () => {
		let Sock = new SockJS('/chat'); // SockJS 객체 생성
		stompClient = over(Sock); // websocket 연결
		stompClient.connect({}, onConnected, onError); // websocket 연결 후 onConnected로 보냄
	};

	// 커넥트가 됐을 때 기본적으로 본인의 private 방을 연다.
	// subscribe : 구독이며, 소켓 url 을 의미
	const onConnected = () => {
		setUserData({...userData, connected: true});
		// onMessageReceived 공통 메시지 받을 것 구독상태가 되면 response 가 열려있기 때문에 event 가 발생 시 event를 받는다.
		stompClient.subscribe('/chatroom/public', onMessageReceived);
		// onPrivateMessage 개인 메시지 받을 것 구독상태가 되면 response 가 열려있기 때문에 event 가 발생 시 event를 받는다.
		stompClient.subscribe(
			'/user/' + userData.username + '/private',
			onPrivateMessage,
		);
		userJoin();
	};

	// 유저가 어떤 채팅 방에 들어갔을 때, receiver 에게 sendName을 보내주기 위한 것
	// 제이슨 형태로 보내줌
	const userJoin = () => {
		var chatMessage = {
			senderName: userData.username,
			status: 'JOIN',
		};
		stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
	};

	// onMessageReceived -> 알림기능관련
	const onMessageReceived = (payload) => {
		// event 로 받은 페이로드 값을 제이슨화시켜준다.
		var payloadData = JSON.parse(payload.body);
		// event에는 status 코드가 존재한다.
		// 입력한 변수가 status 이며 이게 true 여기서는 200일 때,
		// eslint-disable-next-line default-case
		switch (payloadData.status) {
			case 'JOIN':
				if (!privateChats.get(payloadData.senderName)) {
					// 프라이빗 챗에 세팅을 senderName을 설정시켜준다.
					// 이 구조로 어떤 사람이 접속했을 때,뜰 수 있는 구조이다.
					// 이걸 정말 잘 이용하면 실시간 알람기능이 가능할 수 있다.
					// 이걸로 state 변화주면 알람 기능 가능
					privateChats.set(payloadData.senderName, []);
					// 프라이빗 챗을 만들게 된다. (빈 채팅창으로 )
					setPrivateChats(new Map(privateChats));
				}
				break;
			// 만약 메시지라면, 메시지 추가
			case 'MESSAGE':
				// publicChats.push(payloadData);
				// setPublicChats([...publicChats]);
				break;
		}
	};

	// 프라이빗 메시지가 있다면, payloadData를 privateChats에 추가
	const onPrivateMessage = (payload) => {
		console.log(payload);
		var payloadData = JSON.parse(payload.body);
		// 만약 프라이빗 챗이 senderName을 갖고있으면 채팅이 있는 것이기 때문에 해당 senderName으로 메시지를 푸쉬시켜주면 됨.
		if (privateChats.get(payloadData.senderName)) {
			privateChats.get(payloadData.senderName).push(payloadData);
			setPrivateChats(new Map(privateChats));
			// 아니면 빈 리스트를 만들어 채팅창에 넣어줌.
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

	// 메시지 핸들러 => 메시지를 적는 input value 를 핸들링하기 위한 함수  onChange라고 생각하면 편함
	const handleMessage = (event) => {
		const {value} = event.target;
		setUserData({...userData, message: value});
	};

	// 오픈 채팅방 보내기 버튼
	const sendValue = () => {
		if (stompClient) {
			var chatMessage = {
				senderName: userData.username,
				message: userData.message,
				status: 'MESSAGE',
			};
			console.log(chatMessage);
			stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
			setUserData({...userData, message: ''});
		}
	};

	// 개인 채팅방 보내기 버튼
	const sendPrivateValue = () => {
		if (stompClient) {
			var chatMessage = {
				senderName: userData.username,
				receiverName: tab,
				message: userData.message,
				status: 'MESSAGE',
			};

			if (userData.username !== tab) {
				privateChats.get(tab).push(chatMessage);
				setPrivateChats(new Map(privateChats));
			}
			stompClient.send(
				'/app/private-message',
				{},
				JSON.stringify(chatMessage),
			);
			setUserData({...userData, message: ''});
		}
	};

	// 유저네임 핸들러
	const handleUsername = (event) => {
		const {value} = event.target;
		setUserData({...userData, username: value});
	};

	// registerUser의 경우 사용 안해도 됨
	// 왜냐하면 우리는 로그인을 이미 한 상태이기 때문
	const registerUser = () => {
		connect();
	};

	return (
		<div className='container'>
			{userData.connected ? (
				<div className='chat-box'>
					<div className='member-list'>
						<ul>
							{/* <li
								onClick={() => {
									setTab('CHATROOM');
								}}
								className={`member ${
									tab === 'CHATROOM' && 'active'
								}`}
							>
								Chatroom
							</li> */}
							{[...privateChats.keys()].map((name, index) => (
								<li
									onClick={() => {
										setTab(name);
									}}
									className={`member ${
										tab === name && 'active'
									}`}
									key={index}
								>
									{name}
								</li>
							))}
						</ul>
					</div>
					{tab === 'CHATROOM' && (
						<div className='chat-content'>
							<ul className='chat-messages'>
								{/* {publicChats.map((chat, index) => (
									<li
										className={`message ${
											chat.senderName ===
												userData.username && 'self'
										}`}
										key={index}
									>
										{chat.senderName !==
											userData.username && (
											<div className='avatar'>
												{chat.senderName}
											</div>
										)}
										<div className='message-data'>
											{chat.message}
										</div>
										{chat.senderName ===
											userData.username && (
											<div className='avatar self'>
												{chat.senderName}
											</div>
										)}
									</li>
								))} */}
							</ul>

							<div className='send-message'>
								<input
									type='text'
									className='input-message'
									placeholder='enter the message'
									value={userData.message}
									onChange={handleMessage}
								/>
								<button
									type='button'
									className='send-button'
									onClick={sendValue}
								>
									send
								</button>
							</div>
						</div>
					)}
					{tab !== 'CHATROOM' && (
						<div className='chat-content'>
							<ul className='chat-messages'>
								{[...privateChats.get(tab)].map(
									(chat, index) => (
										<li
											className={`message ${
												chat.senderName ===
													userData.username && 'self'
											}`}
											key={index}
										>
											{chat.senderName !==
												userData.username && (
												<div className='avatar'>
													{chat.senderName}
												</div>
											)}
											<div className='message-data'>
												{chat.message}
											</div>
											{chat.senderName ===
												userData.username && (
												<div className='avatar self'>
													{chat.senderName}
												</div>
											)}
										</li>
									),
								)}
							</ul>

							<div className='send-message'>
								<input
									type='text'
									className='input-message'
									placeholder='enter the message'
									value={userData.message}
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
			) : (
				<div className='register'>
					<input
						id='user-name'
						placeholder='Enter your name'
						name='userName'
						value={userData.username}
						onChange={handleUsername}
						margin='normal'
					/>
					<button type='button' onClick={registerUser}>
						connect
					</button>
				</div>
			)}
		</div>
	);
};

export default ChatRoom;
