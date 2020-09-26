import React from 'react';

// import { Container } from './styles';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const auth = firebase.auth();

export default function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithGoogle(provider);
  }

  return (
    <button onClick={signInWithGoogle}>Entrar com Google</button>
  );
}