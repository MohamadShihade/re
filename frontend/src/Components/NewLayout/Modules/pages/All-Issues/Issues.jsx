import React from 'react'
import "./all-isuues.scss";

export const Issues = () => {
  return (
    <div className="container">
    <div className="card">
      <div class="card-header">
        <div class="tittle-card">
            <p> Issues </p>
        </div> 
      </div>
      <div className="card-body">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">By you</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">For You</button>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">Deadline</th>
                    <th scope="col">Topic</th>
                    <th scope="col">Issue</th>
                    <th scope="col">Actions</th>
                    <th scope="col">Supporting Document</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td >15/4/2023 12:00 PM</td>
                        <td>
                            <span> Exide | Marketing</span>
                        </td>
                        <td>NSDFAS JASDJFASJD JASDFJASFU ASKJNFASF </td>
                        <td>
                            <div className='issues-btns'>
                                <span className='ags-btn-sucess-outlin'>Yes</span>
                                <span className='ags-btn-main'>No</span>
                                <span className='ags-btn-primary-outlin '>Book a meeting</span>
                            </div>
                        </td>
                        <td>
                            <i class="uil uil-file-download-alt"></i>
                            <i class="uil uil-file-download-alt"></i>
                        </td>
                    </tr>
                    <tr>
                    <td >15/4/2023 12:00 PM</td>
                    <td>
                        <span> Exide | Marketing</span>
                    </td>
                    <td>NSDFAS JASDJFASJD JASDFJASFU ASKJNFASF </td>
                    <td>
                        <div className='issues-btns'>
                            <span className='ags-btn-sucess-outlin'>Re ask for discount</span>
                            <span className='ags-btn-main'>No</span>
                            <span className='ags-btn-primary-outlin '>Hold until tomr</span>
                        </div>
                    </td>
                    <td>
                        <i class="uil uil-file-download-alt"></i>
                        <i class="uil uil-file-download-alt"></i>
                        </td>
                    </tr>
                    <tr>
                    <td >15/4/2023 12:00 PM</td>
                    <td>
                        <span> Exide | Marketing</span>
                    </td>
                    <td>NSDFAS JASDJFASJD JASDFJASFU ASKJNFASF </td>
                    <td>
                        <div className='issues-btns'>
                            <span className='ags-btn-sucess-outlin'>Booth 10</span>
                            <span className='ags-btn-main'>No</span>
                            <span className='ags-btn-primary-outlin '>Book a meeting</span>
                        </div>
                    </td>
                    <td>
                        <i class="uil uil-file-download-alt"></i>
                        <i class="uil uil-file-download-alt"></i>
                        </td>
                    </tr>
                    <tr>
                    <td >15/4/2023 12:00 PM</td>
                    <td>
                        <span> Exide | Marketing</span>
                    </td>
                    <td>NSDFAS JASDJFASJD JASDFJASFU ASKJNFASF </td>
                    <td>
                        <div className='issues-btns'>
                            <span className='ags-btn-sucess-outlin'>Beirut</span>
                            <span className='ags-btn-main'>No</span>
                            <span className='ags-btn-primary-outlin '>Booth 20</span>
                        </div>
                    </td>
                    <td>
                        <i class="uil uil-file-download-alt"></i>
                        <i class="uil uil-file-download-alt"></i>
                        </td>
                    </tr>
                    <tr>
                    <td >15/4/2023 12:00 PM</td>
                    <td>
                        <span> Exide | Marketing</span>
                    </td>
                    <td>NSDFAS JASDJFASJD JASDFJASFU ASKJNFASF </td>
                    <td>
                        <div className='issues-btns'>
                            <span className='ags-btn-sucess-outlin'>Yes</span>
                            <span className='ags-btn-main'>No</span>
                            <span className='ags-btn-primary-outlin '>Jabal Ali</span>
                        </div>
                    </td>
                    <td>
                        <i class="uil uil-file-download-alt"></i>
                        <i class="uil uil-file-download-alt"></i>
                        </td>
                    </tr>
                    <tr>
                    <td >15/4/2023 12:00 PM</td>
                    <td>
                        <span> Exide | Marketing</span>
                    </td>
                    <td>NSDFAS JASDJFASJD JASDFJASFU ASKJNFASF </td>
                    <td>
                        <div className='issues-btns'>
                            <span className='ags-btn-sucess-outlin'>Yes</span>
                            <span className='ags-btn-main'>No</span>
                            <span className='ags-btn-primary-outlin '>No booking</span>
                        </div>
                    </td>
                    <td>
                        <i class="uil uil-file-download-alt"></i>
                        <i class="uil uil-file-download-alt"></i>
                        </td>
                    </tr>
                    <tr>
                    <td >15/4/2023 12:00 PM</td>
                    <td>
                        <span> Exide | Marketing</span>
                    </td>
                    <td>NSDFAS JASDJFASJD JASDFJASFU ASKJNFASF </td>
                    <td>
                        <div className='issues-btns'>
                            <span className='ags-btn-sucess-outlin'>Yes</span>
                            <span className='ags-btn-main'>No</span>
                            <span className='ags-btn-primary-outlin '>Hold until tomr</span>
                        </div>
                    </td>
                    <td>
                        <i class="uil uil-file-download-alt"></i>
                        <i class="uil uil-file-download-alt"></i>
                        </td>
                    </tr>
                    <tr>
                    <td >15/4/2023 12:00 PM</td>
                    <td>
                        <span> Exide | Marketing</span>
                    </td>
                    <td>NSDFAS JASDJFASJD JASDFJASFU ASKJNFASF </td>
                    <td>
                        <div className='issues-btns'>
                            <span className='ags-btn-sucess-outlin'>Yes</span>
                            <span className='ags-btn-main'>No</span>
                            <span className='ags-btn-primary-outlin '>Book a meeting</span>
                        </div>
                    </td>
                    <td>
                        <i class="uil uil-file-download-alt"></i>
                        <i class="uil uil-file-download-alt"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">Deadline</th>
                    <th scope="col">Topic</th>
                    <th scope="col">Issue</th>
                    <th scope="col">Actions</th>
                    <th scope="col">Supporting Document</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td >15/4/2023 12:00 PM</td>
                        <td>
                            <span> Exide | Marketing</span>
                        </td>
                        <td>NSDFAS JASDJFASJD JASDFJASFU ASKJNFASF </td>
                        <td>
                            <div className='issues-btns'>
                                <span className='ags-btn-sucess-outlin'>Yes</span>
                                <span className='ags-btn-main'>No</span>
                                <span className='ags-btn-primary-outlin '>Book a meeting</span>
                            </div>
                        </td>
                        <td>
                            <i class="uil uil-file-download-alt"></i>
                            <i class="uil uil-file-download-alt"></i>
                        </td>
                    </tr>
                    <tr>
                    <td >15/4/2023 12:00 PM</td>
                    <td>
                        <span> Exide | Marketing</span>
                    </td>
                    <td>NSDFAS JASDJFASJD JASDFJASFU ASKJNFASF </td>
                    <td>
                        <div className='issues-btns'>
                            <span className='ags-btn-sucess-outlin'>Yes</span>
                            <span className='ags-btn-main'>No</span>
                            <span className='ags-btn-primary-outlin '>Book a meeting</span>
                        </div>
                    </td>
                    <td>
                        <i class="uil uil-file-download-alt"></i>
                        <i class="uil uil-file-download-alt"></i>
                        </td>
                    </tr>
                    <tr>
                    <td >15/4/2023 12:00 PM</td>
                    <td>
                        <span> Exide | Marketing</span>
                    </td>
                    <td>NSDFAS JASDJFASJD JASDFJASFU ASKJNFASF </td>
                    <td>
                        <div className='issues-btns'>
                            <span className='ags-btn-sucess-outlin'>Yes</span>
                            <span className='ags-btn-main'>No</span>
                            <span className='ags-btn-primary-outlin '>Book a meeting</span>
                        </div>
                    </td>
                    <td>
                        <i class="uil uil-file-download-alt"></i>
                        <i class="uil uil-file-download-alt"></i>
                        </td>
                    </tr>
                    <tr>
                    <td >15/4/2023 12:00 PM</td>
                    <td>
                        <span> Exide | Marketing</span>
                    </td>
                    <td>NSDFAS JASDJFASJD JASDFJASFU ASKJNFASF </td>
                    <td>
                        <div className='issues-btns'>
                            <span className='ags-btn-sucess-outlin'>Yes</span>
                            <span className='ags-btn-main'>No</span>
                            <span className='ags-btn-primary-outlin '>Book a meeting</span>
                        </div>
                    </td>
                    <td>
                        <i class="uil uil-file-download-alt"></i>
                        <i class="uil uil-file-download-alt"></i>
                        </td>
                    </tr>
                    <tr>
                    <td >15/4/2023 12:00 PM</td>
                    <td>
                        <span> Exide | Marketing</span>
                    </td>
                    <td>NSDFAS JASDJFASJD JASDFJASFU ASKJNFASF </td>
                    <td>
                        <div className='issues-btns'>
                            <span className='ags-btn-sucess-outlin'>Yes</span>
                            <span className='ags-btn-main'>No</span>
                            <span className='ags-btn-primary-outlin '>Book a meeting</span>
                        </div>
                    </td>
                    <td>
                        <i class="uil uil-file-download-alt"></i>
                        <i class="uil uil-file-download-alt"></i>
                        </td>
                    </tr>
                    <tr>
                    <td >15/4/2023 12:00 PM</td>
                    <td>
                        <span> Exide | Marketing</span>
                    </td>
                    <td>NSDFAS JASDJFASJD JASDFJASFU ASKJNFASF </td>
                    <td>
                        <div className='issues-btns'>
                            <span className='ags-btn-sucess-outlin'>Yes</span>
                            <span className='ags-btn-main'>No</span>
                            <span className='ags-btn-primary-outlin '>Book a meeting</span>
                        </div>
                    </td>
                    <td>
                        <i class="uil uil-file-download-alt"></i>
                        <i class="uil uil-file-download-alt"></i>
                        </td>
                    </tr>
                    <tr>
                    <td >15/4/2023 12:00 PM</td>
                    <td>
                        <span> Exide | Marketing</span>
                    </td>
                    <td>NSDFAS JASDJFASJD JASDFJASFU ASKJNFASF </td>
                    <td>
                        <div className='issues-btns'>
                            <span className='ags-btn-sucess-outlin'>Yes</span>
                            <span className='ags-btn-main'>No</span>
                            <span className='ags-btn-primary-outlin '>Book a meeting</span>
                        </div>
                    </td>
                    <td>
                        <i class="uil uil-file-download-alt"></i>
                        <i class="uil uil-file-download-alt"></i>
                        </td>
                    </tr>
                    <tr>
                    <td >15/4/2023 12:00 PM</td>
                    <td>
                        <span> Exide | Marketing</span>
                    </td>
                    <td>NSDFAS JASDJFASJD JASDFJASFU ASKJNFASF </td>
                    <td>
                        <div className='issues-btns'>
                            <span className='ags-btn-sucess-outlin'>Yes</span>
                            <span className='ags-btn-main'>No</span>
                            <span className='ags-btn-primary-outlin '>Book a meeting</span>
                        </div>
                    </td>
                    <td>
                        <i class="uil uil-file-download-alt"></i>
                        <i class="uil uil-file-download-alt"></i>
                        </td>
                    </tr>
                </tbody>
            </table> 
        </div>
        </div>
        {/* <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
                <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</button>
                <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button>
            </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">first</div>
        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">second</div>
        <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">third</div>
        </div> */}
      </div>
    </div>
   </div>
  )
}

export default Issues