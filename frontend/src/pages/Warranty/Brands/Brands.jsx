import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setFiltersState } from '../../../store/filtersSlice';
import Brand from './Brand';

const Brands = () => {
  console.log("hhhhhhhhhhhhh");
    const filters = useSelector((state) => state.filters.filters);
    const products = useSelector((state)=>state.products.allProducts);
    const [chosenBrands , setChosenBrands] = useState([]);
    const dispatch = useDispatch();
    let brands = [];
    products.map((product)=> {
        if(!brands.includes(product.brand)){
          brands.push(product.brand)
        }
    })
    console.log(brands);
 
    const handleBrandsChange =(title)=>{
        let index = chosenBrands.indexOf(title)
    if(index === -1){
         setChosenBrands([...chosenBrands , title]);
        dispatch(
        setFiltersState({
        ...filters,
        brands: [...chosenBrands , title],
         }));
        }else{
             // If the item is already in the array, remove it
        dispatch(
          setFiltersState({
            ...filters,
            brands: chosenBrands.filter((_, i) => i !== index),
          })
        );
        setChosenBrands(chosenBrands.filter((_, i) => i !== index));
        }
       
    }
    console.log(chosenBrands);
    
  return (
   <div className='filter__search'>
    {
        brands.map((brand , i )=>
            <>
                            <Brand
                              key={i}
                              title={brand}
                              onClick={handleBrandsChange}
                            />
                          </>
        )
   }
   </div>
  )
}

export default Brands