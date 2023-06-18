import { SignInLink } from "../SignIn";
import bgImg from "../../../assets/images/xy31.jpg";
import { Outlet } from "react-router-dom";
import { FcLike } from "react-icons/fc";

export const SignUpProviders = () => {
  return (
    <div className="sign-up-provider-wrapper">
      <div className="bg-img">
        <img src={bgImg} alt="" />
      </div>
      <div className="providers-wrapper">
        <h1>Create Account</h1>
        <p className="small-txt">
          Start you journey with us. We promise it'll be smooth <FcLike />
        </p>
        <Outlet />
        <SignInLink />
      </div>
    </div>
  );
};
