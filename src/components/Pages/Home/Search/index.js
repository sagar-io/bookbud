import { useState } from "react";
import SearchResult from "./SearchResult";
import { VoiceSearch } from "./VoiceSearch";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="search-container">
      <div className="search-bar-container">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <SearchResult searchQuery={searchQuery} />
    </div>
  );
};

const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <div className="search-bar">
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <VoiceSearch setSearchQuery={setSearchQuery} />
  </div>
);

export default Search;
