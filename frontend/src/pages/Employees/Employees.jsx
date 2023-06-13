import React from 'react'
import './styles.css'
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';
import {  getUsersAction } from '../../actions/users';
import { useDispatch } from 'react-redux';
import UsersTable from './UsersTable';
import { useNavigate } from 'react-router-dom';



const Employees = () => {
const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getUsersAction())
  },[dispatch] )
  return (
    <>
    {/* <button type="button" className='new_usr_but' onClick={()=>{navigate('/user/new_user')}} >Add new Employee</button> */}
    <UsersTable/> </>
 )
}

export default Employees