import { NavLink } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import SignOutButton from "../Auth/SignOut";
import { AuthUserContext } from "../Session";
import { IoSettingsOutline } from "react-icons/io5";

const styles = ({ isActive }) => ({ color: isActive ? "black" : "gray" });

const Navigation = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (authUser ? <AuthNavigation /> : <NonAuthNavigation />)}
  </AuthUserContext.Consumer>
);

const AuthNavigation = () => (
  <nav className="main-nav">
    <ul>
      <li className="line-hover">
        <NavLink to={ROUTES.LANDING} style={styles}>
          Landing
        </NavLink>
      </li>
      <li className="line-hover">
        <NavLink to={ROUTES.HOME} style={styles}>
          Home
        </NavLink>
      </li>
      <li className="line-hover">
        <NavLink to={ROUTES.UPLOAD} style={styles}>
          Upload
        </NavLink>
      </li>
      <li className="nav-settings">
        <IoSettingsOutline className="icon" />
        <ul>
          <li>
            <NavLink to={ROUTES.ACCOUNT} style={styles}>
              Account
            </NavLink>
          </li>
          <li>
            <SignOutButton />
          </li>
        </ul>
      </li>
    </ul>
  </nav>
);

const NonAuthNavigation = () => (
  <nav className="main-nav">
    <ul>
      <li className="line-hover">
        <NavLink to={ROUTES.LANDING} style={styles}>
          Landing
        </NavLink>
      </li>
      <li className="line-hover">
        <NavLink to={ROUTES.SIGN_IN} style={styles}>
          Sign In
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;
