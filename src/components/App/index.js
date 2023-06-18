import {Routes, Route} from 'react-router-dom'
import { useEffect, useState, createContext } from 'react';
import { withFirebase } from '../Firebase';
import Navigation from '../Navigation'
import '../../styles/css/main.css'
import * as ROUTES from '../../constants/routes'
import LandingPage from '../Pages/Landing';
import SignUpPage from '../Auth/SignUp';
import SignInPage from '../Auth/SignIn';
import PasswordForgetPage from '../Auth/PasswordForget/';
import HomePage from '../Pages/Home';
import AccountPage from '../Pages/Account';
import AdminPage from '../Admin';
import UploadPage from '../Pages/Uploader'
import {AuthUserContext} from '../Session'
import { TopLogo } from '../Top Logo';
import Providers from '../Auth/SignUp/Providers';
import { SignUpWithEmail } from '../Auth/SignUp/SignUpWithEmail';

const App = (props) => {
    const [authUser, setAuthUser] = useState(null)

    useEffect(() => {
        const listener = props.firebase.auth.onAuthStateChanged(
            authUser => {
                authUser ? setAuthUser(authUser) :
                           setAuthUser(null)
            }
        )
        return () => {
            listener()
        }
    }, [])
    return ( 
        <AuthUserContext.Provider value={authUser}>
         <div className='app'>
          <TopLogo/>
          <Navigation />
            <Routes>
                <Route path={ROUTES.SIGN_IN} element={<SignInPage />}/>
                <Route path={ROUTES.SIGN_UP} element={<SignUpPage />}>
                    <Route path='/signup' element={<Providers/>}/>
                    <Route path='/signup/sign-up-with-email' element={<SignUpWithEmail/>}/>
                </Route>
                <Route path={ROUTES.LANDING} element={<LandingPage />}/>
                <Route path={ROUTES.HOME} element={<HomePage />}/>
                <Route path={ROUTES.UPLOAD} element={<UploadPage/>}/>
                <Route path={ROUTES.ACCOUNT} element={<AccountPage />}/>
                <Route path={ROUTES.ADMIN} element={<AdminPage />}/>
                <Route path={ROUTES.PASSWORD_FORGET} element={<PasswordForgetPage />}/>
            </Routes>
        </div>
        </AuthUserContext.Provider>
    )
}
export default withFirebase(App)