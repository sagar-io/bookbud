import { withFirebase } from "../../Firebase"
import { useNavigate } from "react-router-dom"

const SignOutButtonBase = (props) => {
    let navigate = useNavigate();
    return <button className="btn-danger" onClick={() => {props.firebase.doSignOut(); navigate('/signin')} }>Log out</button>
}

const SignOutButton = withFirebase(SignOutButtonBase)

export default SignOutButton