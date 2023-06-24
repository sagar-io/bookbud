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
      <NavLink to={ROUTES.LANDING} style={styles}>
        <li className="line-hover">Landing</li>
      </NavLink>

      <NavLink to={ROUTES.HOME} style={styles}>
        <li className="line-hover">Home</li>
      </NavLink>

      <NavLink to={ROUTES.UPLOAD} style={styles}>
        <li className="line-hover">Upload</li>
      </NavLink>
    </ul>
  </nav>
);

const NonAuthNavigation = () => (
  <nav className="main-nav">
    <ul>
      <NavLink to={ROUTES.LANDING} style={styles}>
        <li className="line-hover">Landing</li>
      </NavLink>

      <NavLink to={ROUTES.SIGN_IN} style={styles}>
        <li className="line-hover">Sign In</li>
      </NavLink>
    </ul>
  </nav>
);

export default Navigation;
