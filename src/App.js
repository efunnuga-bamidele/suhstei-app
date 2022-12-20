import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';

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

//Profile Pages
import MyBooksPage from './pages/my-books/my-books.page';

//styles
import './App.css';
import { ProtectedLayout } from './components/protected-layout/protected-layout.component';


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
  


  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
         <Route 
              path = '/'
              element = {<HomePage />}
              errorElement = {<ErrorPage />}
            />

            <Route 
              path = '/login'
              element = {
                <ProtectedLayout>
                  <LoginPage />
                </ProtectedLayout>
              }
              errorElement = {<ErrorPage />}
            />

            <Route 
              path = '/signup'
              element = {
                <ProtectedLayout>
                  <SignupPage />
                </ProtectedLayout>
              }
              errorElement = {<ErrorPage />}
            />

            <Route 
              path = '/books'
              element = {<BooksPage />}
              errorElement = {<ErrorPage />}
            />

            <Route 
              path = '/community'
              element = {<CommunityPage />}
              errorElement = {<ErrorPage />}
            />

            <Route 
              path = '/about-us'
              // element = {<CommunityPage />}
              errorElement = {<ErrorPage />}
            />

            <Route 
              path = '/contact'
              // element = {<CommunityPage />}
              errorElement = {<ErrorPage />}
            />
        </>
    )) 
   

    return (
      <div>
        <RouterProvider router={router} />
      </div>
    );
  }

  export default App;
