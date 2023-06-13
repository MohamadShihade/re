import React from "react";
function ProductItem(props) {
  return (
    <div>
      <div>Print</div>
      <div>
        <img src={props.data.image[2]} alt='' />
        <div className='product__description'>{props.data.code}</div>
        <div>{props.data.price}</div>
      </div>
    </div>
  );
}

export default ProductItem;
