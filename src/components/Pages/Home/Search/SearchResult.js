import { useState, useEffect } from "react";
import EBook from "../EBooks/EBook";
import { withFirebase } from "../../../Firebase";

const SearchResult = (props) => {
  const [eBooksData, setEBooksData] = useState([]);

  useEffect(() => {
    let listener = props.firebase.readDataFromDB(handleEBookData, "eBooks/");
    return () => listener;
  }, []);

  function handleEBookData(snapshot) {
    const eBooksDataObj = snapshot.val();
    const eBooksDataArr = Object.keys(eBooksDataObj).map((eBookName) => ({
      ...eBooksDataObj[eBookName],
    }));
    setEBooksData(eBooksDataArr);
  }

  const searchedElements = eBooksData
    .filter((ebookData) => isMatched(ebookData.title))
    .map((ebookData, id) => (
      <EBook
        key={id}
        imgUrl={ebookData.eBookCoverDownloadUrl}
        title={ebookData.title}
        downloadAddress={ebookData.eBookDownloadUrl}
      />
    ));

  return <div className="all-ebooks">{searchedElements}</div>

  function isMatched(title) {
    return title.toLowerCase().includes(props.searchQuery.toLowerCase());
  }
};

export default withFirebase(SearchResult);