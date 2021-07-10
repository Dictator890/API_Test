import React from "react";
import style from "./TextComponent.module.css";
function TextComponent({ url, extradata, urlText }) {
  return (
    <div className={style.root}>
      <a href={url}>{urlText || "URL"}</a>
      <p>{extradata}</p>
    </div>
  );
}
export default TextComponent;
