import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey:            'AIzaSyAMVhCiaePVPAtQtF4BLg3-HpyTyGdkoxo',
  authDomain:        'cover--zone.firebaseapp.com',
  databaseURL:       'https://cover--zone-default-rtdb.firebaseio.com',
  projectId:         'cover--zone',
  storageBucket:     'cover--zone.firebasestorage.app',
  messagingSenderId: '626773914224',
  appId:             '1:626773914224:web:905d006b22c52e0eb9fab5',
  measurementId:     'G-CT0CPGRQKX',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
