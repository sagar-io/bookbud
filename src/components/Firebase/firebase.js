import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword,
  sendSignInLinkToEmail,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
// Realtime database
import { getDatabase, onValue, ref, set } from "firebase/database";
// Firebase Storage for Download things
import {
  getStorage,
  getDownloadURL,
  ref as sRef,
  listAll,
  uploadBytesResumable,
} from "firebase/storage";

const config = {
  apiKey: "AIzaSyBBIiIfMcE0q_7Zm596EQYDdJR3VP7qLIE",
  authDomain: "my-contact-page-89.firebaseapp.com",
  projectId: "my-contact-page-89",
  storageBucket: "my-contact-page-89.appspot.com",
  messagingSenderId: "764757300986",
  appId: "1:764757300986:web:eca054fd2a638f16939b43",
  databaseURL:
    "https://my-contact-page-89-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "gs://my-contact-page-89.appspot.com/",
};
const actionCodeSettings = {
  url: "https://premium-ebook-store.netlify.app/",
  handleCodeInApp: true,
  iOS: {
    bundleId: "com.example.ios",
  },
  android: {
    packageName: "com.example.android",
    installApp: true,
    minimumVersion: "12",
  },
  dynamicLinkDomain: "example.page.link",
};

const app = initializeApp(config);
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

class Firebase {
  constructor() {
    initializeApp(config);
    this.auth = auth;
  }
  doCreateUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(this.auth, email, password);

  sendEmailVerification = (user) =>
    sendEmailVerification(user).then(() => {
      console.log("Email Verification Sent.....");
    });

  doSignInWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(this.auth, email, password);

  doSendSignInLinkToEmail = (email) => {
    sendSignInLinkToEmail(this.auth, email, actionCodeSettings)
      .then(() => {
        console.log("Email Link Sent Successfully !");
      })
      .catch((error) => {
        console.log(error.code + " " + error.message);
      });
  };

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => sendPasswordResetEmail(this.auth, email);
  doPasswordUpdate = (password) => updatePassword(password);

  writeDataToDB = (uid, userName, email) => {
    return set(ref(db, `users/${uid}`), { userName, email });
  };

  writeEBookDataToDB = (title, eBookDownloadUrl, eBookCoverDownloadUrl) => {
    return set(ref(db, `eBooks/${title}`), {
      title,
      eBookDownloadUrl,
      eBookCoverDownloadUrl,
    });
  };

  readDataFromDB = (handleUsersObj, path) => {
    let usersRef = ref(db, path);
    let listener = onValue(usersRef, (snapshot) => handleUsersObj(snapshot));
    return listener;
  };

  uploadEBookFiles = (file, setProgressLevel) => {
    let eBookDownloadUrl, eBookCoverDownloadUrl;

    const eBookStorageRef = sRef(storage, `ebooks/${file.eBookName}`);
    const eBookCoverStorageRef = sRef(
      storage,
      `ebooks-cover/${file.eBookName}-cover`
    );

    const uploadeBookTask = uploadBytesResumable(eBookStorageRef, file.eBook);
    uploadeBookTask.on(
      "state_changed",
      (snap) => {
        setProgressLevel((prev) => ({
          ...prev,
          ["eBookProgressLevel"]:
            (snap.bytesTransferred / snap.totalBytes) * 100,
        }));
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(eBookStorageRef).then((downloadUrl) => {
          eBookDownloadUrl = downloadUrl;

          if (eBookCoverDownloadUrl && eBookDownloadUrl) {
            console.log("my func 1 running.");
            this.writeEBookDataToDB(
              file.eBookName,
              eBookDownloadUrl,
              eBookCoverDownloadUrl
            );
            eBookCoverDownloadUrl = null;
            eBookDownloadUrl = null;
            return true;
          }
        });
      }
    );
    const uploadeBookCoverTask = uploadBytesResumable(
      eBookCoverStorageRef,
      file.eBookCover
    );
    uploadeBookCoverTask.on(
      "state_changed",
      (snap) => {
        console.log(
          "eBook Cover Progress ->" +
            (snap.bytesTransferred / snap.totalBytes) * 100
        );
        setProgressLevel((prev) => ({
          ...prev,
          ["eBookCoverProgressLevel"]:
            (snap.bytesTransferred / snap.totalBytes) * 100,
        }));
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(eBookCoverStorageRef).then((downloadUrl) => {
          eBookCoverDownloadUrl = downloadUrl;

          if (eBookCoverDownloadUrl && eBookDownloadUrl) {
            console.log("my func 2 running.");
            this.writeEBookDataToDB(
              file.eBookName,
              eBookDownloadUrl,
              eBookCoverDownloadUrl
            );
            eBookCoverDownloadUrl = null;
            eBookDownloadUrl = null;
            return true;
          }
        });
      }
    );
  };

  downloadFile = (downloadAddress, eBookName, setIsDownloading) => {
    fetch(downloadAddress).then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = fileURL;
        a.download = `${eBookName}.pdf`;
        a.click();
        setIsDownloading(false);
      });
    });
  };

  getAllBooksList = () => {
    listAll(sRef(storage, "ebooks/"))
      .then((res) => {
        console.log(res.items[0].name);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => console.log("Signin with google successfull..."))
      .catch((err) => console.log(err));
  };

  signInWithGithub = async () => {
    return await signInWithPopup(auth, githubProvider);
  };
}

export default Firebase;
