import SignOutButton from "../../../Auth/SignOut";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../../constants/routes";

const LeftWrapper = ({ profilePhoto }) => {
  return (
    <div className="left-wrapper">
      <img
        width="120px"
        height="120px"
        className="profile-pic"
        src={profilePhoto}
      />
      <Link to={ROUTES.ACCOUNT}>
        <button className="btn-action">Account Settings</button>
      </Link>
      <SignOutButton />
    </div>
  );
};

export default LeftWrapper;
