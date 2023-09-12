import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';

// ADD HERE YOUR FIREBASE CONFIGURATION VALUES
const firebaseConfig = ({
    apiKey: "AIzaSyBtM-x-MqfaTvugpLwoJqdVh9o14BjfNmQ",
    authDomain: "todolist-2c03b.firebaseapp.com",
    databaseURL: "https://todolist-2c03b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "todolist-2c03b",
    storageBucket: "todolist-2c03b.appspot.com",
    messagingSenderId: "783590066308",
    appId: "1:783590066308:web:ac1dcac2d932dc8b08dad1"
    });


const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const TODOS_REF = 'todos';
export const USERS_REF = '/users/';