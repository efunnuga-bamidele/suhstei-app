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
  arrayUnion,
  arrayRemove,
  where,
  query
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
  // console.log('signInWithGooglePopup Fired')
  signInWithPopup(auth, googleProvider);
}

export const signInWithFacebookPopup = () => {
  // console.log('signInWithFacebookPopup Fired')
  signInWithPopup(auth, facebookProvider)
}

// Firestore initialization
export const db = getFirestore();

// Firebase Collections
const colBookRef = collection(db, 'books');
const colRequestRef = collection(db, 'requests');

// Function to create new user on authentication
export const createUserDocumentFromAuth = async (userAuth, additionalinformation) => {

  // console.log('createUserDocumentFromAuth Fired')

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
          // console.log('error creating the user : ', error.message)
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
export const signOutUser = () => {
  signOut(auth);
}
//Observer to monitor state change in authentication
export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
}
// upload book Image

export const uploadBookImage = async (userID, thumbnail) => {
  const storage = getStorage();
  const storageRef = ref(storage, `thumbnails/${userID}/books/${thumbnail.name}`);

  const img = await uploadBytes(storageRef, thumbnail);

  return await getDownloadURL(img.ref);

}

// Book creation
export const createNewBook = async (userID, thumbnail, bookDetails) => {
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
    if (!userId) return;
    const docRef = doc(db, "books", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

export const getAllBooks = async () => {
  const querySnapshot = await getDocs(colBookRef);
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
}

export const deleteBook = async (userId, booksDetails, imageUrl) => {
    const fieldName = 'mybooks';
    const bookRef = doc(db, 'books', userId)
    await imageDelete(imageUrl)
    try{
      // console.log("updateDoc")
      await updateDoc(bookRef, {[fieldName]: [...booksDetails]})
      return "success"
    }
    catch (err){
      return "failed"
    }
}

const imageDelete = async (imageUrl) => {
    const storage = getStorage()
    const fileRef = ref(storage, imageUrl);
    try{
      await deleteObject(fileRef)
    }catch (err){

    }

}

// export const updateBook = async (userID, thumbnail, bookDetails, imageState) => {
  export const updateBook = async (userId, thumbnail, bookDetails, imageState, initialDetails) => {
    const bookRef = doc(db, 'books', userId);

    if (!imageState){
      imageDelete(initialDetails.imageUrl)

      const imageUrl = await uploadBookImage(userId, thumbnail)

      const bookData = {
        ...bookDetails, ["imageUrl"]: imageUrl
      }
      // Atomically remove a region from the "regions" array field.
      try{
      await updateDoc(bookRef, {
        mybooks: arrayUnion(bookData)
      });
      }catch (err){
          return "failed"
        }
      // Atomically add a new region to the "regions" array field.
      try{
      await updateDoc(bookRef, {
        mybooks: arrayRemove(initialDetails)
      });
      }catch (err){
        return "failed"
      }
      return "success"
    }else{
      
         // Atomically remove a region from the "regions" array field.
      try{
        await updateDoc(bookRef, {
          mybooks: arrayUnion(bookDetails)
        });
        
        }catch (err){
            return "failed"
          }
        // Atomically add a new region to the "regions" array field.
        try{
        await updateDoc(bookRef, {
          mybooks: arrayRemove(initialDetails)
        });
        }catch (err){
          return "failed"
        }
        return "success"
    }
        
  }

  export const getBookById = async (bookId, ownerId) => {
    const docRef = doc(db, "books", ownerId.trim());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("document found!");
      return docSnap.data()['mybooks'].filter(item => item.id === bookId.trim())
      } else {
    }

  }

  export const BorrowBook = async (unique_id, requestedBook, currentUser, requestedAt) => {
    if (!currentUser.uid) return;
    //write request to both owner and borrowers document
    const userRef = doc(db, 'requests', currentUser.uid);
    const ownerRef = doc(db, 'requests', requestedBook.owner_id);
    const userDocSnapshot = await getDoc(userRef);
    const ownerDocSnapshot = await getDoc(ownerRef);
    const fieldName = 'book_requests';

    const requestDetail = {
        id: unique_id,
        book_title: requestedBook.book_title,
        book_author: requestedBook.book_author,
        book_id: requestedBook.id,
        book_owner: requestedBook.book_owner,
        book_owner_id: requestedBook.owner_id,
        borrowers_name: currentUser.displayName,
        request_status: "Pending Approval",
        request_date: requestedAt,
        received_date:null,
        due_date:null,
        return_date:null
    }

    if (userDocSnapshot.data() === undefined && ownerDocSnapshot.data() === undefined){ 
      try{
        await setDoc(userRef, { [fieldName]:[{...requestDetail}]});
        await setDoc(ownerRef, { [fieldName]:[{...requestDetail}]});
        updateRequestedBook(requestedBook, "Requested")
          return "success";
      }catch (err){
        return "Failed";
      }

    } else {
      try{
        await updateDoc(userRef, {[fieldName]: [ ...userDocSnapshot.data()[fieldName], {...requestDetail}]});
        await updateDoc(ownerRef, {[fieldName]: [ ...ownerDocSnapshot.data()[fieldName], {...requestDetail}]});
        updateRequestedBook(requestedBook, "Requested")
        return "added";
      }catch (err){
        return "Failed";
      }
    }
  }

  const updateRequestedBook = async (bookDetails, status) => {
      // console.log("Book Details: ",bookDetails)
      const bookRef = doc(db, 'books', bookDetails.owner_id.trim());

        const bookData = {
          ...bookDetails, ["book_status"]:status
        }

        // console.log("Book Details Modified: ",bookData)
        // Atomically remove a region from the "regions" array field.
        try{
        await updateDoc(bookRef, {
          mybooks: arrayUnion(bookData)
        });
          // 
        }catch (err){
            return "failed"
          }
        // Atomically add a new region to the "regions" array field.
        try{
        await updateDoc(bookRef, {
          mybooks: arrayRemove(bookDetails)
        });
        }catch (err){
          return "failed"
        }
        return "success"

  }

  // collections
  // where owner is me?
  // where borowwer is me?


  export const getBookRequests = async (userID) => {

    console.log("Request Fired")
    const bookRequests = doc(db, "requests", userID);
    const bookRequestsSnap = await getDoc(bookRequests);
    
    return bookRequestsSnap.data();
    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log("No such document!");
    // }
  }
