import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { withFirebase} from '../Firebase'
import AuthUserContext from './context'
import * as ROUTES from '../../constants/routes'

// For Protected Routes like account, profile, admin
const withAuthorization = (condition) => Component => {
    const WithAuthorization = (props) => {
        const navigateTo = useNavigate()
        useEffect(() => {
            const listener = props.firebase.auth.onAuthStateChanged(
                authUser => {
                    if(!condition(authUser))
                    // Redirect to sign in page if user is not sign in
                     navigateTo(ROUTES.SIGN_IN)
                }
            )
            return () => listener()
        }, [])
        return (
            <AuthUserContext.Consumer>
                {
                authUser => 
                  condition(authUser) ? (<Component {...props}/>) : null
                }
            </AuthUserContext.Consumer>
        )

    }
    return withFirebase(WithAuthorization)
}

export default withAuthorization