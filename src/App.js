import React, { useState, useRef } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyANOqDXh2g0mjwCcGkN-TLodKxVTl4-e3A",
  authDomain: "react-firebase-chat-f80ea.firebaseapp.com",
  databaseURL: "https://react-firebase-chat-f80ea.firebaseio.com",
  projectId: "react-firebase-chat-f80ea",
  storageBucket: "react-firebase-chat-f80ea.appspot.com",
  messagingSenderId: "870285414829",
  appId: "1:870285414829:web:18fc4030c9a71c2c459124",
  measurementId: "G-3FXR4P1GMZ"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sair</button>
  )
}

function ChatRoom() {
  const dummy = useRef();

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');

    dummy.current.scrollIntoView({ behavior: 'smooth'})
  }

  return (
    <>
      <main>
        { messages && messages.map(message => <ChatMessage key={message.id} message={message} />) } 

        <div ref={dummy}></div>
      </main>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <button type="submit">Enviar</button>
      </form>
    </>
  )
}

function SignIn() {
  const signInWithGoogle = () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <button onClick={signInWithGoogle}>Entrar com Google</button>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return(
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt={uid} />
      <p>{text}</p>
    </div>
  );
}

function App() {

  const [user] =  useAuthState(auth);

  return (
    <div className="App">
      <header>
        <SignOut />
      </header>

      <section>
        { user ? <ChatRoom /> : <SignIn /> }
      </section>
    </div>
  );
}

export default App;
