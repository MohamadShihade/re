import React from 'react'
import "./add-isuue.scss";
export const AddIssue = () => {
  let departments=[
    {
      id:1,
      name:'Administrative',
      icon :'uil-dashboard',
      isSelected:false,
      brands:[
        {
          id:1,
          name:'Must',
          src:'../../../../../images/brands/brand2.png',
          users:[
            {
              id:1,
              name:'Jack Grealish ',
              src: '../../../../../images/users/avatar1.jpg'
            },
            {
              id:2,
              name:'Jan Wick',
              src: '../../../../../images/users/avatar2.jpg'
            },
            {
              id:3,
              name:'Sara Grealish',
              src: '../../../../../images/users/avatar11.png'
            },
            {
              id:3,
              name:'Jon Grealish',
              src: '.../../../../../images/users/avatar.jpg'
            },
          ]
        },
        {
          id:2,
          name:'Deye',
          src:'.../../../../../images/brands/brand2.png',
          users:[
            {
              id:1,
              name:'Jack Grealish ',
              src: '.../../../../../images/users/avatar2.jpg'
            },
            {
              id:2,
              name:'Jan Wick',
              src: '.../../../../../images/users/avatar2.jpg'
            },
            {
              id:3,
              name:'Sara Grealish',
              src: '.../../../../../images/users/avatar11.png'
            },
          ]
        },
        {
          id:3,
          name:'3D Battery',
          src:'.../../../../../images/brands/brand3.png'
          ,
          users:[
            {
              id:1,
              name:'Jack Grealish ',
              src: '.../../../../../images/users/avatar11.png'
            },
            {
              id:2,
              name:'Jan Wick',
              src: '.../../../../../images/users/avatar1.jpg'
            },
            {
              id:3,
              name:'Sara Grealish',
              src: '.../../../../../images/users/avatar2.jpg'
            },
          ]
        },
        {
          id:4,
          name:'LUminous',
          src:'.../../../../../images/brands/brand4.png'
          ,
          users:[
            {
              id:1,
              name:'Jack Grealish ',
              src: '.../../../../../images/users/avatar11.png'
            },
            {
              id:2,
              name:'Jan Wick',
              src: '.../../../../../images/users/avatar10.png'
            },
            {
              id:3,
              name:'Sara Grealish',
              src: '.../../../../../images/users/avatar9.png'
            },
          ]
        },
        {
          id:5,
          name:'Rocket',
          src:'.../../../../../images/brands/brand5.png'
          ,
          users:[
            {
              id:1,
              name:'Jack Grealish ',
              src: '.../../../../../images/users/avatar11.png'
            },
            {
              id:2,
              name:'Jan Wick',
              src: '.../../../../../images/users/avatar1.jpg'
            },
            {
              id:3,
              name:'Sara Grealish',
              src: '.../../../../../images/users/avatar2.jpg'
            },
          ]
        }, {
          id:6,
          name:'Rambo',
          src:'.../../../../../images/brands/brand6.png',
          users:[
            {
              id:1,
              name:'Jack Grealish ',
              src: '.../../../../../images/users/avatar1.jpg'
            },
            {
              id:2,
              name:'Jan Wick',
              src: '.../../../../../images/users/avatar2.jpg'
            },
            {
              id:3,
              name:'Sara Grealish',
              src: '.../../../../../images/users/avatar11.png'
            },
          ]
        },
        {
          id:7,
          name:'Longi',
          src:'.../../../../../images/brands/brand7.png',
          users:[
            {
              id:1,
              name:'Jack Grealish ',
              src: '.../../../../../images/users/avatar11.png'
            },
            {
              id:2,
              name:'Jan Wick',
              src: '.../../../../../images/users/avatar11.png'
            },
            {
              id:3,
              name:'Sara Grealish',
              src: '.../../../../../images/users/avatar1.jpg'
            },
          ]
        },
        {
          id:8,
          name:'Inkel',
          src:'.../../../../../images/brands/brand8.png',
          users:[
            {
              id:1,
              name:'Jack Grealish ',
              src: '.../../../../../images/users/avatar1.jpg'
            },
            {
              id:2,
              name:'Jan Wick',
              src: '.../../../../../images/users/avatar2.jpg'
            },
            {
              id:3,
              name:'Sara Grealish',
              src: '.../../../../../images/users/avatar11.png'
            },
          ]
        },
      ]
    },
    {
      id:2,
      name:'Finance',
      icon :'uil-dollar-alt',
      isSelected:false,
      brands:[
        {
          id:9,
          name:'Must',
          src:'.../../../../../images/brands/brand2.png',
          users:[
            {
              id:1,
              name:'Jack Grealish ',
              src: '.../../../../../images/users/avatar1.jpg'
            },
            {
              id:2,
              name:'Jan Wick',
              src: '.../../../../../images/users/avatar2.jpg'
            },
            {
              id:3,
              name:'Sara Grealish',
              src: '.../../../../../images/users/avatar11.png'
            },
          ]
        },
        {
          id:10,
          name:'Deye',
          src:'.../../../../../images/brands/brand2.png',
          users:[
            {
              id:1,
              name:'Jack Grealish ',
              src: '.../../../../../images/users/avatar11.png'
            },
            {
              id:2,
              name:'Jan Wick',
              src: '.../../../../../images/users/avatar11.png'
            },
            {
              id:3,
              name:'Sara Grealish',
              src: '.../../../../../images/users/avatar1.jpg'
            },
          ]
        },
        {
          id:11,
          name:'3D Battery',
          src:'.../../../../../images/brands/brand3.png',
          users:[
            {
              id:1,
              name:'Jack Grealish ',
              src: '.../../../../../images/users/avatar1.jpg'
            },
            {
              id:2,
              name:'Jan Wick',
              src: '.../../../../../images/users/avatar2.jpg'
            },
            {
              id:3,
              name:'Sara Grealish',
              src: '.../../../../../images/users/avatar11.png'
            },
          ]
        },
        {
          id:12,
          name:'LUminous',
          src:'.../../../../../images/brands/brand4.png',
          users:[
            {
              id:1,
              name:'Jack Grealish ',
              src: '.../../../../../images/users/avatar11.png'
            },
            {
              id:2,
              name:'Jan Wick',
              src: '.../../../../../images/users/avatar1.jpg'
            },
            {
              id:3,
              name:'Sara Grealish',
              src: '.../../../../../images/users/avatar11.png'
            },
          ]
        }
      ]
    },
    {
      id:3,
      name:'Accounting',
      icon :'uil-user-check',
      isSelected:false,
      brands:[
        {
          id:13,
          name:'Rocket',
          src:'.../../../../../images/brands/brand5.png',
          users:[
            {
              id:1,
              name:'Jack Grealish ',
              src: '.../../../../../images/users/avatar1.jpg'
            },
            {
              id:2,
              name:'Jan Wick',
              src: '.../../../../../images/users/avatar2.jpg'
            },
            {
              id:3,
              name:'Sara Grealish',
              src: '.../../../../../images/users/avatar11.png'
            },
          ]
        }, {
          id:14,
          name:'Rambo',
          src:'.../../../../../images/brands/brand6.png',
          users:[
            {
              id:1,
              name:'Jack Grealish ',
              src: '.../../../../../images/users/avatar1.jpg'
            },
            {
              id:2,
              name:'Jan Wick',
              src: '.../../../../../images/users/avatar11.png'
            },
            {
              id:3,
              name:'Sara Grealish',
              src: '.../../../../../images/users/avatar1.jpg'
            },
          ]
        },
        {
          id:15,
          name:'Longi',
          src:'.../../../../../images/brands/brand7.png',
          users:[
            {
              id:1,
              name:'Jack Grealish ',
              src: '.../../../../../images/users/avatar1.jpg'
            },
            {
              id:2,
              name:'Jan Wick',
              src: '.../../../../../images/users/avatar2.jpg'
            },
            {
              id:3,
              name:'Sara Grealish',
              src: '.../../../../../images/users/avatar11.png'
            },
          ]
        },
        {
          id:16,
          name:'Inkel',
          src:'.../../../../../images/brands/brand8.png',
          users:[
            {
              id:1,
              name:'Jack Grealish ',
              src: '.../../../../../images/users/users/avatar2.jpg'
            },
            {
              id:2,
              name:'Jan Wick',
              src: '.../../../../../images/users/avatar11.png'
            },
            {
              id:3,
              name:'Sara Grealish',
              src: '.../../../../../images/users/avatar1.jpg'
            },
          ]
        },
      ]
    },
    {
      id:4,
      name:'Sales',
      icon :'uil-percentage',
      isSelected:false,
      brands:[
        {
          id:17,
          name:'Must',
          src:'.../../../../../images/brands/brand2.png',
          users:[]
        },
        {
          id:18,
          name:'Deye',
          src:'.../../../../../images/brands/brand2.png',
          users:[]
        },
        {
          id:19,
          name:'3D Battery',
          src:'.../../../../../images/brands/brand3.png',
          users:[]
        },
        {
          id:20,
          name:'LUminous',
          src:'.../../../../../images/brands/brand4.png',
          users:[]
        },
      ]
    },
    {
      id:5,
      name:'Marketing',
      icon :'uil-shopping-bag',
      isSelected:false,
      brands:[
        {
          id:21,
          name:'Rocket',
          src:'.../../../../../images/brands/brand5.png',
          users:[]
        }, {
          id:22,
          name:'Rambo',
          src:'.../../../../../images/brands/brand6.png',
          users:[]
        },
        {
          id:23,
          name:'Longi',
          src:'.../../../../../images/brands/brand7.png',
          users:[]
        },
        {
          id:24,
          name:'Inkel',
          src:'.../../../../../images/brands/brand8.png',
          users:[]
        },
      ]
    },
    {
      id:6,
      name:'Logistic',
      icon :'uil-cog',
      isSelected:false,
      brands:[
        {
          id:25,
          name:'Rocket',
          src:'.../../../../../images/brands/brand5.png',
          users:[]
        }, {
          id:26,
          name:'Rambo',
          src:'.../../../../../images/brands/brand6.png',
          users:[
            {
              id:1,
              name:'Jack Grealish ',
              src: '.../../../../../images/users/avatar1.jpg'
            },
            {
              id:2,
              name:'Jan Wick',
              src: '.../../../../../images/users/avatar2.jpg'
            },
            {
              id:3,
              name:'Sara Grealish',
              src: '.../../../../../images/users/avatar11.png'
            },
          ]
        },
        {
          id:27,
          name:'Longi',
          src:'.../../../../../images/brands/brand7.png',
          users:[]
        },
        {
          id:28,
          name:'Inkel',
          src:'.../../../../../images/brands/brand8.png',
          users:[
            {
              id:1,
              name:'Jack Grealish ',
              src: '.../../../../../images/users/avatar1.jpg'
            },
            {
              id:2,
              name:'Jan Wick',
              src: '.../../../../../images/users/avatar2.jpg'
            },
            {
              id:3,
              name:'Sara Grealish',
              src: '.../../../../../images/users/avatar11.png'
            },
          ]
        },
      ]
    },
    {
      id:7,
      name:'HR',
      icon :'uil-users-alt',
      isSelected:false,
      brands:[
        {
          id:29,
          name:'Must',
          src:'.../../../../../images/brands/brand2.png',
          users:[]
        },
        {
          id:30,
          name:'Deye',
          src:'.../../../../../images/brands/brand2.png',
          users:[
            {
              id:1,
              name:'Jack Grealish ',
              src: '.../../../../../images/users/avatar1.jpg'
            },
            {
              id:2,
              name:'Jan Wick',
              src: '.../../../../../images/users/avatar2.jpg'
            },
            {
              id:3,
              name:'Sara Grealish',
              src: '.../../../../../images/users/avatar11.png'
            },
          ]
        },
        {
          id:31,
          name:'3D Battery',
          src:'.../../../../../images/brands/brand3.png',
          users:[]
        },
        {
          id:32,
          name:'LUminous',
          src:'.../../../../../images/brands/brand4.png',
          users:[]
        },
       ]
    },
    {
      id:8,
      name:'Supplier',
      icon :'uil-life-ring',
      isSelected:false,
      brands:[
        {
          id:33,
          name:'Must',
          src:'.../../../../../images/brands/brand2.png',
          users:[
            {
              id:1,
              name:'Jack Grealish ',
              src: '.../../../../../images/users/avatar1.jpg'
            },
            {
              id:2,
              name:'Jan Wick',
              src: '.../../../../../images/users/avatar2.jpg'
            },
            {
              id:3,
              name:'Sara Grealish',
              src: '.../../../../../images/users/avatar11.png'
            },
          ]
        },
        {
          id:34,
          name:'Deye',
          src:'.../../../../../images/brands/brand2.png',
          users:[]
        },
        {
          id:35,
          name:'3D Battery',
          src:'.../../../../../images/brands/brand3.png',
          users:[
            {
              id:1,
              name:'Jack Grealish ',
              src: '.../../../../../images/users/avatar1.jpg'
            },
            {
              id:2,
              name:'Jan Wick',
              src: '.../../../../../images/users/avatar2.jpg'
            },
            {
              id:3,
              name:'Sara Grealish',
              src: '.../../../../../images/users/avatar11.png'
            },
          ]
        },
        {
          id:36,
          name:'LUminous',
          src:'.../../../../../images/brands/brand4.png',
          users:[]
        },
      ]
    },
    {
      id:9,
      name:'Security',
      icon :'uil-folder-lock',
      isSelected:false,
      brands:[
        {
          id:37,
          name:'Must',
          src:'.../../../../../images/brands/brand2.png',
          users:[]
        },
        {
          id:38,
          name:'Deye',
          src:'.../../../../../images/brands/brand2.png',
          users:[]
        },
        {
          id:39,
          name:'3D Battery',
          src:'.../../../../../images/brands/brand3.png',
          users:[
            {
              id:1,
              name:'Jack Grealish ',
              src: '.../../../../../images/users/avatar1.jpg'
            },
            {
              id:2,
              name:'Jan Wick',
              src: '.../../../../../images/users/avatar2.jpg'
            },
            {
              id:3,
              name:'Sara Grealish',
              src: '.../../../../../images/users/avatar11.png'
            },
          ]
        },
        {
          id:40,
          name:'LUminous',
          src:'.../../../../../images/brands/brand4.png',
          users:[]
        },

        {
          id:41,
          name:'Rocket',
          src:'.../../../../../images/brands/brand5.png',
          users:[]
        }, {
          id:42,
          name:'Rambo',
          src:'.../../../../../images/brands/brand6.png',
          users:[
            {
              id:1,
              name:'Jack Grealish ',
              src: '.../../../../../images/users/avatar1.jpg'
            },
            {
              id:2,
              name:'Jan Wick',
              src: '.../../../../../images/users/avatar2.jpg'
            },
            {
              id:3,
              name:'Sara Grealish',
              src: '.../../../../../images/users/avatar11.png'
            },
          ]
        },
        {
          id:43,
          name:'Longi',
          src:'.../../../../../images/brands/brand7.png',
          users:[
            {
              id:1,
              name:'Jack Grealish ',
              src: '.../../../../../images/users/avatar1.jpg'
            },
            {
              id:2,
              name:'Jan Wick',
              src: '.../../../../../images/users/avatar2.jpg'
            },
            {
              id:3,
              name:'Sara Grealish',
              src: '.../../../../../images/users/avatar11.png'
            },
          ]
        },
        {
          id:44,
          name:'Inkel',
          src:'.../../../../../images/brands/brand8.png',
          users:[]
        },
      ]
    }
]
let brands = departments[0].brands
let users = departments[0].brands[0].users
let viewFiles =[]
  return (
    // <div> Here Will be Add Issue</div>
   <>
   <div className="container">
    <div className="card">
      <div class="card-header">
        <div class="tittle-card">
            <p> Add Issue </p>
        </div> 
      </div>
      <div className="card-body">
            {/* issue Type section  */}
            <div class="Issue-type-section">
                <fieldset class="checkbox-group">
                    <div class="col-12 tittle-section">
                        <p>Choose Issue Type</p>
                    </div>
                    <div class="checkbox">
                        <label class="checkbox-wrapper">
                       <input type="radio"  class="checkbox-input" name="issueType"  id="IssueType" />
                       {/* (click)="chooseIssueType(false)"  [checked]="!issueModelView.issueType" */}
                          <span class="checkbox-tittle">
                              <span class="checkbox-icon">
                                <img src="../../../../../images/brands/brand1.png" alt=""/>
                              </span>
                             <span class="checkbox-label">Typical</span>
                          </span>
                    </label>
                    </div>
                    <div class="checkbox">
                        <label class="checkbox-wrapper">
                          <input type="radio" class="checkbox-input" name="issueType"  id="IssueType1"     />
                          {/* (click)="chooseIssueType(true)" */}
                          <span class="checkbox-tittle">
                            <span class="checkbox-icon">
                              <img src="../../../../../images/brands/brand2.png" alt=""/>
                            </span>
                            <span class="checkbox-label">Urgent</span>
                         </span>
                     </label>
                    </div>
                </fieldset>
            </div>
             {/* departments section  */}
            <div class="departments-section">
                <div class="row">
                    <div class="col-12 tittle-section">
                        <p>Choose Department</p>
                    </div>
                    <div class="col-12 departments">
                    {departments.map((depatrment,index) =>
                        <div class="department-item" >
                            <input class="checkbox-booking" type="radio" name="{depatrment.name}" id="{depatrment.id}"  />
                            <label class="for-checkbox-booking" >
                                  <i className={`uil ${depatrment.icon} `}></i>
                                  <span class="text">{depatrment.name}</span>
                            </label>
                        </div>
                      ) }
                    </div>
                </div>
            </div>
             {/* brands section */}
            <div class="brands-section">
                <fieldset class="checkbox-group">
                    <div class="col-12 tittle-section">
                        <p>Choose Brands</p>
                    </div>
                    {brands.map((brand,index) =>
                    <div class="checkbox" >
                        <label class="checkbox-wrapper">
                          <input type="checkbox" class="checkbox-input"  />
                          <span class="checkbox-tittle">
                            <span class="checkbox-icon">
                              <img src={brand.src} alt="{brand.name}-img" />
                            </span>
                            <span class="checkbox-label">{brand.name}</span>
                          </span>
                        </label>
                    </div>
                    )}
                    {brands.length <= 0 && 
                    <div class="empty-img">
                        <img src="../../../../../images/brands/brand4.png" alt="empty-img" />
                        <span>No Brands Available Yet! </span>
                    </div>
                  } 
                </fieldset>
            </div>
             {/* users section */}
            <div class="users-section">
                <div class="col-12 tittle-section">
                    <p>Choose Users</p>
                </div>
                <div class="grid">
                  {users.map((user,index)=>
                    <label class="card" >
                    <input class="card__input" type="checkbox" />
                      <div class="card__body">
                        <div class="card__body-cover" >
                          <img class="card__body-cover-image" src={user.src} />
                          <span class="card__body-cover-checkbox">
                            <svg class="card__body-cover-checkbox--svg" viewBox="0 0 12 10">
                              <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                            </svg></span>
                          </div>
                      </div>
                  </label>
                  )}
                </div>
                {users.length <= 0 &&
                <div class="empty-img" >
                    <img src="../../../../../images/icons/no-user.svg" alt="empty-img" />
                    <span>No Users Available Yet! </span>
                </div>
                }
            </div>
            {/* Additional Information  */}
            <div class="information-section">
                <div class="col-12 tittle-section">
                    <p>Additional Information</p>
                </div>
                <form  id="issueFrom">
                    <div class="row">
                        <div class="col-lg-6 col-sm-12">
                          <div className="form-group">
                            <label htmlFor="issue-name">Issue Name</label>
                            <input matInput type="text" required className='form-control' name="issueName" />
                          </div>
                        </div>
                        <div class="col-lg-6 col-sm-12">
                          <div className="form-group">
                              <label htmlFor="choice-one">Choice One</label>
                              <input matInput type="text" required className='form-control' name="choiceOne" />
                          </div>
                        </div>
                        <div class="col-lg-6 col-sm-12">
                            <div className="form-group">
                              <label htmlFor="choice-tow">Choice Tow</label>
                              <input matInput type="text" required className='form-control' name="choiceTow" />
                           </div>
                        </div>
                        <div class="col-lg-6 col-sm-12">
                            <div className="form-group">
                                <label htmlFor="choice-tow">Choice Three</label>
                                <input matInput type="text" required className='form-control' name="choiceThree" />
                            </div>
                        </div>
                        <div class="col-lg-12 col-sm-12">
                            <div className="form-group">
                                <label htmlFor="choice-tow">Choice Three</label>
                                <textarea  type="text"  className='form-control' rows="4" minlength="1" maxlength="400" name="note" placeholder="Ex. 400 Main St"></textarea>
                            </div>
                        </div>
                        <div class="col-lg-12 col-sm-12 mt-2 mb-2">
                            <div className="form-group">
                               <label htmlFor="choice-tow">Deadline</label>
                               <input matInput type="date" required className='form-control' name="deadline" />
                           </div>
                        </div>
                        <div class="col-12 tittle-section ">
                            <p class="attachments">Attachments</p>
                        </div>
                        <div class="col-lg-6 col-sm-12 mt-3">
                            <div class="text-center">
                                  <div className='ngx-file-drop__drop-zone '>
                                  <div className="ngx-file-drop__content">
                                    <i class="uil uil-cloud-upload"></i>
                                    <div className='text-center'>
                                      <button type="button" >Select</button>
                                    </div>
                                        <strong>OR Drop files to upload</strong>
                                  </div>
                                  </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-12 mt-3">
                            <div class="text-center">
                              {viewFiles.length <= 0 && 
                                <div className='empty-img'>
                                    <img src="../../../../../images/Empty.png" class="w-25" alt="Empty-photo" />
                                    <p class="text-secondary mb-0">No files selected</p>
                                </div>
                                }
                                {viewFiles.length > 0 && 
                                <div class="upload-table " >
                                    <ul class="list-group ">
                                      { viewFiles.map((file,index)=>
                                        <li class="list-group-item d-flex justify-content-between align-items-center" >
                                            <div class="item-tittle">
                                                <div class="fw-bold ">{ file.name }</div>
                                                {/* <div> {{humanFileSize(item.size )}}</div> */}
                                            </div>
                                            <span class="badge bg-danger " ><i class="uil uil-trash-alt"></i></span>
                                        </li>
                                       )}
                                    </ul>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {/* buttons */}
            <div class="buttons-group">
                <button class="noselect" from="issueFrom" ><span class='text'>Reset</span><span class="icon"><i class="uil uil-times"></i></span></button>
                <button class="noselect" ><span class='text'>Save</span><span class="icon"><i class="uil uil-check"></i></span></button>
                <button class="noselect" form="issueFrom" ><span class='text' >Submit</span><span class="icon"><i class="uil uil-arrow-right"></i></span></button>
            </div>
      </div>
    </div>
   </div>
   </>
  )
}
export default AddIssue