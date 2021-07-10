import React, { useEffect, useState } from "react";
import style from "./SearchBar.module.css";

import searchIcon from "../../icons/search_grey.svg";
function SearchBar({ onSubmit, onTextChange }) {
  const [search, updateSearch] = useState("");
  const onSearchTextUpdated = (e) => {
    updateSearch(e.target.value);
  };

  useEffect(() => {
    if (search && typeof onTextChange === "function") {
      onTextChange(search);
    }
  }, [search]);

  const onButtonSubmit = () => {
    if (typeof onSubmit == "function") {
      onSubmit();
    }
  };
  return (
    <div className={style.root}>
      <img src={searchIcon} alt="SearchIcon" className={style.icon} />
      <input
        type="text"
        className={style.searchInput}
        value={search}
        placeholder="Search"
        onChange={onSearchTextUpdated}></input>
      <button className={style.submitButton} onClick={onButtonSubmit}>
        Search
      </button>
    </div>
  );
}
export default SearchBar;
