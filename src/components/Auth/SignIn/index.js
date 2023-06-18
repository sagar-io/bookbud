import { SignUpLink } from "../SignUp";
import { ForgetPasswordLink } from "../PasswordForget";
import { useState } from "react";
import { withFirebase } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignInPage = () => (
  <div className="sign-in-container">
    <h1>Sign In</h1>
    <SignInForm />
    <h4>Or</h4>
    <SignInWithGoogle />
    <SignInWithGithub />
    <ForgetPasswordLink />
    <SignUpLink />
  </div>
);

const SignInFormBase = (props) => {
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
    error: null,
  });

  const { email, password, error } = userDetail;
  const navigateProgrammatically = useNavigate();

  function handleDetailsChange(e) {
    setUserDetail((prevDetail) => ({
      ...prevDetail,
      [e.target.name]: e.target.value,
    }));
  }
  function handleSignIn(e) {
    props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setUserDetail({
          email: "",
          password: "",
          error: null,
        });
      })
      .then(() => {
        navigateProgrammatically(ROUTES.HOME);
      })
      .catch((error) => {
        setUserDetail((prevDetail) => ({ ...prevDetail, error: error }));
      });
    e.preventDefault();
  }
  const invalidSignIn = email === "" || password === "";

  return (
    <div>
      <form className="sign-in-form">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleDetailsChange}
          value={email}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleDetailsChange}
          value={password}
        />

        <button disabled={invalidSignIn} onClick={handleSignIn}>
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
};

const SignInWithGoogleBase = (props) => {
  const navigateProgrammatically = useNavigate();

 async function handleSignIn() {
    const status = await props.firebase.signInWithGoogle();
    console.log(status)
    navigateProgrammatically(ROUTES.HOME);
  }
  return (
    <button
      className="popup-sign-in-btn google-popup-sign-in-btn "
      onClick={handleSignIn}
    >
      <FcGoogle className="icon" />
      <p>Continue with Google</p>
    </button>
  );
};

const SignInWithGithubBase = (props) => {
  const navigateProgrammatically = useNavigate();

  async function handleSignIn() {
    try {
      const result = await props.firebase.signInWithGithub();
      console.log(result)
      props.firebase.auth["allowWithoutEmailVerification"] = true;
      navigateProgrammatically(ROUTES.HOME);
    } catch (err) {
      console.log("Couldn't Signin", err);
    }
  }
  return (
    <button
      className="popup-sign-in-btn github-popup-sign-in-btn"
      onClick={handleSignIn}
    >
      <FaGithub className="icon" />
      <p>Continue with Github</p>
    </button>
  );
};

const SignInLink = () => (
  <div>
    <p>Already have an account ?</p>
    <Link to={ROUTES.SIGN_IN}>Sign In &gt;</Link>
  </div>
)

const SignInWithGithub = withFirebase(SignInWithGithubBase);
const SignInWithGoogle = withFirebase(SignInWithGoogleBase);
const SignInForm = withFirebase(SignInFormBase);

export {SignInLink}
export default SignInPage;
