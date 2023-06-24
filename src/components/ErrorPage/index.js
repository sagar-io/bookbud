import errorImage from "../../assets/images/error.svg";

const ErrorPage = () => {
  return (
    <div className="error-page">
        <img src={errorImage} />
        <p>Page Not Found</p>
    </div>
  );
};

export default ErrorPage;
