import { initializeApp } from 'firebase/app';
import emailjs from '@emailjs/browser'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  FacebookAuthProvider,
  sendEmailVerification,
  updateEmail,
  sendPasswordResetEmail,
  deleteUser, 
  reauthenticateWithCredential

} from 'firebase/auth';
import {
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
  query,
  onSnapshot,
  FieldValue,
} from 'firebase/firestore'

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,

} from 'firebase/storage'

import {
  getDatabase,
  } from 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
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
export const signInWithGooglePopup = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  await updateDoc(doc(db, "users", result.user.uid), {
    isOnline: true,
  });
}


export const signInWithFacebookPopup = async () => {
  // console.log('signInWithFacebookPopup Fired')
  const result = await signInWithPopup(auth, facebookProvider)
  await updateDoc(doc(db, "users", result.user.uid), {
    isOnline: true,
  });
}


// Firestore initialization
export const db = getFirestore();

export const database = getDatabase();

// Firebase Collections
const colBookRef = collection(db, 'books');
// const colRequestRef = collection(db, 'requests');

// Function to create new user on authentication
export const createUserDocumentFromAuth = async (userAuth, additionalinformation) => {

  // console.log('createUserDocumentFromAuth Fired')

  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        id: userAuth.uid,
        isOnline: true,
        firstName: "",
        lastName: "",
        gender: "",
        state: "",
        city: "",
        country: "",
        displayName,
        email,
        createdAt,
        ...additionalinformation
      });
    } catch (error) {
      // console.log('error creating the user : ', error.message)
    }
  }
  return userSnapshot.data();
}

//create new user with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

//signin with email and password
export const sighAuthUserInWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  const result = await signInWithEmailAndPassword(auth, email, password);

  await updateDoc(doc(db, "users", result.user.uid), {
    isOnline: true,
  });
  return result;
};

//Signout user
export const signOutUser = async () => {
  try {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    })
    await signOut(auth);

    return "success"
  } catch (error) {
    return "failed"
  }
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
  if (!userID) return;
  // store book image in storage
  const imageUrl = await uploadBookImage(userID, thumbnail);

  const docRef = doc(db, 'books', userID);
  const docSnapshot = await getDoc(docRef);
  const fieldName = 'mybooks';

  if (docSnapshot.data() === undefined) {
    try {
      await setDoc(docRef, { [fieldName]: [{ ...bookDetails, imageUrl }] });
      return "success";
    } catch (err) {
      console.log("error creating new book: ", err.message);
      return "error";
    }
  }
  else {
    await updateDoc(docRef, { [fieldName]: [...docSnapshot.data()[fieldName], { ...bookDetails, imageUrl }] })
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
  try {
    // console.log("updateDoc")
    await updateDoc(bookRef, { [fieldName]: [...booksDetails] })
    return "success"
  }
  catch (err) {
    return "failed"
  }
}

const imageDelete = async (imageUrl) => {
  const storage = getStorage()
  const fileRef = ref(storage, imageUrl);
  try {
    await deleteObject(fileRef)
  } catch (err) {

  }

}

