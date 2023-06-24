import {useState} from 'react'
import { EmptyBox } from './EmptyBox';

const TabHistory = ({ downlodedBooks, uploadedBooks }) => {
  const [currentTab, setCurrentTab] = useState("downloadedBooks");

  return (
    <div className="tab-container">
      <div className="tab-slider">
        <div
          className={currentTab == "downloadedBooks" ? "active" : ""}
          onClick={() => setCurrentTab("downloadedBooks")}
        >
          Downloaded Books
        </div>
        <div
          className={currentTab == "uploadedBooks" ? "active" : ""}
          onClick={() => setCurrentTab("uploadedBooks")}
        >
          Uploaded Books
        </div>
      </div>

      <div className="tab-content">
        {currentTab == "downloadedBooks" &&
          (downlodedBooks == "" ? (
            <EmptyBox value="Downloaded" />
          ) : (
            <ul className="downloadedBooks">{downlodedBooks}</ul>
          ))}

        {currentTab == "uploadedBooks" &&
          (uploadedBooks == "" ? (
            <EmptyBox value="Uploaded" />
          ) : (
            <ul className="uploadedBooks">{uploadedBooks}</ul>
          ))}
      </div>
    </div>
  );
};

export default TabHistory;
