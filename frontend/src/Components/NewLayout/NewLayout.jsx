import React from 'react'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

const NewLayout = () => {

  const [isOpen ,setIsoOpen] = useState(false)
  return (
    <>
    <div className="ags-header">
      <div className="ags-header-deadline">
        <span>25/3/2023</span>
      </div>
      <div className="ags-header-switch">
        <span><i class="uil uil-angle-left"></i> Daily <i className="uil uil-angle-right"></i> </span>
      </div>
      <div className="ags-header-profile">
      <i className="uil uil-user-circle " id="navbarDropdown" role="button" data-toggle="dropdown"></i>
      {/* <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown">
          Dropdown
        </a> */}
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" > <i className="uil uil-user"></i> Hussen</a>
          <a className="dropdown-item"><i className="uil uil-sign-in-alt"></i> Logout</a>
        </div>
        {/* <span>Hussan</span>
        <span>Logout</span> */}
      </div>
    </div>
    <div className="parent-main">
    <div className="to-do-sidebar">
      <div className="sidebar-tittle">
       <h5>To Do</h5>
      </div>
      <div className='sidebar-body'>
        <ul>
          <li> <i class="uil uil-check-circle"></i> To_Do_1 </li>
          <li><i class="uil uil-check-circle"></i> To_Do_2 </li>
          <li> <i class="uil uil-check-circle"></i> To_Do_3 </li>
          <li><i class="uil uil-check-circle"></i> To_Do_4 </li>
          <li> <i class="uil uil-check-circle"></i> To_Do_5 </li>
          <li> <i class="uil uil-check-circle"></i> To_Do_6 </li>
          <li> <i class="uil uil-check-circle"></i> To_Do_7 </li>
          <li> <i class="uil uil-check-circle"></i> To_Do_8 </li>
          <li> <i class="uil uil-check-circle"></i> To_Do_10 </li>
          <li> <i class="uil uil-check-circle"></i> To_Do_11 </li>
          <li> <i class="uil uil-check-circle"></i> To_Do_12 </li>
          {/* <li> <i class="uil uil-check-circle"></i> To_Do_13 </li>
          <li> <i class="uil uil-check-circle"></i> To_Do_14 </li> */}
        </ul>
      </div>
    </div>
    <div className='main'>
      <Outlet />
    </div>
    </div>
   </>
  )
}

export default NewLayout