// export const updateBook = async (userID, thumbnail, bookDetails, imageState) => {
export const updateBook = async (userId, thumbnail, bookDetails, imageState, initialDetails) => {
  const bookRef = doc(db, 'books', userId);

  if (!imageState) {
    imageDelete(initialDetails.imageUrl)

    const imageUrl = await uploadBookImage(userId, thumbnail)

    const bookData = {
      ...bookDetails, ["imageUrl"]: imageUrl
    }
    // Atomically remove a region from the "regions" array field.
    try {
      await updateDoc(bookRef, {
        mybooks: arrayUnion(bookData)
      });
    } catch (err) {
      return "failed"
    }
    // Atomically add a new region to the "regions" array field.
    try {
      await updateDoc(bookRef, {
        mybooks: arrayRemove(initialDetails)
      });
    } catch (err) {
      return "failed"
    }
    return "success"
  } else {

    // Atomically remove a region from the "regions" array field.
    try {
      await updateDoc(bookRef, {
        mybooks: arrayUnion(bookDetails)
      });

    } catch (err) {
      return "failed"
    }
    // Atomically add a new region to the "regions" array field.
    try {
      await updateDoc(bookRef, {
        mybooks: arrayRemove(initialDetails)
      });
    } catch (err) {
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
    received_date: null,
    due_date: null,
    return_date: null
  }

  if (userDocSnapshot.data() === undefined && ownerDocSnapshot.data() === undefined) {
    try {
      await setDoc(userRef, { [fieldName]: [{ ...requestDetail }] });
      await setDoc(ownerRef, { [fieldName]: [{ ...requestDetail }] });
      updateRequestedBook(requestedBook, "Requested")
      return "success";
    } catch (err) {
      // console.log("error 1: ", err)
      return "Failed";
    }

  }
  else if (userDocSnapshot.data() === undefined && ownerDocSnapshot.data() !== undefined) {
    try {
      await setDoc(userRef, { [fieldName]: [{ ...requestDetail }] });
      await updateDoc(ownerRef, { [fieldName]: [...ownerDocSnapshot.data()[fieldName], { ...requestDetail }] });
      updateRequestedBook(requestedBook, "Requested")
      return "success";
    } catch (err) {
      // console.log("error 2: ", err)
      return "Failed";
    }
  }
  else if (userDocSnapshot.data() !== undefined && ownerDocSnapshot.data() === undefined) {
    try {
      await updateDoc(userRef, { [fieldName]: [...userDocSnapshot.data()[fieldName], { ...requestDetail }] });
      await setDoc(ownerRef, { [fieldName]: [{ ...requestDetail }] });
      updateRequestedBook(requestedBook, "Requested")
      return "success";
    } catch (err) {
      // console.log("error 3: ", err)
      return "Failed";
    }
  }
  else {
    try {
      await updateDoc(userRef, { [fieldName]: [...userDocSnapshot.data()[fieldName], { ...requestDetail }] });
      await updateDoc(ownerRef, { [fieldName]: [...ownerDocSnapshot.data()[fieldName], { ...requestDetail }] });
      updateRequestedBook(requestedBook, "Requested")
      return "added";
    } catch (err) {
      // console.log("error 4 ", err)
      return "Failed";
    }
  }
}

const updateRequestedBook = async (bookDetails, status) => {
  // console.log("Book Details: ",bookDetails)
  const bookRef = doc(db, 'books', bookDetails.owner_id.trim());

  const bookData = {
    ...bookDetails, ["book_status"]: status
  }

  // console.log("Book Details Modified: ",bookData)
  // Atomically remove a region from the "regions" array field.
  try {
    await updateDoc(bookRef, {
      mybooks: arrayUnion(bookData)
    });
    // 
  } catch (err) {
    return "failed"
  }
  // Atomically add a new region to the "regions" array field.
  try {
    await updateDoc(bookRef, {
      mybooks: arrayRemove(bookDetails)
    });
  } catch (err) {
    return "failed"
  }
  return "success"

}


export const getBookRequests = async (userID) => {

  console.log("Request Fired")
  const bookRequests = doc(db, "requests", userID);
  const bookRequestsSnap = await getDoc(bookRequests);

  return bookRequestsSnap.data();
}

export const getProfile = async (profileID) => {

  try {
    const userDocRef = doc(db, 'users', profileID);
    const userSnapshot = await getDoc(userDocRef);

    return userSnapshot.data();
  } catch (error) {
    return "Failed to get profile details"
  }

}

export const RequestResponse = async (originalBook, requestedBook, canceledAt, currentUser, action, bookStatus) => {
  if (!currentUser.uid) return;
  //write request to both owner and borrowers document
  const userRef = doc(db, 'requests', currentUser.uid);
  const ownerRef = doc(db, 'requests', originalBook.owner_id);

  const requestDetail = {
    ...requestedBook,
    ["request_status"]: action,
    ['cancel_date']: canceledAt,
  }
  try {
    await updateDoc(userRef, {
      book_requests: arrayUnion(requestDetail)
    });
    await updateDoc(userRef, {
      book_requests: arrayRemove(requestedBook)
    });

    // 
  } catch (err) {
    return "failed"
  }
  // Atomically add a new region to the "regions" array field.
  try {
    await updateDoc(ownerRef, {
      book_requests: arrayUnion(requestDetail)
    });
    await updateDoc(ownerRef, {
      book_requests: arrayRemove(requestedBook)
    });
  } catch (err) {
    return "failed"
  }
  updateRequestedBook(originalBook, bookStatus)

  return "success"




}


export const createRoom = async (secondUser, currentUser, currentUserProfile) => {
  // check for book owner profile in database
  const secondUserRef = collection(db, 'users');
  const queryCol = query(secondUserRef, where("displayName", "==", secondUser))
  const querySnapshot = await getDocs(queryCol);

  //Store ID and photoURL in variable
  let secondUserId = "";
  let secondUserAvatarURL = ""
  querySnapshot.forEach((doc) => {
    secondUserId = doc.data().id;
    secondUserAvatarURL = doc.data().photoURL
  });

  // Create room document using currentuser and bookowner id
  const chatRoom_id = currentUser.uid.trim() + "_" + secondUserId.trim()
  const reversedChatRoom_id = secondUserId.trim() + "_" + currentUser.uid.trim()

  let masterRoom_id = "";
  const createdAt = new Date();


  const senderProfile = doc(db, "users", currentUser.uid.trim());
  const receiverProfile = doc(db, "users", secondUserId.trim());
  const getSenderProfile = await getDoc(senderProfile);
  const getReceiverProfile = await getDoc(receiverProfile);


  // Handle Sender Update
  if (getSenderProfile.data()['chat']) { //checks if chat has been created
    // check if room_id exist in user profile
    const res = getSenderProfile.data()['chat'].filter((items) => items.room_id === chatRoom_id || items.room_id === reversedChatRoom_id)
    if (res.length === 1) {
      // console.log("Can not create duplicate room: ", res[0].room_id);
      masterRoom_id = res[0].room_id;

    } else {
      // console.log("No data")
      // update sender user detail with chat room details  as well as previous rooms details
      await updateDoc(senderProfile, {
        chat: [...getSenderProfile.data()['chat'], {
          room_id: chatRoom_id,
          receiver_id: secondUserId.trim(),
          receiver_name: secondUser,
          sender_id: currentUser.uid,
          sender_name: currentUser.displayName,
          createdAt: createdAt

        }
        ]
      })
    }

  } else {
    await updateDoc(senderProfile, {
      chat: [{
        room_id: chatRoom_id,
        receiver_id: secondUserId.trim(),
        receiver_name: secondUser,
        sender_id: currentUser.uid,
        sender_name: currentUser.displayName,
        createdAt: createdAt

      }
      ]
    })
  }

  // Handle receiver update
  if (getReceiverProfile.data()['chat']) { //checks if chat has been created
    // check if room_id exist
    const res = getReceiverProfile.data()['chat'].filter((items) => items.room_id === chatRoom_id || items.room_id === reversedChatRoom_id)
    if (res.length === 1) {
      // console.log("Can not create duplicate room: ", res[0].room_id)
    } else {
      // console.log("No data")
      // update receiver user detail with chat room details
      await updateDoc(receiverProfile, {
        chat: [...getReceiverProfile.data()['chat'], {
          room_id: chatRoom_id,
          receiver_id: secondUserId.trim(),
          receiver_name: secondUser,
          sender_id: currentUser.uid,
          sender_name: currentUser.displayName,
          createdAt: createdAt

        }
        ]
      })


    }

  } else {
    // update receiver user detail with chat room details
    await updateDoc(receiverProfile, {
      chat: [{
        room_id: chatRoom_id,
        receiver_id: secondUserId.trim(),
        receiver_name: secondUser,
        sender_id: currentUser.uid,
        sender_name: currentUser.displayName,
        createdAt: createdAt

      }
      ]
    })
  }

  const createChatRoom = doc(db, "messages", chatRoom_id);
  const createChatRoom_rev = doc(db, "messages", reversedChatRoom_id);
  const getChatRoom = await getDoc(createChatRoom);
  const getChatRoom_rev = await getDoc(createChatRoom_rev);

  if (getChatRoom.exists()) {
    masterRoom_id = chatRoom_id;
    // console.log("chat exists: ", chatRoom_id)
  }
  else if (getChatRoom_rev.exists()) {
    masterRoom_id = reversedChatRoom_id;
    // console.log("chat exists", reversedChatRoom_id)
  }
  else if (!getChatRoom.exists() || !getChatRoom_rev.exists()) {
    masterRoom_id = chatRoom_id;
    let avatarURL = ""
    if (currentUserProfile.photoURL) {
      avatarURL = currentUserProfile.photoURL
    }else{
      avatarURL = avatarURL = ""
    }
    await setDoc(createChatRoom, {
      room_uid: chatRoom_id,
      sender: currentUser.displayName,
      senderId: currentUser.uid,
      senderAvatar: avatarURL,
      receiver: secondUser,
      receiverId: secondUserId.trim(),
      receiverAvatar: secondUserAvatarURL,
      createdAt: createdAt,
      chat: [
      ]
    })
  }
  return masterRoom_id;
}

// Email verification mail
export const sendVerificationEmail = async () => {
  if (!auth.currentUser) return;
  try {
    await sendEmailVerification(auth.currentUser)
    return "success"

  } catch (err) {
    return "error"
  }
}

// Reset email account
export const updateUserEmail = async (newEmail) => {
  try {
    await updateEmail(auth.currentUser, newEmail)
    return "Email updated"

  } catch (err) {
    return "error"
  }
}

//Delete user Account
export const deleteAccount = async () => {
  const user = auth.currentUser;
  try {
    await deleteUser(user)
    return "User deleted"

  } catch (err) {
    return "error"
  }
}

//Reset password Mail
export const sendResetPasswordMail = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return "success"

  } catch (err) {
    return "error"
  }
}

