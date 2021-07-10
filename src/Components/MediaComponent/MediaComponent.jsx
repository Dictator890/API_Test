import React from "react";
import style from "./MediaComponent.module.css";
function MediaComponent({ url, isVideo }) {
  return (
    <div className={style.root}>
      {isVideo ? <video src={url} controls></video> : <img src={url}></img>}
    </div>
  );
}
export default MediaComponent;
