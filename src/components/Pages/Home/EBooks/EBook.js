import { useNavigate } from "react-router-dom";
import { withFirebase } from "../../../Firebase";
import * as ROUTES from "../../../../constants/routes";
import { useState } from "react";
import { GrServerCluster } from "react-icons/gr";

const EBook = (props) => {
  const navigateTo = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);

  return (
    <>
      <div className="ebook">
        <img src={props.imgUrl} alt="" />
        <div className="overlay">
          <button onClick={handleDownloadBook} className="download-btn">
            Download
          </button>
        </div>
      </div>

      {isDownloading && (
        <div className="downloading-overlay">
          <div className="loader">
            <GrServerCluster className="icon" />
          </div>
          <p>Getting Response From the Server</p>
        </div>
      )}
    </>
  );

  async function handleDownloadBook() {
    await props.firebase.auth.currentUser.reload();

    if (props.firebase.auth.currentUser) {
      if (
        props.firebase.auth.currentUser.emailVerified ||
        props.firebase.auth.allowWithoutEmailVerification
      ) {
        setIsDownloading(true);
        props.firebase.downloadFile(
          props.downloadAddress,
          props.title,
          setIsDownloading
        );
      } else {
        alert("Please Verify Your email address First!");
      }
    } else {
      navigateTo(ROUTES.SIGN_IN);
    }
  }
};

export default withFirebase(EBook);
