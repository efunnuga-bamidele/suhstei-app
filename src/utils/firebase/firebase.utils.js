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
  updateDoc,
  collection,
  getDocs,
  onSnapshot,
} from 'firebase/firestore'

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,

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
let connectionCount = 0;
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
export const signInWithGooglePopup = () => {
  console.log('signInWithGooglePopup Fired')
  signInWithPopup(auth, googleProvider);
}

export const signInWithFacebookPopup = () => {
  console.log('signInWithFacebookPopup Fired')
  signInWithPopup(auth, facebookProvider)
}

// Firestore initialization
export const db = getFirestore();

// Firebase Collections
// const colBookRef = collection(db, 'books');
// const colUserRef = collection(db, 'users');

// Function to create new user on authentication
export const createUserDocumentFromAuth = async (userAuth, additionalinformation) => {

  console.log('createUserDocumentFromAuth Fired')

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
  console.log('createAuthUserWithEmailAndPassword Fired')
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};

//signin with email and password
export const sighAuthUserInWithEmailAndPassword = async (email, password) => {
  console.log('sighAuthUserInWithEmailAndPassword Fired')
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};

//Signout user
export const signOutUser = () => {
  console.log('signOutUser Fired')
  signOut(auth);
}
//Observer to monitor state change in authentication
export const onAuthStateChangedListener = (callback) => {
  console.log('onAuthStateChangedListener Fired')
  onAuthStateChanged(auth, callback);
}
// upload book Image

export const uploadBookImage = async (userID, thumbnail) => {
  console.log('uploadBookImage Fired')
  const storage = getStorage();
  const storageRef = ref(storage, `thumbnails/${userID}/books/${thumbnail.name}`);

  const img = await uploadBytes(storageRef, thumbnail);

  return await getDownloadURL(img.ref);

}

// Book creation
export const createNewBook = async (userID, thumbnail, bookDetails) => {
  console.log('createNewBook Fired')
  if(!userID) return;
  // store book image in storage
  const imageUrl = await uploadBookImage(userID, thumbnail);

  const docRef = doc(db, 'books', userID);
  const docSnapshot = await getDoc(docRef);
  const fieldName = 'mybooks';

  if (docSnapshot.data() === undefined){
    try{
        await setDoc(docRef,{[fieldName]:[{...bookDetails, imageUrl}]});
        return "success";
    }catch(err){
        console.log("error creating new book: ", err.message);
        return "error";
    }
  }
  else{
    await updateDoc(docRef, {[fieldName]: [ ...docSnapshot.data()[fieldName], {...bookDetails, imageUrl}]})
    return "added";
  }
};

// get books by user
export const getUserBooks = async (userId) => {
  console.log('getUserBooks Fired')
    // if (!userId) return;
    // connectionCount += 1;
    // const docRef = doc(db, "books", userId);
    // const docSnap = await getDoc(docRef);
    // return docSnap.data();
}

export const getAllBooks = async () => {
  console.log('getAllBooks Fired')
  // unsub()
  // connectionCount += 1;
  // const collectionRef = collection(db, "books");
  // const q = query(collectionRef);
  // const querySnapshot = await getDocs(q);
  // console.log(querySnapshot.docs.reduce((doc) => doc))
  // return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
  // const querySnapshot = await getDocs(colBookRef);
  // return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
}

export const deleteBook = async (userId, booksDetails, imageUrl) => {
  console.log('deleteBook Fired')
    const fieldName = 'mybooks';
    const bookRef = doc(db, 'books', userId)
    await imageDelete(imageUrl)
    return await updateDoc(bookRef, {[fieldName]: [...booksDetails]})
}

const imageDelete = async (imageUrl) => {
  console.log('imageDelete Fired')
  connectionCount += 1;
    const storage = getStorage()
    const fileRef = ref(storage, imageUrl);
    try{
      await deleteObject(fileRef)
    }catch (err){

    }

}

export const updateBook = async (userID, thumbnail, bookDetails, imageState) => {
  console.log('updateBook Fired')
    // console.log(userID, thumbnail, bookDetails, imageState)
    // if(!userID) return;
    // if(imageState)
    // {
    //   const docRef = doc(db, 'books', userID);
    //   // const docRef = doc(db, `books/${userID}`, userID);
    //   const docSnapshot = await getDoc(docRef);
    //   const fieldName = 'mybooks';

    //   const q = query(collection(db, "books"), where("id", "==", bookDetails.id));


    //   const querySnapshot = await getDocs(q);
    //   // console.log(querySnapshotdoc.data())
    //   querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id, " => ", doc.data());
    //   });
      // const q = query(collection(db, "books"), where(`${fieldName}.id`, "==", bookDetails.id));
      // const querySnapshot = await getDocs(q);
      // const modifiedData = docSnapshot.data()[fieldName].filter((doc) => doc.id === bookDetails.id)
      
      // console.log(modifiedData("book_owner"))
      
      // return querySnapshot.docs.map(docSnapshot => docSnapshot.data());


      // console.log(...docSnapshot.data()[fieldName])
      // console.log(bookDetails)
    //   try{
    //     await updateDoc(docRef, {[fieldName]: [ ...docSnapshot.data()[fieldName], {...bookDetails}]})
    //     // await updateDoc(docRef, {[fieldName]: [ ...docSnapshot.data()[fieldName], {...bookDetails, imageUrl}]})
    //     return "success";
    //   }catch(err){
    //     console.log("error creating new book: ", err.message);
    //     return "error";
    // }
    // }
    // else
    // {
    //   // store book image in storage
    //   const uploadedImageUrl = await uploadBookImage(userID, thumbnail);
          
    //   const docRef = doc(db, 'books', userID);
    //   const docSnapshot = await getDoc(docRef);
    //   const fieldName = 'mybooks';


    //     try{
    //       await updateDoc(docRef, {[fieldName]: [ ...docSnapshot.data()[fieldName], {...bookDetails}]})
    //         return "success";
    //     }catch(err){
    //         console.log("error creating new book: ", err.message);
    //         return "error";
    //     }
    // }
}


