import { withFirebase } from "../../Firebase"

const SignOutButtonBase = (props) => (
    <button className="regular-btn" onClick={props.firebase.doSignOut}>Log out</button>
)

const SignOutButton = withFirebase(SignOutButtonBase)

export default SignOutButton