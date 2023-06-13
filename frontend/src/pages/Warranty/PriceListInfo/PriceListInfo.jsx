import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Table from '../../../Components/Table/Table'
import { setIsPI } from '../../../store/piSlice'
import InvoiceInfo from '../../MakePi/InvoiceInfo'
const PriceListInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div >
      <div className="next_div"  >
              <button className="ags-btn-main" onClick={()=>{ navigate('/user/warranty')}} > Back</button>
              <button className="ags-btn-main-fill" onClick={()=>{dispatch(setIsPI(false)); navigate('/user/pricelistpdf')}} >Next <i class="uil uil-angle-right-b"></i></button>
            </div>
    <InvoiceInfo/>
    <Table/>
    </div>
  )
}

export default PriceListInfo