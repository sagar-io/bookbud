import PasswordForgetPage from "../../Auth/PasswordForget";
import PasswordChangePage from "../../Auth/PasswordChange";
import { withAuthorization } from "../../Session";

const AccountPage = () => (
  <div className="account-page">
    <h1 className="heading">Account Page</h1>
    <div className="flex">
      <PasswordForgetPage />
      <PasswordChangePage />
    </div>
  </div>
);

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(AccountPage);
