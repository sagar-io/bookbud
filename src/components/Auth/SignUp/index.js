import {Link} from 'react-router-dom'
import SignUpForm from './SignUpForm'
import * as ROUTES from '../../../constants/routes'
import { SignUpProviders } from './SignUpProviders'

const SignUpPage = () => (
    <div className='sign-up-container'>
        <SignUpProviders />
    </div>
)

const SignUpLink = () => (
    <p className='sign-up-link'>Don't have a account yet ? <Link to={ROUTES.SIGN_UP}>SignUp</Link></p>
)

export default SignUpPage
export {SignUpLink, SignUpForm}

