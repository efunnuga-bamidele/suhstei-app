import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, Navigate } from 'react-router-dom';

//firebase import
import {
  onAuthStateChangedListener, 
  createUserDocumentFromAuth
} from './utils/firebase/firebase.utils';

//redux import
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './store/user/user.action'

//pages
import ErrorPage from './pages/error/error.page';
import HomePage from './pages/home/home.page';
import LoginPage from './pages/login/login.page';
import SignupPage from './pages/sign-up/signup.page';
import BooksPage from './pages/books/books.page';
import CommunityPage from './pages/community/community.page';
import bookViewPage from './pages/books/book-view.page';
import AboutUsPage from './pages/about-us/about-us.page';
import ContactPage from './pages/contact/contact.page';

//Profile Pages
import MyBooksPage from './pages/my-books/my-books.page';
import CreateBookPage from './pages/my-books/create-book.page';
import DashboardPage from './pages/dashboard/dashboard.page';
import SettingsPage from './pages/settings/settings.page';
import LendingRequestPage from './pages/book-requests/lending-request.page';
import BorrowRequestPage from './pages/book-requests/borrow-request.page';
import ClosedRequstPage from './pages/book-requests/closed-request.page';

// Protection Routes
import { ProtectedLayout } from './components/protected-layout/protected-layout.component';
import { ProfileLayout }  from './components/profile-layout/profile-layout.component'; 
//styles
import './App.css';
import BookViewPage from './pages/books/book-view.page';


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
  }, [dispatch])
  


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
              path = '/view-book'
              element = {<BookViewPage />}
              // errorElement ={<BooksPage />}
              errorElement ={<Navigate replace to='/books' />}
            />

            <Route 
              path = '/community'
              element = {<CommunityPage />}
              errorElement = {<ErrorPage />}
            />

            <Route 
              path = '/about-us'
              element = {<AboutUsPage />}
              errorElement = {<ErrorPage />}
            />

            <Route 
              path = '/contact'
              element = {<ContactPage />}
              errorElement = {<ErrorPage />}
            />

            {/* Profile Routes */}

            <Route
              path='/dashboard'
              element= {
                <ProfileLayout>
                    <DashboardPage />
                </ProfileLayout>
              }
              errorElement= {<ErrorPage />}
            />

            <Route
              path='/my-books'
              element={
                <ProfileLayout>
                  <MyBooksPage />
                </ProfileLayout>
              }
              errorElement={<ErrorPage />}
              />

            <Route
              path='/create-book'
              element={
                <ProfileLayout>
                  <CreateBookPage />
                </ProfileLayout>
              }
              errorElement={<ErrorPage />}
              />

            <Route
              path='/lending-request'
              element={
                <ProfileLayout>
                  <LendingRequestPage/>
                </ProfileLayout>
              }
              errorElement={<ErrorPage />}
            />
            <Route
              path='/borrow-request'
              element={
                <ProfileLayout>
                  <BorrowRequestPage/>
                </ProfileLayout>
              }
              errorElement={<ErrorPage />}
            />

          <Route
            path='/closed-request'
            element={
              <ProfileLayout>
                <ClosedRequstPage />
              </ProfileLayout>
            }
            errorElement={<ErrorPage />}
          />

          <Route
              path='/settings'
              element={
                <ProfileLayout>
                  <SettingsPage />
                </ProfileLayout>
              }
              errorElement={<ErrorPage />}
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
