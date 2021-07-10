import React, { useEffect, useState } from "react";
import Filter from "../Components/Filter/Filter";
import MediaComponent from "../Components/MediaComponent/MediaComponent";
import SearchBar from "../Components/SearchBar/SearchBar";
import style from "./Page.module.css";

import NetworkCalls from "../NetworkRequest";
import TextComponent from "../Components/TextComponent/TextComponent";

function Page() {
  //Used to store the selected filter state
  const [selectedFilter, updateselectedFilter] = useState(null);

  //Used to store the value of search bar
  const [searchvalue, updatesearchvalue] = useState("");

  //Used to store the data recevied from the network and its type
  /**
   {
     result :Array of the results
     type:Type according to filter
   }
   */
  const [data, updateData] = useState(null);

  //The filters used in the application
  const filters = {
    Text: 1,
    Image: 2,
    Video: 3,
  };

  /**
   *
   * @param {Number} mediaType
   * @param {Array} result
   * @returns The formatted object to be stored in the data state
   */
  const formatdata = (mediaType, result) => {
    return { mediaType: mediaType, result: result };
  };

  /**
   *
   * @param {String} value
   * Function passed to the searchbar component used to store the state of the searchbar
   */
  const onSearchChange = (value) => {
    if (value) {
      updatesearchvalue(value);
    }
  };

  /**
   *
   * @param {Object} data
   * Store the filter in the proper state.
   */
  const onFilterChange = (data) => {
    updateselectedFilter(data.text);
  };

  //Passed to the searchbar component and it is triggered when the search button is clicked
  const onSubmit = () => {
    if (selectedFilter && searchvalue) {
      switch (selectedFilter) {
        case filters.Text:
          NetworkCalls.requestText(searchvalue).then((data) => {
            updateData(formatdata(filters.Text, data));
          });
          break;
        case filters.Image:
          NetworkCalls.requestImage(searchvalue).then((data) => {
            updateData(formatdata(filters.Image, data));
          });
          break;
        case filters.Video:
          NetworkCalls.requestVideo(searchvalue).then((data) => {
            updateData(formatdata(filters.Video, data));
          });
          break;
      }
    }
  };

  return (
    <div className={style.root}>
      <div className={style.rootwrapper}>
        <nav className={style.menubar}>
          <p>SearchAnything.com</p>
        </nav>
        <div>
          <SearchBar
            onTextChange={onSearchChange}
            onSubmit={onSubmit}></SearchBar>
          <Filter onChange={onFilterChange}></Filter>
        </div>

        {data ? (
          data.mediaType !== filters.Text ? (
            <div className={`${style.mediacomponentwrapper}`}>
              {data.mediaType === filters.Image
                ? data?.result?.map((url) => {
                    return <MediaComponent url={url}></MediaComponent>;
                  })
                : data?.result?.map((url) => {
                    return <MediaComponent url={url} isVideo></MediaComponent>;
                  })}
            </div>
          ) : (
            <div className={style.textcomponentwrapper}>
              {data?.result?.map((value) => {
                return (
                  <React.Fragment>
                    <TextComponent
                      extradata={value.snippet}
                      url={value.url}
                      urlText={value.title}></TextComponent>
                    <div className={style.gap}></div>
                  </React.Fragment>
                );
              })}
            </div>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
export default Page;

/**
 * 1. MediaComponent-The component which is used for rendering videos and images
 * 2. TextComponent- The component which is used to render the text search
 * 3. Filter-The component used to display the filter bar
 * 4. SearchBar-The component used to show the search bar and submit button
 */
