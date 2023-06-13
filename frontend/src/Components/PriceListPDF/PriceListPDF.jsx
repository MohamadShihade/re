import React from 'react';
import ReactPDF, { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from './Invoice/Invoice'
import { PDFViewer } from '@react-pdf/renderer';
import invoice from '../../data/invoice-data'
import { useDispatch, useSelector } from 'react-redux';
import { setIsPI, setPiEmployee, setPiProudcts } from '../../store/piSlice';
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { emptyCart } from '../../store/cartSlice';
import { clearFilters } from '../../store/filtersSlice';

const PriceListPDF = () => {
  const navigate = useNavigate();
  const cart = useSelector((state)=>state.cart.cart);
  const {username , status , phone} = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {dispatch(setPiProudcts(cart))
 dispatch(setPiEmployee({employeeName: username , employeePhone: phone}))  
  },[])
  
  
   const pi = useSelector((state)=>state.pi);
   const currency = useSelector((state)=>state.filters.currency);
   const location =useSelector((state)=>state.filters.location);
   const usdToAedRate = useSelector((state) => state.filters.usdToAedRate);

   console.log(location);


  return (
    <div >
       <div style={{marginBottom : "15px"}} className="next_div"  >
              <button className="ags-btn-main" onClick={()=>{ navigate('/user/pricelistinfo')}} ><i class="uil uil-angle-left"></i> Back</button>
              <button className="ags-btn-main-fill" onClick={()=>{navigate('/user/warranty');dispatch(emptyCart());dispatch(clearFilters())}} >Finish <i class="uil uil-check"></i></button>
            </div>
   <PDFViewer width="100%" height="1200" className="app" >
                <Invoice pi={pi} currency={currency} location={location}  usdToAedRate={usdToAedRate} />
   </PDFViewer>
 
    </div>
  )
}

export default PriceListPDF

/*
   
<PDFDownloadLink document={<MyDocument />} fileName="fee_acceptance.pdf">
  {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
</PDFDownloadLink>

*/