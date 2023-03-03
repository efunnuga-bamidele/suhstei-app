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
  orderBy,
  onSnapshot,
  limit,
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

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        id: userAuth,
        status: "online",
        displayName,
        email,
        createdAt,
        ...additionalinformation
      });
    } catch (error) {
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
export const signOutUser = async () => {
  try {
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
      return "Failed";
    }

  } else {
    try {
      await updateDoc(userRef, { [fieldName]: [...userDocSnapshot.data()[fieldName], { ...requestDetail }] });
      await updateDoc(ownerRef, { [fieldName]: [...ownerDocSnapshot.data()[fieldName], { ...requestDetail }] });
      updateRequestedBook(requestedBook, "Requested")
      return "added";
    } catch (err) {
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


export const createRoom = async (secondUser, currentUser) => {
  const secondUserRef = collection(db, 'users');
  const queryCol = query(secondUserRef, where("displayName", "==", secondUser))
  const querySnapshot = await getDocs(queryCol);

  let secondUserId = "";
  querySnapshot.forEach((doc) => {
    secondUserId = doc.data().id;
    
  });

  const chatRoom_id = currentUser.uid.trim() + "_" + secondUserId.trim()
  const reversedChatRoom_id = secondUserId.trim() + "_" + currentUser.uid.trim()
  let masterRoom_id = "";
  const createdAt = new Date();


  const senderProfile = doc(db, "users", currentUser.uid);
  const receiverProfile = doc(db, "users", secondUserId.trim());
  const getSenderProfile = await getDoc(senderProfile);
  const getReceiverProfile = await getDoc(receiverProfile);
  const createChatRoom = doc(db, "messages", chatRoom_id);
  const getChatRoom = await getDoc(createChatRoom);

  // Handle Sender Update
  if (getSenderProfile.data()['chat']) { //checks if chat has been created
    // check if room_id exist
    const res = getSenderProfile.data()['chat'].filter((items) => items.room_id === chatRoom_id || items.room_id === reversedChatRoom_id)
    if (res.length === 1) {
      // console.log("Can not create duplicate room: ", res[0].room_id);
      masterRoom_id = res[0].room_id;

    } else {
      // console.log("No data")
      // update sender user detail with chat room details
      await updateDoc(senderProfile, {
        chat: [...getSenderProfile.data()['chat'], {
          room_id: chatRoom_id,
          receiver_id: secondUserId.trim(),
          receiver_Name: secondUser,
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
        receiver_Name: secondUser,
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
          receiver_Name: secondUser,
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

  // create chat room
  if (getChatRoom.exists()) {
    masterRoom_id = chatRoom_id;
    console.log("chat exists")

  } else {
    masterRoom_id = chatRoom_id;
    await setDoc(createChatRoom, {
      room_uid: chatRoom_id,
      sender: currentUser.displayName,
      senderId: currentUser.uid,
      senderAvatar: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
      receiver: secondUser,
      receiverId: secondUserId.trim(),
      receiverAvatar: "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
      createdAt: createdAt,
      chat: [
      ]
    })
  }
  return masterRoom_id;
}

export const getActiveMessages = async (currentUser) => {

}


export const getMessages = async (chahRoomId) => {
  const id = "12345"
  const otherId = "69784"
  // const messagesQuery = query(collection(db, "messages"), where("group_id", "array-contains", id), where("group_id", "array-contains", otherId));
  const messagesQuery = query(collection(db, "messages"), where("group_id", "array-contains", otherId));

  const querySnapshot = await getDocs(messagesQuery);

  querySnapshot.forEach((doc) => {
    console.log(doc.id, "=>");
  })
}