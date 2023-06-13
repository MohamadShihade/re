import React from 'react'

const Brand = ({title , img , setcheck , onClick}) => {
  return (
    <div class='checkbox'>
      <label class='checkbox-wrapper'>
        <input
          type='checkbox'
          class='checkbox-input'
          onClick={() => onClick(title)}
        />
        <span class='checkbox-tile'>
          {title}
        </span>
      </label>
    </div>
  );
}

export default Brand