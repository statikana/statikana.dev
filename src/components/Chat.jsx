import React, { useState, useEffect } from 'react';
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
			<title>statikana</title>
			<header>
				
			</header>

			<section>
				{user ? <ChatRoom /> : <SignIn />}
			</section>
		</>
	);
}

function SignIn() {
	const signInWithGitHub = () => {
		const provider = new firebase.auth.GithubAuthProvider();
		auth.signInWithPopup(provider).then((result) => {
			let user = result.user;
			let userRef = firestore.collection('users');
			let query = userRef.where('uid', '==', user.uid);
			// if the user is not in the database, add them
			query.get().then((querySnapshot) => {
				if (querySnapshot.empty) {
					userRef.add({
						uid: user.uid,
						displayName: user.displayName,
						email: user.email,
						photoURL: user.photoURL,
						createdAt: firebase.firestore.FieldValue.serverTimestamp()
					});
				}
			});
		});

	}

	return (
		<button onClick={signInWithGitHub}>Sign in with GitHub</button>
	)
}

function SignOut() {
	return auth.currentUser && (
		<button onClick={() => auth.signOut()}>Sign Out</button>
	)
}

function ChatRoom() {
	const messagesRef = firestore.collection('messages');
	const query = messagesRef.orderBy('createdAt').limit(25);

	const [messages] = useCollectionData(query);
	const [formValue, setFormValue] = useState('');

	const sendMessage = async (e) => {
		e.preventDefault(); // Prevents the page from refreshing when the form is submitted

		const uid = auth.currentUser.uid;
		console.log(uid);

		await messagesRef.add({
			text: formValue,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			uid
		});

		setFormValue('');
	}

	return (
		<>
			<div className="chat-room">
				<div>
					{messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
				</div>
				
				<form onSubmit={sendMessage}>
					<input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
					<button type="submit">Send</button>
				</form>

				<div>
					<SignOut />
				</div>
			</div>
		</>
	)
}


function ChatMessage(props) {
    const [user, setUser] = useState(null);
	const msg = props.message;
    const userRef = firestore.collection('users');
    const query = userRef.where('uid', '==', msg.uid);
    const [snapshot] = useCollectionData(query);

    useEffect(() => {
      if (snapshot) {
        setUser(snapshot[0]);
      }
    }, [snapshot]);

	return (
		<div className={`message ${msg.uid === auth.currentUser.uid ? 'sent' : 'received'}`}> 
			<p>
                {user ? (<img src={user.photoURL} className="message-photoURL" />) : (<a>loading...</a>)}
                {user ? (<span className="message-displayName">{user.displayName}</span>) : (<a>loading...</a>)}
                <br />
                <a className="message-text">{msg.text}</a>
            </p>
		</div>
	)
}

export default Chat;
