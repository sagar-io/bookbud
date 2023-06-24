import logo from "../../assets/images/logo-b.png";
import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";

const TopLogo = ({ firebase }) => {
  let profileUrl = null;
  if (firebase.auth.currentUser) {
    profileUrl = firebase.auth.currentUser.photoURL
      ? firebase.auth.currentUser.photoURL
      : "https://firebasestorage.googleapis.com/v0/b/my-contact-page-89.appspot.com/o/user%2Fafro-avatars.png?alt=media&token=26175078-6a9c-436f-9138-2b008e7ae123";
  }

  return (
    <div className="main-logo-container">
      <img className="m-logo" src={logo} alt="" />
      <h1 className="main-logo">BookBud</h1>
      <div>
        {
          firebase.auth.currentUser &&
          <Link to="/profile">
            <img className="profile-img-nav" src={profileUrl} />
          </Link>
        }
      </div>
    </div>
  );
};

export default withFirebase(TopLogo);
