import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { TfiEmail } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
import { withFirebase } from "../../Firebase";

const Providers = (props) => {
  const goTo = useNavigate();
  return (
    <>
      <p className="small-txt continue-txt">Continue with...</p>
      <div className="providers">
        <Provider
          Icon={FcGoogle}
          name="Google"
          handleClick={handleGoogleSignUp}
        />
        <Provider
          Icon={BsGithub}
          name="GitHub"
          handleClick={handleGitHubSignUp}
        />
        <Provider
          Icon={TfiEmail}
          name="Email"
          handleClick={handleSignUpWithEmail}
        />
      </div>
    </>
  );

  function handleSignUpWithEmail() {
    goTo("/signup/sign-up-with-email");
  }
  async function handleGoogleSignUp() {
    const status = await props.firebase.signInWithGoogle();
    props.firebase.writeUserDataToDB(
      status.user.uid,
      status.user.displayName,
      status.user.email,
      status.user.photoURL
    );
    goTo(ROUTES.HOME);
  }
  async function handleGitHubSignUp() {
    try {
      const status = await props.firebase.signInWithGithub();
      props.firebase.writeUserDataToDB(
        status.user.uid,
        status._tokenResponse.screenName,
        status._tokenResponse.email,
        status.user.photoURL
      );
      goTo(ROUTES.HOME);
    } catch (error) {
      // console.log("Couldn't Signin with Github", error);
    }
  }
};

const Provider = ({ Icon, name, handleClick }) => (
  <div className="provider" onClick={handleClick}>
    <Icon className="icon" />
    <p>{name}</p>
  </div>
);

export default withFirebase(Providers);