export const userOnlineStstus = async (userUID) => {

  // if (userUID) {
  //   console.log("Current user: ", userUID);
  //   var uid = userUID




  //   const userStatusDatabaseRef = dRef(database, '/status/' + uid)
  //   const userStatusFirestoreRef = doc(db, '/status/' + uid);

  //   const isOfflineForFirestore = {
  //     state: 'offline',
  //     last_changed: serverTimestamp()
  //   }

  //   const isOnlineForFirestore = {
  //     state: 'online',
  //     last_changed: serverTimestamp()
  //   }

  //   var isOfflineForDatabase = {
  //     state: 'offline',
  //     last_changed: serverTimestamp()
  // };

  // var isOnlineForDatabase = {
  //     state: 'online',
  //     last_changed: serverTimestamp()
  // };


  //   dRef(database, '.info/connected').on('value', (snapshot) => {
  //     if (snapshot.val() == false) {
  //       userStatusFirestoreRef.set(isOfflineForFirestore);
  //       return;
  //     };

  //     userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function () {
  //       userStatusDatabaseRef.set(isOnlineForDatabase);

  //       // We'll also add Firestore set here for when we come online.
  //       userStatusFirestoreRef.set(isOnlineForFirestore);
  //     });
  //   })
  // }

  // collection('status')
  //   .where('state', '==', 'online')
  //   .onSnapshot(function(snapshot) {
  //       snapshot.docChanges().forEach(function(change) {
  //           if (change.type === 'added') {
  //               var msg = 'User ' + change.doc.id + ' is online.';
  //               console.log(msg);
  //               // ...
  //           }
  //           if (change.type === 'removed') {
  //               var msg = 'User ' + change.doc.id + ' is offline.';
  //               console.log(msg);
  //               // ...
  //           }
  //       });
  //   });

}

