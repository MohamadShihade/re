import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFiltersState } from "../../store/filtersSlice";
function Category(props) {
  const dispatch = useDispatch();
  const { title, img, checklevel1, setcheck } = props;
  const filters = useSelector((state) => state.filters.filters);
  return (
    <>
      <div className='checkbox'>
        <label className='checkbox-wrapper'>
          <input
           checked ={filters.categories.includes(title)}
            type='checkbox'
            className='checkbox-input'
            onChange={()=>{}}
            autocomplete="on"
            onClick={() => props.onClick(title)}
          />
          <span className='checkbox-tile'>
            <img src={img} alt='' className='logo__level1' />
          </span>
        </label>
      </div>
    </>
  );
}

export default Category;
