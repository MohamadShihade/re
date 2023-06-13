import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setProductQty,
  removeProductFromWarrantyList,
} from "../../../../store/warrantySlice";
import { contents } from "./test";
const TablePage = () => {
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.warranty.total);
  const selectedProducts = useSelector((state) => state.warranty.products);
  const [qty, setQty] = useState("");
  console.log(selectedProducts);

  const newTR = (item, index) => {
    return (
      <tr
        className='h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100'
        key={index}>
        <td className='pl-4 cursor-pointer'>
          <div className='flex items-center'>{index + 1}</div>
        </td>
        <td className='pl-12'>
          <p className='text-sm font-medium leading-none text-gray-800'>
            {item.code}
          </p>
        </td>
        <td className='pl-12'>
          <p className='font-medium'>{item.qty}</p>
        </td>

        <td className='pl-12'>
          <TextField
            variant='outlined'
            onChange={(e) => {
              setQty(e.target.value);
            }}
            style={{ width: "150px", marginRight: "20px" }}
          />
          <Button
            onClick={() => {
              dispatch(removeProductFromWarrantyList(item));
            }}
            variant='contained'
            style={{ backgroundColor: "red" }}>
            Check
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className='container mx-auto'>
        <table className='w-full whitespace-nowrap'>
          <thead>
            <tr className='h-16  text-sm leading-none text-gray-800'>
              <th className='font-normal text-left '>NO</th>
              <th className='font-normal text-left pl-12'>ITEMS</th>
              <th className='font-normal text-left '>QTY(PCS)/(WATTS)</th>

              <th className='font-normal text-left pl-12 '>Serial Number</th>

              <th className='font-normal  pl-12'>ACTIONS</th>
            </tr>
          </thead>
          <tbody className=''>
            {selectedProducts.map((item, index) => (
              <>
                {[...Array(parseInt(item.qty))].map((e, i) => {
                  console.log(i);
                  console.log(item);
                  return newTR(item, index);
                })}
              </>
            ))}

            <tr className='h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100'>
              <td className='pl-12'>
                <p className='text-sm font-medium leading-none text-gray-800'></p>
              </td>
              <td className='pl-12'>
                <p className='text-sm font-medium leading-none text-gray-800'></p>
              </td>
              <td className='pl-12'>
                <p className='text-sm font-medium leading-none text-gray-800'></p>
              </td>
              <td className='pl-12'>
                <p className='text-sm font-medium leading-none text-gray-800'>
                  Total Invoice :
                </p>
              </td>
              <td className='pl-12'>
                <p className='text-sm font-medium leading-none text-gray-800'>
                  {totalAmount}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TablePage;
