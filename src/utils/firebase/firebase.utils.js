import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  FacebookAuthProvider

} from 'firebase/auth';
import  {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  updateDoc
} from 'firebase/firestore'

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,

} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCQn8z4Z8OnN3xXCHRafwvgqhI_MIeWbag",
    authDomain: "suhstei-d0d28.firebaseapp.com",
    projectId: "suhstei-d0d28",
    storageBucket: "suhstei-d0d28.appspot.com",
    messagingSenderId: "407226505523",
    appId: "1:407226505523:web:2972a1824fe5a9de9e0646"
  };

  //https://suhstei-d0d28.firebaseapp.com/__/auth/handler

initializeApp(firebaseConfig);

// Google authentication
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

const facebookProvider = new FacebookAuthProvider();

facebookProvider.setCustomParameters({
  'display': 'popup'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const signInWithFacebookPopup = () => signInWithPopup(auth, facebookProvider)

// Firestore initialization
export const db = getFirestore();

// Function to create new user on authentication
export const createUserDocumentFromAuth = async (userAuth, additionalinformation) => {

  if (!userAuth) return;

      const userDocRef = doc(db, 'users', userAuth.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
          await setDoc(userDocRef, {
              displayName,
              email,
              createdAt,
              ...additionalinformation
          });
        }catch (error){
          console.log('error creating the user : ', error.message)
        }
      }
      return userDocRef;
}

//create new user with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

//signin with email and password
export const sighAuthUserInWithEmailAndPassword = async (email, password) => {

    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

//Signout user
export const signOutUser = () => signOut(auth);

//Observer to monitor state change in authentication
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

// upload book Image

export const uploadBookImage = async (userID, thumbnail) => {
  const storage = getStorage();
  const storageRef = ref(storage, `thumbnails/books/${userID}/${thumbnail.name}`);

  const img = await uploadBytes(storageRef, thumbnail);

  return await getDownloadURL(img.ref);

}

export const createNewBook = async (userID, thumbnail, bookDetails) => {
  
  if(!userID) return;

  // store book image in storage
  const imageUrl = await uploadBookImage(userID, thumbnail);

  const docRef = doc(db, 'books', userID);
  const docSnapshot = await getDoc(docRef);
  // create ID for book input field
  const fieldName = userID+bookDetails.book_title.replace(/\s/g, '').toLowerCase();

  if (docSnapshot.data() === undefined){
    try{
        await setDoc(docRef,{[fieldName]:{...bookDetails, imageUrl}});
        return "success";
    }catch(err){
        console.log("error creating new book: ", err.message);
        return "error";
    }
  }
  else{
      await updateDoc(docRef, {[fieldName]:{...bookDetails, imageUrl}});
      return "added";
  }
};

