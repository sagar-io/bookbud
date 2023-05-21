import { useState } from "react";
import { BsSuitHeartFill } from "react-icons/bs";

const UploadForm = (props) => {
  const [tabs, setTabs] = useState({
    1: true,
    2: false,
    3: false,
    4: false,
  });
  // const enableDownloadBtn = props.file.eBookName && props.file.eBook && props.file.eBookCover

  function handleNext(e) {
    switch (e.target.name) {
      case "1":
        setTabs((prev) => ({ ...prev, [1]: false, [2]: true }));
        break;
      case "2":
        setTabs((prev) => ({ ...prev, [2]: false, [3]: true }));
        break;
      case "3":
        setTabs((prev) => ({ ...prev, [3]: false, [4]: true }));
        break;
      //  case '4':
      //         setTabs(prev=>({...prev, [3]: false, [4]: true}))
    }
  }
  function handleReUpload() {
    props.setFile({
      eBookName: "",
      eBook: "",
      eBookCover: "",
    });
    setTabs((prev) => ({ ...prev, [4]: false, [1]: true }));
  }

  return (
    <div className="file-uploader-container standard">
      {!tabs[4] && (
        <div className="tab-states">
          <div id="first" style={{ background: tabs[1] ? "black" : "white" }}>
            1
          </div>
          <div id="second" style={{ background: tabs[2] ? "black" : "white" }}>
            2
          </div>
          <div id="third" style={{ background: tabs[3] ? "black" : "white" }}>
            3
          </div>
        </div>
      )}

      {tabs[1] && (
        <div className="first-tab">
          <label htmlFor="eBookName">
            Enter Book Title{" "}
            <span className="light">Title should be short</span>
          </label>
          <input
            type="text"
            id="eBookName"
            name="eBookName"
            value={props.file.eBookName}
            placeholder='e.g.-"Think And Grow Rich"'
            onChange={props.handleFile}
          />
          <button
            name="1"
            className="btn-y"
            disabled={!props.file.eBookName}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      )}

      {tabs[2] && (
        <div className="second-tab">
          <label>Upload eBook (pdf)</label>
          <label
            style={{
              border: props.file.eBook ? "4px solid green" : "4px solid white",
            }}
            htmlFor="ebook-pdf"
            className="upload-label"
          >
            +
          </label>
          <input
            id="ebook-pdf"
            name="eBook"
            type="file"
            onChange={props.handleFile}
          />
          <button
            name="2"
            className="btn-y"
            disabled={!props.file.eBook}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      )}

      {tabs[3] && (
        <div className="third-tab">
          <label>Upload eBook Cover (png/jpeg)</label>
          <label
            style={{
              border: props.file.eBookCover
                ? "4px solid green"
                : "4px solid white",
            }}
            htmlFor="ebook-pdf"
            className="upload-label"
          >
            +
          </label>
          <input
            id="ebook-pdf"
            name="eBookCover"
            type="file"
            onChange={props.handleFile}
          />
          <button
            name="3"
            className="btn-y"
            disabled={!props.file.eBookCover}
            onClick={(e) => {
              props.handleUpload();
              handleNext(e);
            }}
          >
            Upload
          </button>
          {/* <button name='3' className='btn-y' disabled={!props.file.eBookCover} onClick={handleNext}>Upload</button> */}
        </div>
      )}

      {tabs[4] && (
        <div className="thanks-tab">
          <h2>Thanks For Uploading !</h2>
          <BsSuitHeartFill className="icon" />
          <div className="thanks-icon"></div>
          <button name="4" className="btn-x" onClick={handleReUpload}>
            Upload New eBook
          </button>
        </div>
      )}

      {props.error && <div>{props.error}</div>}

      {/* <progress value={progressLevel} max="100">{progressLevel}</progress> */}
    </div>
  );
};

export default UploadForm;
