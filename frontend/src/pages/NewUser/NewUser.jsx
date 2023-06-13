import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../actions/users";
import "./styles.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Employee");
  const handleSubmit = (e) => {
    e.preventDefault();
    let roles = [];
    roles.push(role);
    if (password === confirmPassword) {
      dispatch(createUser({ username, password, roles, phone }));
      showToastMessage(`User ${username} created successfully`);
    } else {
      alert("Password do not match");
    }
    console.log(username, password, confirmPassword, role);
  };
  return (
    <div className="full_page">
      <ToastContainer />
      <div className="card-custom ">
      <div className="card-custom-tittle justify-content-center">
         <h6>Add new User</h6>
         {/* <span className="ags-btn-main-fill border-btn" onClick={()=>{navigate('/user/new_user')}}><i class="uil uil-plus" ></i> Add New</span> */}
      </div>
      <div className="card-custom-body ">
      <form onSubmit={handleSubmit}>
      <div className="row">
         <div className="col-md-12 col-md-12">
            <div className="form-group">
              <label for="username">User Name</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter user name"
                className="form-control"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                autocomplete="on"
              />
            </div>
        </div>
        <div className="col-md-12 col-md-12">
            <div className="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="psws"
              name="password"
              className="from-control"
              placeholder="Enter password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autocomplete="on"
            />
            </div>
        </div>
        <div className="col-md-12 col-md-12">
            <div className="form-group">
            <label for="password">Confirm Password</label>
            <input
              type="password"
              id="c_psws"
              className="from-control"
              placeholder="Enter confirm password"
              name="c_password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              autocomplete="on"
            />
            </div>
        </div>
        <div className="col-md-12 col-md-12">
            <div className="form-group">
            <label for="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter mobile number"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              autocomplete="on"
            />
            </div>
        </div>
        <div className="col-md-12 col-md-12">
            <div className="form-group">
            <label for="role">Role</label>
            <select
              id="role"
              name="role"
              onChange={(e) => {
                setRole(e.target.value);
              }}
            >
              <option value="Admin">Admin</option>
              <option selected={true} value="Sales">
                Sales
              </option>
              <option value="Sales Manager">Sales Manager</option>
              <option value="Financial">Financial</option>
              <option value="Logistics">Logistics</option>
              <option value="Employee">Employee</option>
            </select>
            </div>
        </div>
        {/* <form onSubmit={handleSubmit}>
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="dubai_ahmad_khalil"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <label for="password">Password</label>
          <input
            type="text"
            id="psws"
            name="password"
            placeholder="*************"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <label for="password">Confirm Password</label>
          <input
            type="text"
            id="c_psws"
            name="c_password"
            placeholder="*************"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />

          <label for="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter mobile number"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <label for="role">Role</label>
          <select
            id="role"
            name="role"
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            <option value="Admin">Admin</option>
            <option selected={true} value="Sales">
              Sales
            </option>
            <option value="Sales Manager">Sales Manager</option>
            <option value="Financial">Financial</option>
            <option value="Logistics">Logistics</option>
            <option value="Employee">Employee</option>
          </select>
          <input type="submit" value="Create New User" />
        </form> */}
      </div>
      <div className="col-md-12 col-md-12">
          <div className="buttons-add-pi mt-3">
              <button className="ags-btn-main" onClick={() => {navigate("/user/employees");}} >Back</button>
              <button  type="submit" className="ags-btn-main-fill" >Create</button>
          </div>
      </div>
      </form>
      </div>
      </div>
      {/* <button
        type="button"
        className="previous"
        onClick={() => {navigate("/user/employees");}}
      >
        &laquo;back to employees
      </button> */}
    </div>
  );
};

export default NewUser;
