import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyCkFWJ2Dohc_AxyfWLt4a_gGWl-5eFl2d0",
    authDomain: "react-firebase-chat-52aff.firebaseapp.com",
    databaseURL: "https://react-firebase-chat-52aff.firebaseio.com",
    projectId: "react-firebase-chat-52aff",
    storageBucket: "react-firebase-chat-52aff.appspot.com",
    messagingSenderId: "106268984470",
    appId: "1:106268984470:web:07ae6b89d4fa53f6e9aeb7",
    measurementId: "G-P2TWL3M7HK"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>SignOut</button>
  )
}

function ChatRoom() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'})

  return (
    <>
      <div>
        { messages && messages.map(message => <ChatMessage key={message.id} message={message} />) } 
      </div>
    </>
  )
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button onClick={signInWithGoogle}>Entrar com Google</button>
  );
}

function ChatMessage(props) {
  const { msg, uid } = props.message;

  return <p>{msg}</p>
}

function App() {

  const [user] =  useAuthState(auth);

  return (
    <div className="App">
      <header>
     
      </header>

      <section>
        { user ? <ChatRoom /> : <SignIn /> }
      </section>
    </div>
  );
}

export default App;
