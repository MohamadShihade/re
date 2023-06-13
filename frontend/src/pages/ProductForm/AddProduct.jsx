import React from "react";
import "./AddProduct.css";

const AddProduct = () => {
  return (
    <div class="container">
      <div class="row">
        <div id="form-header" class="col-12">
          <h1 id="title">Hotel Survey Form</h1>
        </div>
      </div>

      <div class="row">
        <div id="form-tagline" class="col-md-4">
          <div class="form-tagline">
            <i class="fa fa-envelope fa-5x"></i>
            <h2>How Are We Doing?</h2>
            <p id="description" class="lead">
              We really value your opinion
            </p>
          </div>
        </div>

        <div id="form-content" class="col-md-8">
          <form id="survey-form" onsubmit="return false;">
            <div class="row form-group">
              <div class="col-sm-3">
                <label id="name-label" class="control-label" for="name">
                  *Name:
                </label>
              </div>

              <div class="input-group col-sm-9">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon-name">
                    <i class="fa fa-user"></i>
                  </span>
                </div>
                <input
                  id="name"
                  type="text"
                  class="form-control"
                  placeholder="Please Enter Your Name"
                  name="name"
                  required
                  autocomplete="on"
                />
              </div>
            </div>

            <div class="form-group row">
              <div class="col-sm-3">
                <label id="email-label" class="control-label" for="email">
                  *Email:
                </label>
              </div>

              <div class="input-group col-sm-9">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon-mail">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Enter Your Email"
                  name="email"
                  pattern="^[-+.\w]{1,64}@[-.\w]{1,64}\.[-.\w]{2,6}$"
                  required
                  autocomplete="on"
                />
              </div>
            </div>

            <div class="form-group row">
              <div class="col-sm-3">
                <label id="number-label" class="control-label" for="email">
                  *Room Number:
                </label>
              </div>

              <div class="input-group col-sm-9">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon-room">
                    <i class="fa fa-door-open"></i>
                  </span>
                </div>
                <input
                  type="number"
                  class="form-control"
                  id="number"
                  placeholder="Enter Your Room Number"
                  name="number"
                  min="1"
                  max="125"
                  required
                  autocomplete="on"
                />
              </div>
            </div>

            <div class="form-group row">
              <div class="col-sm-3">
                <label class="control-label" for="visit-purpose">
                  Type of Trip:
                </label>
              </div>

              <div class="input-group col-sm-9">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon-purpose">
                    <i class="fa fa-hotel"></i>
                  </span>
                </div>

                <select class="form-control" id="dropdown">
                  <option>Business</option>
                  <option>Couple</option>
                  <option>Family</option>
                  <option>Friends</option>
                  <option>Solo</option>
                  <option>Event</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-sm-3">
                <label class="control-label" for="visit-purpose">
                  Rate Your Stay:
                </label>
              </div>

              <div class="col-sm-9">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="star-rating" id="five-star" value="five-star" />
                  <label class="form-check-label" for="five-star">
                    Excellent
                  </label>
                </div>

                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="star-rating" id="four-star" value="four-star" />
                  <label class="form-check-label" for="four-star">
                    Very Good
                  </label>
                </div>

                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" id="three-star" name="star-rating" value="three-star" />
                  <label class="form-check-label" for="three-star">
                    Average
                  </label>
                </div>

                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" id="two-star" name="star-rating" value="two-star" />
                  <label class="form-check-label" for="two-star">
                    Poor
                  </label>
                </div>

                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" id="one-star" name="star-rating" value="one-star" />
                  <label class="form-check-label" for="one-star">
                    Terrible
                  </label>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-sm-3">
                <label class="control-label" for="visit-purpose">
                  Things You Liked:
                </label>
              </div>

              <div class="col-sm-9">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="service" value="service" />
                  <label class="form-check-label" for="service">
                    Service
                  </label>
                </div>

                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="value" value="value" />
                  <label class="form-check-label" for="value">
                    Value
                  </label>
                </div>

                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="sleep-quality" value="sleep-quality" />
                  <label class="form-check-label" for="sleep-quality">
                    Sleep Quality
                  </label>
                </div>

                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="cleanliness" value="cleanliness" />
                  <label class="form-check-label" for="cleanliness">
                    Cleanliness
                  </label>
                </div>

                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="facilities" value="facilities" />
                  <label class="form-check-label" for="facilities">
                    Facilities
                  </label>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-sm-3">
                <label class="control-label" for="comment">
                  Comments:
                </label>
              </div>

              <div class="input-group col-sm-9">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon-mail">
                    <i class="fa fa-comment"></i>
                  </span>
                </div>
                <textarea class="form-control" rows="5" id="comment"></textarea>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-sm-12 submit-button">
                <button type="submit" id="submit" class="btn btn-default" aria-pressed="true">
                  Submit Form
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
