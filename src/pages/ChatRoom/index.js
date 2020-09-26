import React from 'react';

// import { Container } from './styles';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useCollectionData } from 'react-firebase-hooks/firestore';

const auth = firebase.auth();
const firestore = firebase.firestore();

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>SignOut</button>
  )
}

export default function ChatRoom() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'})
}