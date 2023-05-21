import PasswordForgetPage from '../../Auth/PasswordForget';
import PasswordChangePage from '../../Auth/PasswordChange';
import { withAuthorization } from '../../Session';

const AccountPage = () => (
  <div>
    <h1>Account Page</h1>
    <PasswordForgetPage />
    <PasswordChangePage />
  </div>
);

const condition = authUser => authUser != null

export default withAuthorization(condition)(AccountPage);