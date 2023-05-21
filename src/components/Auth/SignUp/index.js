import {Link, useNavigate} from 'react-router-dom'
import * as ROUTES from '../../../constants/routes'
import {useState} from 'react'
import {withFirebase } from '../../Firebase'

const SignUpPage = () => (
    <div className='sign-up-container'>
        <h1>Sign Up</h1>
        <SignUpForm />
    </div>
)

const SignUpFormBase = (props) => {
   const initialSignUpUserState = {
    userName: '',
    email: '',
    password1:'',
    password2:'',
    error: null
   }
    const [newUserDetail, setNewUserDetail] = useState({...initialSignUpUserState})
    const navigateProgrammatically = useNavigate();

    let {userName, email, password1, password2, error} = newUserDetail
    const isInvalidDetails =
    password1 === "" ||
    password1 !== newUserDetail.password2 ||
    userName === "" ||
    email === "" ;

    function handleFormSubmit(e) {
        // props.firebase.doSendSignInLinkToEmail(newUserDetail.email)
        props.firebase.doCreateUserWithEmailAndPassword(newUserDetail.email, newUserDetail.password1)
        .then((authUser) => {
            props.firebase.sendEmailVerification(authUser.user)
            return props.firebase.writeDataToDB(authUser.user.uid, userName, email)
        })
        .then(() => {
            // props.firebase.readDataFromDB()
            console.log(props.firebase.auth.currentUser.emailVerified)
            console.log(props.firebase.auth.currentUser)
        })
        .then(() => {
            setNewUserDetail({...initialSignUpUserState})
            navigateProgrammatically(ROUTES.HOME)
        })
        .catch(errorData => {
             setNewUserDetail(prevDetails => ({...prevDetails, error: errorData}))
        })

        e.preventDefault()
   }
   function handleChange(e) {
     setNewUserDetail(prevDetails => 
        ({...prevDetails, [e.target.name]: e.target.value}))
   }

    return (
    <form onSubmit={handleFormSubmit} className='sign-up-form'>
        <input type='text' placeholder='Full Name' name='userName' value={userName} onChange={handleChange}/> 
        <input type='text' placeholder='Email Address' name='email' value={email} onChange={handleChange}/> 
        <input type='password' placeholder='Password' name='password1' value={password1} onChange={handleChange}/> 
        <input type='password' placeholder='Confirm Password' name='password2' value={password2} onChange={handleChange}/> 
        <button disabled={isInvalidDetails} type='submit' onClick={handleFormSubmit}>Sign Up</button>

        {error && <p>{error.message}</p>}
    </form>
    )
}
   
const SignUpForm = withFirebase(SignUpFormBase)

const SignUpLink = () => (
    <p className='sign-up-link'>Don't have a account yet ? <Link to={ROUTES.SIGN_UP}>SignUp</Link></p>
)


export default SignUpPage
export {SignUpLink, SignUpForm}

