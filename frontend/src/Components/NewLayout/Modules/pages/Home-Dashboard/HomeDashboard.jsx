import React from 'react'
import { Link } from 'react-router-dom'

export const HomeDashboard = () => {
  return (
    <ul className="grid">
        <li className="grid-item">
          <div className='item-tittle'>
              <h5>Issues</h5>
          </div>
          <div className='item-body'>
          <div className="issues">
            <div className="issues-by-you">
              <h6>By you</h6>
              <div className='issues-item'>
                <span>WFES fair</span>
                <span>23/2/3</span>
                <span>To Sales</span>
                <span><i class="uil uil-times-circle"></i> </span>
              </div>
              <div className='issues-item'>
                <span>Sonex fair</span>
                <span>23/2/3</span>
                <span>To Accounting</span>
                <span><i class="uil uil-check-circle"></i> </span>
              </div>
              <div className='issues-item'>
                <span>New Sales</span>
                <span>23/2/3</span>
                <span>To Finance</span>
                <span><i class="uil uil-clock-three"></i> </span>
              </div>
              <div className='issues-item'>
                <span>Sonex fair</span>
                <span>23/2/3</span>
                <span>To Sales</span>
                <span><i class="uil uil-check-circle"></i> </span>
              </div>
              <div className='issues-item'>
                <span>Sonex fair</span>
                <span>23/2/3</span>
                <span>To Sales</span>
                <span><i class="uil uil-check-circle"></i> </span>
              </div>
              <div className='issues-item'>
                <span>Sonex fair</span>
                <span>23/2/3</span>
                <span>To Sales</span>
                <span><i class="uil uil-check-circle"></i> </span>
              </div>
            </div>
            <div className="issues-for-you">
              <h6>For you</h6>
              <div className='issues-item'>
                <span>New product</span>
                <span>23/2/3</span>
                <span>To Logistic</span>
                <span><i class="uil uil-clock-three"></i> </span>
              </div>
              <div className='issues-item'>
                <span>Sonex fair</span>
                <span>23/2/3</span>
                <span>To Supplier</span>
                <span><i class="uil uil-check-circle"></i> </span>
              </div>
              <div className='issues-item'>
                <span>New Region</span>
                <span>23/2/3</span>
                <span>To Security</span>
                <span><i className="uil uil-times-circle"></i> </span>
              </div>
              <div className='issues-item'>
                <span>Poor moving </span>
                <span>23/2/3</span>
                <span>To Supplier</span>
                <span><i class="uil uil-times-circle"></i> </span>
              </div>
              <div className='issues-item'>
                <span>Poor moving </span>
                <span>23/2/3</span>
                <span>To Supplier</span>
                <span><i class="uil uil-times-circle"></i> </span>
              </div>
              <div className='issues-item'>
                <span>Poor moving </span>
                <span>23/2/3</span>
                <span>To Supplier</span>
                <span><i class="uil uil-times-circle"></i> </span>
              </div>
            </div>
          </div>
          <div className="ags-btn-issue">
              <span >
                <Link to="/dashboard/add-issue">Issue an Issue</Link>
              </span>
            </div>
          </div>
        </li>
        <li className="grid-item">
          <div className='item-tittle'>
              <h5>Marketing Material</h5>
          </div>
          <div className='item-body'>
            <div className="marketing-item">
                <h6>Video</h6>
                <table class="table">
                    <thead>
                      <tr>
                        <th scope="col" className='border-start-0'>Title</th>
                        <th scope="col">Person</th>
                        <th scope="col" className='border-end-0'>E.Release</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='border-start-0'>About Longi</td>
                        <td>Abd</td>
                        <td className='border-end-0'>After 3 Days</td>
                      </tr>
                      <tr>
                        <td className='border-start-0'>Jinko</td>
                        <td>Shoaib</td>
                        <td className='border-end-0'>After 5 Days</td>
                      </tr>
                    </tbody>
                </table>
            </div>
            <div className="marketing-item">
            <h6>Photo</h6>
            <table className="table">
                <thead>
                  <tr>
                    <th scope="col " className='border-start-0'>Title</th>
                    <th scope="col">Person</th>
                    <th scope="col" className='border-end-0'>E.Release</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='border-start-0'>About Longi</td>
                    <td>Abd</td>
                    <td className='border-end-0'>After 3 Days</td>
                  </tr>
                  <tr>
                    <td className='border-start-0'>Jinko</td>
                    <td>Shoaib</td>
                    <td className='border-end-0'>After 5 Days</td>
                  </tr>
                </tbody>
            </table>
            </div>
            <div className="marketing-item">
              <h6>Objective marketing Ordered</h6>
            <table className="table mb-0">
                <thead>
                  <tr>
                    <th scope="col" className='border-start-0'>Title</th>
                    <th scope="col">Person</th>
                    <th scope="col" className='border-end-0'>E.Release</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='border-start-0'>About Longi</td>
                    <td>Abd</td>
                    <td className='border-end-0'>After 3 Days</td>
                  </tr>
                  <tr>
                    <td className='border-start-0 '>Jinko</td>
                    <td className=' '>Shoaib</td>
                    <td className='border-end-0 '>After 5 Days</td>
                  </tr>
                </tbody>
            </table>
            </div>
          </div>
        </li>
        <li className="grid-item">
          <div className='item-tittle'>
              <h5>Customer Management</h5>
          </div>
          <div className='item-body'>
            <div className="grid-managment">
            <div className="managment-item">
              <div className="pie pi_90" >90%</div>
              <p>Customer Engagement target</p>
            </div>
            <div className="managment-item">
              <div class="pie1">
                <span class="overlay">
                  <span>50%</span>
                </span>
              </div>
              <p>Customer Retention</p>
            </div>
            </div>
            <hr />
            <div className="marketing-item">
                <h6>Declining customers</h6>
                <table class="table marketing-table">
                    <thead>
                      <tr>
                        <th scope="col" className='border-start-0'>Name</th>
                        <th scope="col">Handler</th>
                        <th scope="col" className='border-end-0'>Last Purchace</th>
                        <th scope="col" className='border-end-0'>Last interact</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='border-start-0'>sad</td>
                        <td>das</td>
                        <td className='border-end-0'>Since 73 Days</td>
                        <td className='border-end-0'><i class="uil uil-file-alt"></i></td>
                      </tr>
                      <tr>
                        <td className='border-start-0'>sad</td>
                        <td>das</td>
                        <td className='border-end-0'>Since 73 Days</td>
                        <td className='border-end-0'><i class="uil uil-file-alt"></i></td>
                      </tr>
                      <tr>
                        <td className='border-start-0'>sad</td>
                        <td>das</td>
                        <td className='border-end-0'>Since 73 Days</td>
                        <td className='border-end-0'><i class="uil uil-file-alt"></i></td>
                      </tr>
                      <tr>
                        <td className='border-start-0'>sad</td>
                        <td>das</td>
                        <td className='border-end-0'>Since 73 Days</td>
                        <td className='border-end-0'><i class="uil uil-file-alt"></i></td>
                      </tr>
                    </tbody>
                </table>
            </div>
          </div>
        </li>
        <li className="grid-item">
          <div className='item-tittle'>
              <h5>Performa Invoices</h5>
          </div>
          <div className='item-body'>
            <div className="marketing-item">
            <table class="table performa-table ">
            <thead>
              <tr>
                <th scope="col" className='border-start-0'>NO</th>
                <th scope="col">Name</th>
                <th scope="col" className='border-end-0'>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border-start-0'>256</td>
                <td>Osama</td>
                <td className='border-end-0'>
                  <span>Take decision</span>
                </td>
              </tr>
              <tr>
                <td className='border-start-0'>365</td>
                <td>Sara</td>
                <td className='border-end-0'>
                  <span>Take decision</span>
                </td>
              </tr>
              <tr>
                <td className='border-start-0'>985</td>
                <td>Hussam</td>
                <td className='border-end-0'>
                  <span>Take decision</span>
                </td>
              </tr>
              <tr>
                <td className='border-start-0'>698</td>
                <td>Ahmad</td>
                <td className='border-end-0'>
                  <span>Take decision</span>
                </td>
              </tr>
              <tr>
                <td className='border-start-0'>698</td>
                <td>Ahmad</td>
                <td className='border-end-0'>
                  <span>Take decision</span>
                </td>
              </tr>
              <tr>
                <td className='border-start-0'>698</td>
                <td>Ahmad</td>
                <td className='border-end-0'>
                  <span>Take decision</span>
                </td>
              </tr>
              <tr>
                <td className='border-start-0'>698</td>
                <td>Ahmad</td>
                <td className='border-end-0'>
                  <span>Take decision</span>
                </td>
              </tr>
              <tr>
                <td className='border-start-0'>698</td>
                <td>Ahmad</td>
                <td className='border-end-0'>
                  <span>Take decision</span>
                </td>
              </tr>
              <tr>
                <td className='border-start-0'>698</td>
                <td>Ahmad</td>
                <td className='border-end-0'>
                  <span>Take decision</span>
                </td>
              </tr> <tr>
                <td className='border-start-0'>698</td>
                <td>Ahmad</td>
                <td className='border-end-0'>
                  <span>Take decision</span>
                </td>
              </tr> <tr>
                <td className='border-start-0'>698</td>
                <td>Ahmad</td>
                <td className='border-end-0'>
                  <span>Take decision</span>
                </td>
              </tr> <tr>
                <td className='border-start-0'>698</td>
                <td>Ahmad</td>
                <td className='border-end-0'>
                  <span>Take decision</span>
                </td>
              </tr>
            </tbody>
          </table>
            </div>
          </div>
        </li>
        <li className="grid-item">
          <div className='item-tittle'>
              <h5>Hawk Eye </h5>
          </div>
          <div className='item-body'>
          <table class="table  ">
            <tbody>
              <tr>
                <td className='border-start-0'>PowernSun making new strides  to Iraq</td>
              </tr>
              <tr>
                <td className='border-start-0'>JA is offering new type of cells  and Nanosun </td>
              </tr>
              <tr>
                <td className='border-start-0'>PowernSun making new strides  to Iraq</td>
              </tr>
              <tr>
                <td className='border-start-0 border-bottom-0'>PowernSun making new strides  to Iraq</td>
              </tr>
            </tbody>
          </table>
          </div>
        </li>
        <li className="grid-item">
          <div className='item-tittle'>
              <h5>Department Projects </h5>
          </div>
          <div className='item-body'>
            <table class="table  ">
              <tbody>
                <tr>
                  <td className='border-start-0'>Change in the Dynamic of Commission </td>
                </tr>
                <tr>
                  <td className='border-start-0'>Change in the Dynamic of Commission </td>
                </tr>
                <tr>
                  <td className='border-start-0'>Change in the Dynamic of Commission </td>
                </tr>
                <tr>
                  <td className='border-start-0 border-bottom-0'>Change in the Dynamic of Commission </td>
                </tr>
              </tbody>
            </table>
          </div>
        </li>
        <li className="grid-item">
          <div className='item-tittle'>
              <h5>Latest Updates </h5>
          </div>
          <div className='item-body'>
            <table class="table  ">
              <tbody>
                <tr>
                  <td className='border-start-0'>Increase in the budget of the departments</td>
                </tr>
                <tr>
                  <td className='border-start-0'>New Employees in Syrian Marketing team</td>
                </tr>
                <tr>
                  <td className='border-start-0'>Increase in the budget of  the departments</td>
                </tr>
                <tr>
                  <td className='border-start-0 border-bottom-0'> team</td>
                </tr>
              </tbody>
            </table>
          </div>
        </li>
        <li className="grid-item">
          <div className='item-tittle'>
              <h5>Reporting </h5>
          </div>
          <div className='item-body'>
          <table class="table  ">
            <tbody>
              <tr>
                <td className='border-start-0'>Marketing campaign 211 for inverters</td>
              </tr>
              <tr>
                <td className='border-start-0'>SONEX event in Jordan Last june</td>
              </tr>
              <tr>
                <td className='border-start-0'>Marketing campaign 211 for inverters</td>
              </tr>
              <tr>
                <td className='border-start-0 border-bottom-0'>SONEX event in Jordan Last june</td>
              </tr>
            </tbody>
          </table>
          </div>
        </li>
      </ul>
  )
}

export default HomeDashboard