import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPiProudcts } from "../../store/piSlice";

const FinalPi = () => {
  const dispatch = useDispatch();
  const piProducts = useSelector((state) => state.cart.cart);
  dispatch(setPiProudcts(piProducts));
  console.log(useSelector((state) => state.pi.piProducts));
  console.log(useSelector((state) => state.pi.piInfo));
  return <div>FinalPi</div>;
};

export default FinalPi;
