import React, { useEffect, useState } from "react";
import style from "./Filter.module.css";
function Filter({ onChange }) {
  const filters = {
    Text: 1,
    Image: 2,
    Video: 3,
  };

  const onChipChangeClick = (e) => {
    updatecurSelected(parseInt(e.target.dataset.value));
  };

  const getchipclassName = (index) => {
    const highlighted_class = style.highlighted;
    const normal_class = style.chip;
    if (index === curSelected) {
      return `${normal_class} ${highlighted_class}`;
    } else {
      return `${normal_class}`;
    }
  };

  const [curSelected, updatecurSelected] = useState(1);

  useEffect(() => {
    console.log(curSelected);
    if (curSelected && typeof onChange === "function") {
      onChange({ text: curSelected, index: filters[curSelected] });
    }
  }, [curSelected]);
  return (
    <div className={style.root}>
      {Object.keys(filters).map((value) => {
        return (
          <p
            className={getchipclassName(filters[value])}
            data-value={filters[value]}
            onClick={onChipChangeClick}>
            {value}
          </p>
        );
      })}
    </div>
  );
}
export default Filter;
