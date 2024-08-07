import { firebase } from '@react-native-firebase/app';
import '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyApvhHSViMyOovLoORQOUNWS8hPb4lIKtg",
  authDomain: "reactfire-dbcff.firebaseapp.com",
  databaseURL: "https://reactfire-dbcff.firebaseio.com",
  projectId: "reactfire-dbcff",
  storageBucket: "reactfire-dbcff.appspot.com",
  messagingSenderId: "922522622946",
  appId: "1:922522622946:web:ad34b30b7599c1b1a4b7bb"
};


// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
