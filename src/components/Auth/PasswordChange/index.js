import {useState} from 'react'
import {withFirebase} from '../../Firebase'

const PasswordChangeForm = (props) => {
    const initial_state = {
        password1: '',
        password2: '',
        error: null
    }
    const [newPasswordDetails, setNewPasswordDetails] = useState({...initial_state})
    const {password1, password2, error} = newPasswordDetails

    const isInvalid = password1 == '' || password1 != password2 
    function updatePassword(e) {
        props.firebase.doPasswordUpdate(password2)
        .then(() => {
            setNewPasswordDetails(({...initial_state}))
        })
        .catch((error) => {
            setNewPasswordDetails((prevDetails) => ({...prevDetails, error: error}))
        })
        e.preventDefault()
    }
    function handleChange(e) {
        setNewPasswordDetails((prevDetails) => ({...prevDetails, [e.target.name]: e.target.value}))
    }
    return (
        <div >
            <form className='change-password-form'>
            <input 
             type='password'
             name="password1"
             onChange={handleChange}
             placeholder="enter new password"
             value={password1}/>
             
             <input 
             type='password'
             name="password2"
             onChange={handleChange}
             placeholder="confirm new password"
             value={password2}/>

             <button disabled={isInvalid} type="submit" onClick={updatePassword}>Update Password</button>
        </form> 

        {error && <p>{error.message}</p>}
        </div>
       
    )
}
export default withFirebase(PasswordChangeForm)