import React from "react";
import { useSelector } from "react-redux";
function CountryItem(props) {
  const { title, img, setcheck } = props;
    const filters = useSelector((state) => state.filters.filters);

  return (
    <div class='checkbox'>
      <label class='checkbox-wrapper'>
        <input
          type='checkbox'
          checked ={filters.countries.includes(title)}
          class='checkbox-input '
          onClick={() => props.onClick(title)}
          autocomplete="on"
        />
        <span class='checkbox-tile'>
          {title}
        </span>
      </label>
    </div>
  );
}

export default CountryItem;
