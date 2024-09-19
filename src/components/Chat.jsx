import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Chat.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
	apiKey: "AIzaSyBoxHzEK8v6eR3XWfiUOF5RUxbH-2r2PFs",
	authDomain: "statikana-dev.firebaseapp.com",
	projectId: "statikana-dev",
	storageBucket: "statikana-dev.appspot.com",
	messagingSenderId: "934623527137",
	appId: "1:934623527137:web:980ece75157155c0b5f7a0",
	measurementId: "G-8W2FWT46SZ"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function Chat() {
	const [user] = useAuthState(auth);

	return (
		<>
			<div id="chat">
				<title>statikana</title>
				<header></header>

				<section id="chatroom-section">
					{user ? <ChatRoom /> : <SignIn />}
				</section>
			</div>
		</>
	);
}

function SignIn() {
	const signInWithGitHub = () => {
		const provider = new firebase.auth.GithubAuthProvider();
		auth.signInWithPopup(provider).then((result) => {
			let user = result.user;
			console.log(user);
			let userRef = firestore.collection('users');
			let query = userRef.where('uid', '==', user.uid);
			// if the user is not in the database, add them
			query.get().then((querySnapshot) => {
				if (querySnapshot.empty) {
					userRef.add({
						uid: user.uid,
						email: user.email,
						photoURL: user.photoURL,
						createdAt: firebase.firestore.FieldValue.serverTimestamp()
					});	
				}
			});
		});
	}

	return (
		<button id="sign-in" onClick={signInWithGitHub}>Sign in with GitHub</button>
	)
}

function SignOut() {
	return auth.currentUser && (
		<button id="sign-out" onClick={() => auth.signOut()}>sign out</button>
	)
}

function ChatRoom() {
	const messagesRef = firestore.collection('messages');
	const query = messagesRef.orderBy('createdAt').limit(100);

	const [messages] = useCollectionData(query);
	const [formValue, setFormValue] = useState('');

	const sendMessage = async (e) => {
		e.preventDefault(); // Prevents the page from refreshing when the form is submitted

		const uid = auth.currentUser?.uid;
		if (!uid) {
			return;
		}

		let chat = document.getElementById('messages');
		let currentScroll = chat.scrollTop;
		let maxScroll = chat.scrollHeight - chat.clientHeight;
		let atBottom = Math.abs(currentScroll - maxScroll) < 1;

		await messagesRef.add({
			text: formValue,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			uid
		});
		setFormValue('');

		if (atBottom) {
			chat.scrollTop = chat.scrollHeight;
		}

	}

	function mapMessagesToChatMessages(messages) {
		let currentAuthor = null;
		let elements = [];
	
		for (let i = 0; i < messages?.length; i++) {
			let msg = messages[i];
			let isSameAuthor = currentAuthor === msg.uid;
			currentAuthor = msg.uid;
			let element = <ChatMessage key={msg.id} message={msg} isSameAuthor={isSameAuthor} />;
			elements.push(element);
		}
		return elements;
	}

	return (
		<>
		<div id="chat-room">
			<div id="messages">
				{mapMessagesToChatMessages(messages)}
			</div>
			
			<div id="sticky-input">
				<form onSubmit={sendMessage} id="message-form" autoComplete="off">
					<input value={formValue} onChange={(e) => setFormValue(e.target.value)} id="message-input" />
					<button type="submit" id="message-submit">send</button>
					<SignOut />
				</form>

			</div>
		</div>
	</>
	)

}



function ChatMessage(props) {
	const msg = props.message;
	const isSameAuthor = props.isSameAuthor;
    const userRef = firestore.collection('users');
    const query = userRef.where('uid', '==', msg.uid);
    const [snapshot] = useCollectionData(query);

    const [user, setUser] = useState(null);

    useEffect(() => {
      if (snapshot) {
        setUser(snapshot[0]);
      }
    }, [snapshot]);

	let text = msg.text;
	console.log(text);
	let imgURLs = text.match(/https?:\/\/.*\.(?:jpg|png)/g);
	let mediaURLs = text.match(/https?:\/\/.*\.(?:mp4|webm)/g);
	let imgElements;
	let mediaElements;

	if (imgURLs) {
		imgElements = (imgURLs.map((link) => { return <img src={link} className="message-image" />; }));
	} else {
		imgElements = [];
	}


	if (mediaURLs) {
		mediaElements = (mediaURLs.map((link) => { return <video src={link} className="message-video" controls />; }));
	} else {
		mediaElements = [];
	}

	let textElement = document.createElement('div');
	textElement.className = "message-content";
	let textElements = [];

	let links = text.match(/(https?:\/\/[^\s]+)/g);
	if (!links) {
		textElements.push(<p className="message-text-portion">{text}</p>);
	} else {
		for (let i = 0; links && i < links.length; i++) {
			const link = links[i];
			let element = document.createElement('a');
			element.href = link;
			element.target = "_blank";

			let textBefore = text.substring(0, text.indexOf(link));
			textElements.push(
				<p className="message-text-portion"> {textBefore}</p>,
				<a href={link} target="_blank" className="message-inline-link">{link}</a>
			)
		}

		// the text after the last link
		let textAfter = text.substring(text.lastIndexOf(links[links.length - 1]) + links[links.length - 1].length);
		textElements.push(<p className="message-text-portion">{textAfter}</p>);
	}


	return (
		<div className={`message-${msg.uid === auth.currentUser.uid ? 'sent' : 'received'} ${isSameAuthor ? 'message-same-author' : ''}`}> 
			<div className="message-direct-content">
				{user ? (<img src={user.photoURL} className="message-photoURL" />) : (<a>loading...</a>)}
				{user ? (<a className="message-chatname">{user.email.split('@')[0]}</a>) : (<a>loading...</a>)}
				<br />
				{textElements}
            </div>
			{imgElements}
			{mediaElements}
		</div>
	)
}

export default Chat;
