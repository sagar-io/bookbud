import { useEffect, useState } from "react";
import withAuthorization from "../../Session/withAuthorization";
import LeftWrapper from "./leftWrapper";
import RightWrapper from "./rightWrapper";

const Profile = ({ firebase }) => {
  const [userData, setUserData] = useState({});

  let {
    name,
    emailVerified,
    uid,
    date,
    downloadedBooks,
    uploadedBooks,
    likedBooks,
    profilePhoto,
  } = userData;

  useEffect(() => {
    let listener = () => {};
    if (firebase.auth.currentUser) {
      fetchUserData();
      listener = firebase.readDataFromDB(handleUsersObj, `users/${uid}`);
    }
    return () => listener();
  }, [firebase.auth.currentUser, uid]);

  let downlodedBookElements = downloadedBooks
    ? downloadedBooks.map((book, id) => (
        <li key={`downloaded-${book}-${id}`}>{book}</li>
      ))
    : "";

  let uploadedBookElements = uploadedBooks
    ? uploadedBooks.map((book, id) => (
        <li key={`uploaded-${book}-${id}`}>{book}</li>
      ))
    : "";

  let likedBookElements = likedBooks
    ? likedBooks.map((book, id) => <li key={`liked-${book}-${id}`}>{book}</li>)
    : "";

  return (
    <div className="profile-wrapper">
      <LeftWrapper profilePhoto={profilePhoto} />
      <RightWrapper
        name={name}
        date={date}
        emailVerified={emailVerified}
        downlodedBookElements={downlodedBookElements}
        uploadedBookElements={uploadedBookElements}
      />
    </div>
  );

  function fetchUserData() {
    let { uid, emailVerified } = firebase.auth.currentUser;
    if (firebase.auth.currentUser.providerData[0].providerId == "github.com")
      emailVerified = true;
    const userObj = {
      uid,
      emailVerified,
      date: currentDate(firebase.auth.currentUser.metadata.createdAt),
    };
    setUserData(userObj);
  }
  function handleUsersObj(snapshot) {
    const userObj = snapshot.val();
    let profilePhoto = userObj.profilePhoto
      ? userObj.profilePhoto
      : "https://firebasestorage.googleapis.com/v0/b/my-contact-page-89.appspot.com/o/user%2Fafro-avatars.png?alt=media&token=26175078-6a9c-436f-9138-2b008e7ae123";

    setUserData((prev) => ({
      ...prev,
      downloadedBooks: handleArray(userObj.downloadedBooks),
      likedBooks: handleArray(userObj.likedBooks),
      uploadedBooks: handleArray(userObj.uploadedBooks),
      name: userObj.userName,
      profilePhoto,
    }));
  }
  function currentDate(dateInMiliSecond) {
    const dateInSecond = dateInMiliSecond / 1000;
    const date = new Date(0);
    date.setUTCSeconds(dateInSecond);
    const year = date.getFullYear();
    const month = date.toLocaleDateString("en-US", { month: "long" });
    return `${year}, ${month}`;
  }
  function handleArray(obj) {
    if (obj) {
      const arr = Object.values(obj);
      return [...new Set(arr)];
    } else return [];
  }
};

const condition = (authUser) => authUser != null;
export default withAuthorization(condition)(Profile);
