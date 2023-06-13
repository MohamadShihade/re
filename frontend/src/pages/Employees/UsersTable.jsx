import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updateUser } from "../../actions/users";
import { changeUserPassword, changeUserPhoneNumber, changeUserStatus } from "../../store/usersSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const UsersTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let totalAmount = 0;
  const users = useSelector((state) => state.users.users);
  const showToastMessage = (msg) => {
    toast.success(`${msg}✅`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <>
    <ToastContainer />
          <div className="card-custom">
            <div className="card-custom-tittle">
              <h6>Users</h6>
              <span className="ags-btn-main-fill border-btn" onClick={()=>{navigate('/user/new_user')}}><i class="uil uil-plus" ></i> Add New</span>
          </div>
            <div className="card-custom-body ">
              {/* for desktop */}
              <div className="table-pi-list">
                <div className="pi__table table">
                  <table className="w-full ">
                <thead>
                  <tr className="h-10  text-sm leading-none text-gray-800">
                    <th  >User Name</th>
                    <th  >Role</th>
                    <th  >ACTIONS</th>
                    <th  >Password / Phone</th>
                  </tr>
                </thead>
                <tbody className="">
                  {users.map((user, index) => (
                    <tr className="h-10 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100" key={index}>
                    {/* Name  */}
                      <td  >
                        <p className="text-sm font-medium leading-none text-gray-800">
                          {user.username}
                        </p>
                      </td>
                      
                      <td  >
                        <p className="font-medium">
                          {user.roles}
                        </p>
                      </td>
                      <td  >
                        <button className="ags-btn-main-fill"
                          onClick={() => {
                          dispatch(changeUserStatus({id :user._id , active : user.active? false : true}));
                          }}
                          style={{ marginRight: "20px" ,width : "80px" }}
                        >
                        {user.active ?"Block" : "Unblock"}
                        </button>
                      
                        <button className="ags-btn-main"
                          onClick={() => {
                            dispatch(deleteUser(user._id))
                            showToastMessage(`User ${user.username} deleted Succesfully`);
                          }}
                          variant="contained"
                          style={{marginRight: "20px"}}
                        >
                          Delete
                        </button>

                        <button className="ags-btn-sucess-outlin"
                          onClick={() => {
                            dispatch(updateUser(user._id,user))
                            showToastMessage(`User ${user.username} updated Succesfully`);
                          }}
                        >
                          Confirm
                        </button>
                     
                      </td>
                      <td>
                        <div>
                        <input className="password_txt" style={{width: "180px"}} type="text" placeholder="password"   onChange={(e) => {
                            dispatch(changeUserPassword({id :user._id, password : e.target.value}));
                          }}/>
                          <input className="password_txt" style={{width: "180px"}} type="text" placeholder="Phone Number" value={user.phone} onChange={(e) => {
                            dispatch(changeUserPhoneNumber({id :user._id, phone : e.target.value}));
                          }}/>
                        </div>
                  
                      </td>
                    </tr>
                  ))}
                  
                </tbody>
                  </table>
                </div>
              </div>
                {/* for mobile  */}
                <div className="pi-list">
                {users.map((user, index) => (
                  <div className="item-pi">
                  <div className="item-pi-tittle">
                    <span>{user.username}</span>
                    <span>{user.roles}</span>
                  </div>
                  <div className="item-pi-body">
                    <div class="wrapper">
                      {/* <div class="box a">
                        <p className="text-secondary">PI.No</p>
                        <h6>{proformaInvoice.pi_no}</h6>
                      </div> */}
                      {/* <div class="box b">
                        <p className="text-secondary">Employee</p>
                        <h6>{proformaInvoice?.employee?.split("/")[0]}</h6>
                      </div>
                      <div class="box c">
                        <p className="text-secondary">Status</p>
                        <h6
                          className={`status-table-label ${colorByStatus(
                            roles.includes("Financial") ? proformaInvoice?.financiaApproval : proformaInvoice.managerApproval
                          )}`}
                        >
                          <i
                            className={`uil uil-${iconByStatus(
                              roles.includes("Financial") ? proformaInvoice?.financiaApproval : proformaInvoice.managerApproval
                            )}`}
                          ></i>
                          {roles.includes("Financial") ? proformaInvoice?.financiaApproval : proformaInvoice.managerApproval}
                        </h6>
                      </div> */}
                      {/* <div class="box d">
                        <p className="text-secondary">PDF</p>
                        <button className="ags-btn-pdf" onClick={() => handlePDF(proformaInvoice)}>
                          <span>
                            {" "}
                            <i class="uil uil-import"></i>
                          </span>
                        </button>
                      </div> */}
                      <div class="box e">
                        <p className="text-secondary">Customer</p>
                        <div>
                              <input className="password_txt" style={{width: "180px"}} type="text"  autocomplete="on" placeholder="password"  onChange={(e) => {
                                  dispatch(changeUserPassword({id :user._id, password : e.target.value}));
                                }}/> 
                                <input className="password_txt" style={{width: "180px"}} type="text"  autocomplete="on" placeholder="Phone Number" value={user.phone} onChange={(e) => {
                                  dispatch(changeUserPhoneNumber({id :user._id, phone : e.target.value}));
                                }}/>
                          </div>
                      </div>
                      {/* <div class="box f">
                        <p className="text-secondary">Note</p>
                        <h6> {proformaInvoice.managerMessage}</h6>
                      </div> */}
                      <div class="box g">
                        <p className="text-secondary">Actions</p>
                        <div className="ags-action">

                              <button className="ags-btn-main-fill"
                                onClick={() => {
                                dispatch(changeUserStatus({id :user._id , active : user.active? false : true}));
                                }}
                                style={{ marginRight: "20px" ,width : "80px" }}
                              >
                              {user.active ?"Block" : "Unblock"}
                              </button>
                            
                              <button className="ags-btn-main"
                                onClick={() => {
                                  dispatch(deleteUser(user._id))
                                  showToastMessage(`User ${user.username} deleted Succesfully`);
                                }}
                                variant="contained"
                                style={{marginRight: "20px"}}
                              >
                                Delete
                              </button>

                              <button className="ags-btn-sucess-outlin"
                                onClick={() => {
                                  dispatch(updateUser(user._id,user))
                                  showToastMessage(`User ${user.username} updated Succesfully`);
                                }}
                              >
                                Confirm
                              </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                ))}
                </div>
            </div>
          </div>
      {/* <div className="container mx-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16  text-sm leading-none text-gray-800">
              <th className=" text-left ">NO</th>
              <th  >Username</th>
              <th  >Status</th>
              <th  >Online/Offline</th>
              <th  >Role</th>
              <th  >ACTIONS</th>
            </tr>
          </thead>
          <tbody className="">
            {users.map((user, index) => (
              <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100" key={index}>
                <td className="pl-4 cursor-pointer">
                  <div className="flex items-center">{index + 1}</div>
                </td>
                <td  >
                  <p className="text-sm font-medium leading-none text-gray-800">
                    {user.username}
                  </p>
                </td>
                
                <td  >
                  <p style={{width : "50px"}} className="font-medium">
                    {" "}
                    {user.active  ? "Active" : "Not Active"}
                  </p>
                </td>
                <td  >
                  <p className="font-medium">
                    Online
                  </p>
                </td>
                <td  >
                  <p className="font-medium">
                    {user.roles}
                  </p>
                </td>
                <td  >
                  <Button
                    variant="contained"
                    onClick={() => {
                     dispatch(changeUserStatus({id :user._id , active : user.active? false : true}));
                    }}
                    style={{ marginRight: "20px" ,width : "80px" }}
                    color="primary"
                  >
                  {user.active ?"Block" : "Unblock"}
                  </Button>
                 
                  <Button
                    onClick={() => {
                      dispatch(deleteUser(user._id))
                      showToastMessage(`User ${user.username} deleted Succesfully`);
                    }}
                    variant="contained"
                    style={{ backgroundColor: "red"  , marginRight: "20px"}}
                  >
                    DELETE
                  </Button>
                  <input className="password_txt" style={{width: "180px"}} type="text" placeholder="password"  onChange={(e) => {
                      dispatch(changeUserPassword({id :user._id, password : e.target.value}));
                    }}/>
                 
                </td>
                <td>
                <input className="password_txt" style={{width: "180px"}} type="text" placeholder="Phone Number" value={user.phone} onChange={(e) => {
                      dispatch(changeUserPhoneNumber({id :user._id, phone : e.target.value}));
                    }}/>
                </td>
                <td  > <Button
                    onClick={() => {
                      dispatch(updateUser(user._id,user))
                      showToastMessage(`User ${user.username} updated Succesfully`);
                    }}
                    variant="contained"
                    style={{ backgroundColor: "green" }}
                  >
                    Confirm
                  </Button></td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div> */}
    </>
  );
};

export default UsersTable;
