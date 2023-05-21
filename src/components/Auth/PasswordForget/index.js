import { withFirebase } from "../../Firebase";
import { useState } from "react";
import * as ROUTES from '../../../constants/routes'
import {Link} from 'react-router-dom'

const PasswordForgetPage = () => (
    <div className="forget-password-container">
        <h1>Forget Password</h1>
        <PasswordForgetForm />
    </div>
)

const PasswordForgetBase = (props) => {
    const [forgetEmailDetails, setForgetEmailDetails] = useState({
                                                                    email: '',
                                                                    error: null
                                                                })
    const isInvalid = forgetEmailDetails.email === ""
    function submitForgetPassword(e) {
        props.firebase.doPasswordReset(forgetEmailDetails.email)
        .then(() => {
            setForgetEmailDetails(({email: '', error: null}))
        })
        .catch(error => {
            setForgetEmailDetails((prevState) => ({...prevState, error: error}))
        })
        e.preventDefault()
    }

    return (
        <div>
              <form className="forget-password-form">
                <input 
                 type="email" 
                 placeholder="enter e-mail"
                 value={forgetEmailDetails.email}
                 onChange={(e) => setForgetEmailDetails(prevState => ({...prevState, email: e.target.value}))}
                />
                <button disabled={isInvalid} type="submit" onClick={submitForgetPassword}>Submit</button>
            </form>
        {forgetEmailDetails.error && <p>{forgetEmailDetails.error.message}</p>}
        </div>
    )
}

const ForgetPasswordLink = () => (
   <Link to={ROUTES.PASSWORD_FORGET} className="forget-password-link">Forgot Password<span className="ques-mark">?</span></Link>
)

const PasswordForgetForm = withFirebase(PasswordForgetBase)

export {ForgetPasswordLink}
export default PasswordForgetPage 