export const getUserProfileData = async (userID) => {
  if (!userID) return;

  const profileQuery = doc(db, "users", userID.trim())
  const QuerySnapShot = await getDoc(profileQuery);

  if (QuerySnapShot.exists()) {
    return QuerySnapShot.data()
  }
}

// upload Profile Image
export const uploadProfileImage = async (userID, thumbnail) => {

  const storage = getStorage();
  const storageRef = ref(storage, `thumbnails/${userID}/profile/${thumbnail.name}`);

  const img = await uploadBytes(storageRef, thumbnail);

  return await getDownloadURL(img.ref);

}

// Book creation
export const updateProfile = async (userID, thumbnail, imageUrl, profileDetail) => {
  if (!userID) return "error";

  let photoURL = '';

  if (thumbnail) {
    imageDelete(imageUrl);
    photoURL = await uploadProfileImage(userID, thumbnail);

  }

  const docRef = doc(db, 'users', userID);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    if (thumbnail) {
      await updateDoc(docRef, { ...profileDetail, photoURL })
      return "success";
    } else {
      await updateDoc(docRef, { ...profileDetail })
      return "success";
    }
  }
};

export const retrieveProfileUpdate = async (userID) => {
  const docRef = doc(db, 'users', userID);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    console.log(docSnapshot.data())
    return docSnapshot.data();
  }

}


export const sendContactMessage = async (form) => {
  return await emailjs.sendForm("service_wwju1ee", "template_6qgf5z8", form, "ODzKrI1eM90wmFfxS")
}




