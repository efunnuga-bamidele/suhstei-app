import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//firebase import
import {
  onAuthStateChangedListener, 
  createUserDocumentFromAuth
} from './utils/firebase/firebase.utils';

//redux import
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './book/user/user.action'

//pages
import ErrorPage from './pages/error/error.page';
import HomePage from './pages/home/home.page';
import LoginPage from './pages/login/login.page';
import SignupPage from './pages/sign-up/signup.page';
import BooksPage from './pages/books/books.page';
import CommunityPage from './pages/community/community.page';

//styles
import './App.css';

// import HeroBg1 from './assets/images/hero_bg_1.jpg'
// import HeroBg2 from './assets/images/hero_bg_2.jpg'
// import HeroBg3 from './assets/images/hero_bg_3.png'
// import HeroBg4 from './assets/images/hero_bg_4.png'


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user){
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user))
    });

    return unsubscribe;
  }, [])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
      errorElement: <ErrorPage />
    },
    {
      path: '/login',
      element: <LoginPage />,
      errorElement: <ErrorPage />
    },
    {
      path: '/signup',
      element: <SignupPage />,
      errorElement: <ErrorPage />
    }
    ,
    {
      path: '/books',
      element: <BooksPage />,
      errorElement: <ErrorPage />
    },
    {
      path: 'community',
      element: <CommunityPage />,
      errorElement: <ErrorPage />
    }
  ])

    return (
      <div>
        <RouterProvider router={router} />
      </div>
    );
  }

  export default App;
