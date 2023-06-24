import { GoVerified } from "react-icons/go";
import { ImNotification } from "react-icons/im";
import TabHistory from "./TabHistory";

const RightWrapper = ({name, date, emailVerified, downlodedBookElements, uploadedBookElements}) => {
  return (
    <div className="right-wrapper">
      <h2 className="name">{name}</h2>
      <h3 className="date">Member since: {date}</h3>
      {emailVerified ? (
        <p className="email-varification-tag">
          <GoVerified className="icon" />
          Email Verified
        </p>
      ) : (
        <p className="email-varification-tag">
          <ImNotification className="icon" />
          Unverified Email
        </p>
      )}
      <TabHistory
        downlodedBooks={downlodedBookElements}
        uploadedBooks={uploadedBookElements}
      />
    </div>
  );
};

export default RightWrapper;
